import { useEffect, useState, useMemo } from 'react';
import wisescoreRadarpng from '@/images/wise/radar.png';
import { formatImpact } from '@tbook/utils/lib/conf';
import Button from '../components/button';
import Loading from '@/components/loading';
import WiseTag from '../components/wiseTag';
import PassportCard from '@/components/passportGen/smallCard';
import Frame from './frame';
import useSocial from '@/hooks/useSocial';
import { preloadBatchImage } from '@/utils/common';
import { cn } from '@/utils/conf';
import useWallet from '@/hooks/useWallet';
import genBg1 from '@/images/wise/gen/bg1.svg';
import genBg2 from '@/images/wise/gen/bg2.svg';
import genBg3 from '@/images/wise/gen/bg3.svg';
import genBg4 from '@/images/wise/gen/bg4.svg';
import genBg5 from '@/images/wise/gen/bg5.svg';
import genBg6 from '@/images/wise/gen/bg6.svg';
import genBg7 from '@/images/wise/gen/bg7.svg';
import useWiseScore from '@/hooks/useWiseScore';
import Header from '@/layout/ton/HeaderTransparent';

preloadBatchImage([
  wisescoreRadarpng,
  genBg1,
  genBg2,
  genBg3,
  genBg4,
  genBg5,
  genBg6,
  genBg7,
]);

export default function Generating({ hide }) {
  const { data, totalScore, isLoaded } = useWiseScore();
  const { getSocialByName } = useSocial();
  const [displayIdx, setDisplayIdx] = useState(-1);
  const { getWallets } = useWallet();
  const [ton] = getWallets('ton');
  const tg = getSocialByName('telegram');
  useEffect(() => {
    if (isLoaded === true) {
      setDisplayIdx(0);
    }
  }, [isLoaded]);

  const frames = useMemo(() => {
    return [
      {
        show: true,
        key: 'start',
        content: ({ next }) => (
          <Frame
            style={{ backgroundImage: `url(${genBg1})` }}
            button={
              <Button
                className="flex items-center justify-center gap-x-1.5 h-10 w-full "
                onClick={next}
              >
                Get Started
              </Button>
            }
          >
            <div className="flex flex-col items-center justify-center gap-y-10">
              <div className="w-full text-[40px]">
                <p className="text-[#503658] leading-none">Welcome to</p>
                <p className="text-[#503658] leading-none">TON WISE Credit</p>
              </div>
              <div className="space-y-4 text-[#503658] text-center">
                <div className="w-full ">
                  <p>Ready to discover your unique</p>
                  <p>TON Credit Score?</p>
                </div>
                <div className="w-full ">
                  <p>As a special welcome, you'll also</p>
                  <p>receive a free WISE SBT</p>
                  <p>on Ton Society for your credit!</p>
                </div>
              </div>
            </div>
          </Frame>
        ),
      },
      {
        show: true,
        key: 'gift',
        content: ({ next }) => (
          <Frame style={{ backgroundImage: `url(${genBg2})` }} onClick={next}>
            <div className="flex flex-col items-center justify-center text-center gap-y-7 text-[#ABEDBB]">
              <div className="w-full text-[40px]">
                <p className="leading-none">A Gift for you</p>
              </div>
              <div className="text-base">
                <div className="w-full">
                  <p>We've created something special just</p>
                  <p>
                    for you, your own
                    <span className="text-[#F36EBD] ms-1">
                      incentive passport
                    </span>
                    .
                  </p>
                </div>
                <div className="w-full">
                  <p>This is your gateway to unlocking more</p>
                  <p>rewards and benefits</p>
                </div>
              </div>
            </div>
          </Frame>
        ),
      },
      {
        show: true,
        key: 'passport',
        content: ({ next }) => (
          <Frame style={{ backgroundImage: `url(${genBg3})` }} onClick={next}>
            <div>
              <h2 className="text-xl text-[#ABEDBB] text-center">
                Your incentive passport is valid
              </h2>
              <PassportCard />
            </div>
          </Frame>
        ),
      },
      {
        show: tg.connected,
        key: 'pre-tg-user',
        content: ({ next }) => {
          const texts = [
            `It looks like you're`,
            `already a part of the`,
            `Telegram`,
            `community!`,
            `That's amazing.`,
          ];
          return (
            <Frame style={{ backgroundColor: `#F36EBD` }} onClick={next}>
              <div className="text-center">
                {texts.map((t, i) => (
                  <h2 className="text-[#22306D] text-4xl" key={i}>
                    {t}
                  </h2>
                ))}
              </div>
            </Frame>
          );
        },
      },
      {
        show: tg.connected,
        key: 'tg-user',
        content: ({ next }) => (
          <Frame style={{ backgroundImage: `url(${genBg5})` }} onClick={next}>
            <div className="text-xl w-full text-center mb-1">
              <h2 className="text-[#22306D]">
                Your first WISE Credit Credential is
              </h2>
              <h2 className="text-[#ABEDBB]">Telegram Veteran</h2>
            </div>
            <div className="text-[35px] leading-tight w-full text-center">
              <h2 className="text-[#22306D]">This improves your </h2>
              <h2 className="text-[#22306D]">WISE Credit Score by</h2>
              <h2 className="text-[#ABEDBB]">+10K</h2>
            </div>
          </Frame>
        ),
      },
      {
        show: data?.identityScore?.tgPremiumScore > 0,
        key: 'pre-tg-premium',
        content: ({ next }) => {
          const texts = [
            `Wow, you're a`,
            `Telegram Premium`,
            `user?`,
            `That's impressive!`,
          ];
          return (
            <Frame style={{ backgroundColor: `#CFF469` }} onClick={next}>
              <div className="text-center">
                {texts.map((t, i) => (
                  <h2 className="text-[#503658] text-4xl" key={i}>
                    {t}
                  </h2>
                ))}
              </div>
            </Frame>
          );
        },
      },
      {
        show: data?.identityScore?.tgPremiumScore > 0,
        key: 'tg-premium',
        content: ({ next }) => (
          <Frame style={{ backgroundImage: `url(${genBg6})` }} onClick={next}>
            <div className="text-xl w-full text-center mb-1">
              <h2 className="text-[#22306D]">You unlocked a WISE Credit</h2>
              <h2 className="text-[#22306D]">Credential</h2>
              <h2 className="text-[#F36EBD]">Telegram Premium</h2>
            </div>
            <div className="text-[35px] leading-tight w-full text-center ">
              <h2 className="text-[#22306D]">This improves your WISE</h2>
              <h2 className="text-[#22306D]">Credit Score by extra</h2>
              <h2 className="text-[#F36EBD]">+10K</h2>
            </div>
          </Frame>
        ),
      },
      {
        show: true,
        key: 'wise-tag',
        content: ({ next }) => (
          <Frame style={{ backgroundColor: '#000' }} onClick={next}>
            <div className="text-[40px] leading-tight w-full text-center text-[#F8D4D7] ">
              <h2>Bravo!</h2>
              <h2>You level up to</h2>
              <h2>
                WISE <WiseTag value={totalScore} className="mx-1" />
              </h2>
            </div>
          </Frame>
        ),
      },
      {
        show: true,
        key: 'wise-credit',
        content: ({ next }) => (
          <Frame
            header={
              <p className="text-[#F8D4D7] text-3xl">Your WISE Credit Score</p>
            }
            onClick={next}
          >
            <div
              className="w-[259px] h-[212px] flex justify-center items-center bg-center bg-contain"
              style={{ backgroundImage: `url(${wisescoreRadarpng})` }}
            >
              <span className="font-syne text-xl font-bold">
                {formatImpact(data?.totalScore ?? 0)}
              </span>
            </div>
          </Frame>
        ),
      },
      {
        show: true,
        key: 'ton-wallect',
        content: () => {
          const texts = ton.connected
            ? ['Connect', 'Successfully 👏']
            : [
                'Connect TON',
                'Wallet to improve',
                'your WISE Credit',
                'Score by 10K',
              ];
          return (
            <Frame
              style={{ backgroundImage: `url(${genBg7})` }}
              button={
                <>
                  {ton.connected ? (
                    <Button
                      className="flex items-center justify-center font-sf-bold text-[#904BF6] gap-x-1.5 h-10 w-full bg-white"
                      onClick={hide}
                    >
                      View your WISE Credit Credit
                    </Button>
                  ) : (
                    <>
                      <Button
                        className="flex items-center justify-center font-syne gap-x-1.5 h-10 w-full "
                        onClick={ton.connectHandle}
                      >
                        Connect wallet
                      </Button>
                      <div className="flex justify-center mt-2" onClick={hide}>
                        <button className="text-xs underline text-white">
                          Maybe later
                        </button>
                      </div>
                    </>
                  )}
                </>
              }
            >
              <div className="text-center">
                {texts.map((t, i) => (
                  <p
                    key={i}
                    className="text-[#3C00E4] text-[40px] leading-tight"
                  >
                    {t}
                  </p>
                ))}
              </div>
            </Frame>
          );
        },
      },
    ]
      .filter((frame) => frame.show)
      .map((c, idx) => {
        return {
          ...c,
          idx,
          next() {
            setDisplayIdx(idx + 1);
          },
        };
      });
  }, [data, tg]);
  // console.log({ data });
  const swiperList = frames.slice(1);
  const CurrentFrame = frames.find((v) => v.idx === displayIdx);

  return (
    <div className="fixed top-0 left-0 inset-0 overflow-auto z-10">
      {displayIdx === -1 ? (
        <Loading text="Aggregating metrics..." />
      ) : (
        <>
          {![-1, 0].includes(CurrentFrame.idx) && (
            <div className="flex h-0.5 items-center gap-x-2 px-10 mx-auto absolute inset-0 top-14 z-10">
              {swiperList.map((v) => (
                <div
                  className={cn(
                    'h-0.5 rounded-full',
                    v.key === CurrentFrame.key ? 'bg-white' : 'bg-white/20'
                  )}
                  style={{ width: `${(1 / swiperList.length) * 100}%` }}
                  key={v.key}
                />
              ))}
            </div>
          )}

          <>
            <Header />
            {CurrentFrame?.content && (
              <CurrentFrame.content next={CurrentFrame.next} />
            )}
          </>
        </>
      )}
    </div>
  );
}
