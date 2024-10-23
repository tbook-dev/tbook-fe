import { useResponsive } from 'ahooks';
import { useMemo, useState } from 'react';
import useDeFi from '@/hooks/useDeFi';
import { cn } from '@/utils/conf';
import { preloadBatchImage } from '@/utils/common';
import Page404 from '@/pages/404';
import Header from '@/layout/ton/HeaderTransparent';
import Bg1 from '@/images/event/normis.svg';
import useWallet from '@/hooks/useWallet';
import Button from '@/components/button';
import TonIcon from '@/images/icon/svgr/ton2.svg?react';
import { shortAddress } from '@tbook/utils/lib/conf';
import exampleURL from '@/images/event/normie-sbt-example.svg';
import useNormieAirdrop from '@/hooks/useNormieAirdrop';
import GroupCard from '@/pages/app/groupCard';
import { getFormatedGroups } from '@/hooks/useCampaignQuery';
import LazyImage from '@/components/lazyImage';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
preloadBatchImage([Bg1]);

const Arrow = ({ disabled, className, onClick }) => {
  return (
    <div className="rounded-full bg-black/10 backdrop-blur" onClick={onClick}>
      <svg
        width="56"
        height="56"
        viewBox="0 0 56 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(
          className,
          disabled ? 'cursor-pointer' : 'cursor-not-allowed'
        )}
      >
        <path
          d="M31.9584 19.8542L22.8802 28.5L31.9584 37.1458"
          stroke={disabled ? '#666' : 'white'}
          strokeOpacity="0.5"
          strokeWidth="3.45833"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
const Normis = () => {
  const { pc } = useResponsive();
  const { getWallets } = useWallet();
  const [ton] = getWallets(['ton']);
  const { data: defi } = useDeFi();
  const { data: normie, isLoading } = useNormieAirdrop();
  const groups = getFormatedGroups(normie?.lateNightDefiGroups ?? []);
  const defiOngoing = true;

  const [displayIdx, setDisplayIdx] = useState(3);
  const userSBTs = Array.from({ length: 14 }).fill({
    url: exampleURL,
    name: 'Nomie Badge',
  });
  const allSBT = Array.from({ length: 30 }).fill({
    url: exampleURL,
    name: 'Nomie Badge2',
    taskName: 'Hold $FTON.',
  });
  const slides = useMemo(() => {
    return [
      {
        key: 1,
        bg: Bg1,
        content: (
          <div className="space-y-5 font-bold text-[#503658]">
            <div className="text-[40px]">
              <h2>Normis Airdrop:</h2>
              <h2>SBT Frenzy!</h2>
            </div>
            <div className="text-[26px]">
              <h2>The Open League S6</h2>
              <h2>airdrop campaign</h2>
            </div>
          </div>
        ),
      },
      {
        key: 2,
        className: 'bg-[#503658]',
        content: (
          <div className="space-y-5">
            <div className="text-2xl font-bold text-[#E5AB8A]">
              <h2>Connect Wallet to See which</h2>
              <h2>SBTs are waiting for you to claim</h2>
            </div>
            {ton.connected ? (
              <div className="pl-1 pr-5 h-12 flex items-center gap-x-1 bg-white text-black font-bold text-base rounded-3xl w-max mx-auto">
                <TonIcon className="size-10" />
                {shortAddress(ton.address)}
              </div>
            ) : (
              <Button
                type="white"
                className="px-5 py-4 font-bold text-base rounded-3xl mx-auto"
              >
                Connect TON wallet
              </Button>
            )}
          </div>
        ),
      },
      {
        key: 3,
        className: 'bg-[#22306D] justify-start pt-20',
        content: (
          <div className="space-y-10 font-bold  text-[#ABEDBB] text-left">
            <h2 className="text-2xl text-[#F36EBD] text-center">
              Boost your chances for the Normie Airdrop!
            </h2>
            <div className="text-lg space-y-6">
              {[
                'Dive in and engage with App Battle projects!',
                'uExplore the six DeFi protocols in Late Night DeFi!',
                'Stock up on TON Coins!',
                'Collect tons of SBTs from the Normie campaign!',
              ].map((v, k) => (
                <div className="flex items-start gap-x-2 pl-2" key={k}>
                  <i className="size-2 rounded-full bg-[#ABEDBB] flex-none mt-4" />
                  {v}
                </div>
              ))}
            </div>
            <div className="text-2xl text-center">
              Get ready—this is your moment! 🎉 Don't miss out!
            </div>
          </div>
        ),
      },
      {
        key: 4,
        className: 'bg-[#22306D] justify-start pt-20',
        content: (
          <div className="space-y-5 ">
            <div className="grid grid-cols-5 gap-x-1 gap-y-2 max-h-[250px] overflow-auto shadow-md">
              {userSBTs.map((sbt, i) => {
                return (
                  <div className="flex flex-col gap-y-1.5" key={i}>
                    <div className="w-full rounded-xl bg-[#071029]" key={i}>
                      <img src={sbt.url} />
                    </div>
                    <p className="font-bold text-[10px] text-white">
                      {sbt.name}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="text-[#ABEDBB] text-sm font-normal space-y-3">
              <p>
                Based on your on-chain activity, the SBTs above are the ones
                you're eligible to claim!
              </p>
              <p>
                Meet the following requirements, the most dedicated can unlock
                over 10 in total!
              </p>
            </div>
            <div className="-mx-4">
              <Swiper
                spaceBetween={15}
                slidesPerView={2}
                slidesPerGroup={2}
                style={{
                  '--swiper-theme-color': 'white',
                  '--swiper-pagination-bullet-inactive-color': '#666',
                }}
              >
                {allSBT.map((v, i) => {
                  return (
                    <SwiperSlide key={i}>
                      <div className="relative w-max">
                        <img src={v.url} className="w-[164px]" />
                        <p className="text-sm text-center absolute inset-x-0 bottom-1 text-[#ABEDBB]">
                          {v.taskName}
                        </p>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        ),
      },
      {
        key: 5,
        className: 'bg-[#3C00E4] justify-start py-20 w-full',
        content: (
          <div className="space-y-10">
            <div className="text-[#C0AFD0] text-2xl font-bold">
              Engage with Core DeFi!
            </div>

            <div className="space-y-2 lg:space-y-3">
              {groups.map((group, i) => {
                return (
                  <GroupCard
                    key={group.id}
                    group={group}
                    showVerify={defiOngoing}
                    endAt={1726738389000}
                    status={1}
                    defaultExpand={i === 0}
                  />
                );
              })}
            </div>

            <div className="text-[#ABEDBB]/40 text-sm font-normal pb-12">
              <p> Guess what? There are 23 Normis-series SBTs!</p>
              <p>
                Check out App League to
                <a
                  className="ml-1 underline underline-offset-4"
                  target="_blank"
                  href="https://ton.org/open-league?filterBy=forProjects"
                >
                  explore them all!
                </a>
              </p>
            </div>
          </div>
        ),
      },
      {
        key: 6,
        className: 'bg-[#F36EBD] justify-start py-20',
        content: (
          <div className="space-y-12">
            <div className="text-[#22306D] text-2xl font-bold">
              Royal TON Hodler!
            </div>

            <div className="space-y-1.5 flex flex-col items-center">
              <LazyImage
                src={exampleURL}
                alt="ton sbt picUrl"
                className="size-[164px]"
              />
              <p className="text-base text-center font-bold">Toncoin Holder</p>
            </div>

            <div className="text-[#22306D] text-base font-bold pb-12">
              <p>Get Toncoin.</p>
              <p>Claim Toncoin Holder SBT</p>
            </div>
          </div>
        ),
      },
    ];
  }, [setDisplayIdx, defi, groups]);
  const CurrentFrame = slides[displayIdx];

  return pc ? (
    <Page404 />
  ) : (
    <div className="fixed top-0 left-0 inset-0 z-10 h-screen overflow-auto">
      <Header />
      <div className="flex h-0.5 items-center gap-x-2 px-10 mx-auto absolute inset-0 top-14 z-10">
        {slides.map((v, idx) => (
          <div
            className={cn(
              'h-0.5 rounded-full',
              idx === displayIdx ? 'bg-white' : 'bg-white/30'
            )}
            style={{ width: `${(1 / slides.length) * 100}%` }}
            key={v.key}
          />
        ))}
      </div>
      <div
        className={cn(
          'relative px-4 flex flex-col items-center justify-center min-h-screen',
          'bg-cover bg-center',
          CurrentFrame.className
        )}
        style={{
          backgroundImage: `url(${CurrentFrame.bg})`,
        }}
      >
        <div className="text-center w-full">{CurrentFrame.content}</div>
        <div className="fixed inset-x-0 bottom-14 w-[310px] flex justify-between items-center mx-auto">
          <Arrow onClick={() => setDisplayIdx((v) => v - 1)} />
          <Arrow
            className="rotate-180"
            onClick={() => setDisplayIdx((v) => v + 1)}
          />
        </div>
      </div>
    </div>
  );
};

export default Normis;
