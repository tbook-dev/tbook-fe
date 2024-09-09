import { useResponsive } from 'ahooks';
import { useMemo, useState } from 'react';
import useDeFi from '@/hooks/useDeFi';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/button';
import { useCallback } from 'react';
import { cn } from '@/utils/conf';
import { preloadBatchImage } from '@/utils/common';
import Page404 from '@/pages/404';
import Header from '@/layout/ton/HeaderTransparent';
import Bg1 from '@/images/defi/1.png';
import Bg2 from '@/images/defi/2.png';
import Bg3 from '@/images/defi/3.png';
import Bg4 from '@/images/defi/4.png';

preloadBatchImage([Bg1, Bg2, Bg3, Bg4]);
const DeFiGuide = () => {
  const { pc } = useResponsive();
  const navigate = useNavigate();

  const { data: defi } = useDeFi();
  const handleNav = useCallback(() => {
    window.sessionRoutesCount -= 1;
    navigate(`/${defi?.projectUrl}/${defi?.campaignId}`,{ replace: true});
  }, [defi]);
  const [displayIdx, setDisplayIdx] = useState(0);
  const slides = useMemo(() => {
    return [
      {
        className:"pb-[144px]",
        bg: Bg1,
        content: (
          <div className="space-y-3 font-bold">
            <div className="text-lg">
              <h2>
                Welcome to
                <span className="text-[#CFF469] mx-1">Late Night DeFi</span>
              </h2>
              <h2>by TON Society</h2>
            </div>
            <div className="text-3xl">
              <h2>Hunting airdrops is</h2>
              <h2>cool...</h2>
            </div>
          </div>
        ),
        button: (
          <Button
            className="h-10 w-full mx-auto btn-click"
            type="purple"
            onClick={() => {
              setDisplayIdx(1);
            }}
          >
            Do Your Own Research Now!
          </Button>
        ),
      },
      {
        bg: Bg2,
        content: (
          <div className="text-3xl font-bold">
            <h2>But you should be </h2>
            <h2>smarter</h2>
          </div>
        ),
        button: (
          <Button
            type="purple"
            className="h-10 w-full mx-auto btn-click"
            onClick={() => {
              setDisplayIdx(2);
            }}
          >
            Continue
          </Button>
        ),
      },
      {
        bg: Bg3,
        content: (
          <div className="text-3xl font-bold">
            It's time to <span className="text-[#CFF469] mx-1">DeFi.</span>
          </div>
        ),
        button: (
          <Button
            type="purple"
            className="h-10 w-full mx-auto btn-click"
            onClick={() => {
              setDisplayIdx(3);
            }}
          >
            Continue
          </Button>
        ),
      },
      {
        className:"pb-[144px]",
        bg: Bg4,
        content: (
          <div className="space-y-3 font-bold">
            <h2 className="text-lg">In DeFi you can earn more.</h2>
            <div className="text-3xl">
              <h1>💕 Try out a simple</h1>
              <h1>DeFi strategy.</h1>
              <h1>💕Earn SBTs💕</h1>
              <h1>💕Claim airdrop💕</h1>
            </div>
          </div>
        ),
        button: (
          <Button
            className="h-10 w-full mx-auto btn-click"
            type="purple"
            onClick={handleNav}
          >
            Earn Now
          </Button>
        ),
      },
    ];
  }, [handleNav, setDisplayIdx]);
  const CurrentFrame = slides[displayIdx];

  return pc ? (
    <Page404 />
  ) : (
    <div className="fixed top-0 left-0 inset-0 z-10 h-screen overflow-auto">
      <Header />
      <div
        className={cn(
          'relative px-4 flex flex-col items-center justify-center h-screen min-h-[570px]',
          'bg-cover bg-center font-bold',
          CurrentFrame.className
        )}
        style={{
          backgroundImage: `url(${CurrentFrame.bg})`,
        }}
      >
        <div className="text-center">{CurrentFrame.content}</div>
        <div className="absolute inset-x-0 bottom-14 w-[310px] mx-auto">
          {CurrentFrame.button}
        </div>
      </div>
    </div>
  );
};

export default DeFiGuide;
