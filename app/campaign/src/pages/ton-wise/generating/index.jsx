import { useEffect, useState, useMemo } from 'react';
import TgPremiumIcon from '@/images/icon/svgr/tg-premium.svg?react';
import TgIcon from '@/images/icon/svgr/tg.svg?react';
import TonIcon from '@/images/icon/svgr/ton.svg?react';
import ArrowIcon from '@/images/icon/svgr/arrow2.svg?react';
import wisescoreRadarpng from '@/images/wise/radar.png';
import { formatImpact } from '@tbook/utils/lib/conf';
import Button from '../components/button';
import Check from './check';
import Loading from '@/components/loading';
import WiseTag from '../components/wiseTag';
import PassportCard from '@/components/passportGen/smallCard';
import Frame from './frame';
import useSocial from '@/hooks/useSocial';
import { preloadImage } from '@/utils/common';
import CheckedIcon from '@/images/icon/svgr/checked.svg?react';
import { cn } from '@/utils/conf';
import useWallet from '@/hooks/useWallet';
import genBg1 from '@/images/wise/gen/bg1.svg';
import genBg2 from '@/images/wise/gen/bg2.svg';
import genBg3 from '@/images/wise/gen/bg3.svg';
import genBg4 from '@/images/wise/gen/bg4.svg';

preloadImage(wisescoreRadarpng);
const wiseTexts = [
  'Claim a free WISE SBT on Ton Society',
  'Unlock more opportunities and rewards',
];
const swiperKeyList = ['passport', 'tg-user', 'tg-premium'];
export default function Generating({
  data,
  hasWiseScoreRes,
  isFirstCreate,
  hide,
}) {
  const { getSocialByName } = useSocial();
  const [displayIdx, setDisplayIdx] = useState(-1);
  const { getWallets } = useWallet();
  const [ton] = getWallets('ton');
  const totalScore = data?.totalScore ?? 0;
  const tg = getSocialByName('telegram');
  useEffect(() => {
    if (hasWiseScoreRes === false) {
      hide();
    }
  }, [hasWiseScoreRes]);
  useEffect(() => {
    let timer;
    if (isFirstCreate === false) {
      hide();
    } else {
      timer = setTimeout(() => {
        setDisplayIdx(0);
      }, 100);
    }
    // setDisplayIdx(0);
  }, [isFirstCreate]);

  const frames = useMemo(() => {
    return [
      {
        show: true,
        key: 'start',
        content: ({ next }) => (
          <Frame
            style={{ backgroundImage: `url(${genBg1})` }}
            footer={
              <>
                <p className="text-white/60">
                  Only a few steps to generate your
                </p>
                <p className="text-white/60">WISE Credit Score</p>
              </>
            }
            button={
              <Button
                className="flex items-center justify-center font-syne gap-x-1.5 h-10 w-full "
                onClick={next}
              >
                Start
              </Button>
            }
          >
            <div className="flex flex-col items-center justify-center gap-y-8">
              <div className="pb-2 w-full text-xl font-thin">
                <p className="text-white">
                  After generating WISE Credit Score,
                </p>
                <p className="text-white">you could</p>
              </div>
              <div className='space-y-4'>
                {wiseTexts.map((t, i) => {
                  return (
                    <div
                      key={i}
                      className="w-full flex items-center gap-x-2 text-base py-3 px-2 rounded-xl bg-white/10"
                    >
                      <CheckedIcon className="size-7" fill="#fff" />
                      {t}
                    </div>
                  );
                })}
              </div>
            </div>
          </Frame>
        ),
      },
      {
        show: false,
        key: 'check',
        content: ({ next }) => {
          useEffect(() => {
            const timer = setTimeout(next, 3000);
            return () => clearTimeout(timer);
          }, []);
          return (
            <div className="relative px-4 h-full pb-10 space-y-16">
              <h2 className="text-2xl w-[220px] font-thin">
                Preparing your Incentive Passport
              </h2>
              <div className="flex flex-col items-center w-full gap-y-10 pb-20">
                <div className="space-y-8 w-full">
                  <Check title="TON Address" />
                  <Check title="Telegram Account" />
                  <Check title="Twitter Account" />
                  <Check title="Discord Account" />
                  <Check title="Incentive Footprint" />
                </div>
              </div>
            </div>
          );
        },
      },
      {
        show: true,
        key: 'passport',
        content: ({ next }) => (
          <Frame
            style={{ backgroundImage: `url(${genBg2})` }}
            onClick={next}
            header={
              <>
                <p className="text-white">Great Job!</p>
                <p className="text-white">Your Incentive Passport is ready.</p>
              </>
            }
            button={
              <Button
                className="flex items-center justify-center font-syne gap-x-1.5 h-10 w-full "
                onClick={next}
              >
                Check your WISE Credit Score
              </Button>
            }
          >
            <PassportCard />
          </Frame>
        ),
      },
      {
        show: tg.connected,
        key: 'tg-user',
        content: ({ next }) => (
          <Frame
            style={{ backgroundImage: `url(${genBg3})` }}
            onClick={next}
            header={
              <>
                <p className="text-white">Wow!</p>
                <p className="text-white">You're a loyal telegram user</p>
              </>
            }
            footer={
              <div className="leading-none">
                <p>This improves your WISE Credit Score by</p>
                <p className="text-white text-[40px]">
                  <span className="text-color8">+10K</span>
                </p>
              </div>
            }
          >
            <div className="flex flex-col items-center">
              <TgIcon className="size-[160px]" />
              <p>You're granted with a special WISE Credential</p>
              <p className="text-xl">Telegram Veteran</p>
            </div>
          </Frame>
        ),
      },
      {
        show: data?.identityScore?.tgPremiumScore > 0,
        key: 'tg-premium',
        content: ({ next }) => (
          <Frame
            style={{ backgroundImage: `url(${genBg4})` }}
            header={
              <>
                <p className="text-white">As a royal Telegram Premium, </p>
                <p className="text-white">you stand out as 10%</p>
              </>
            }
            footer={
              <div className="leading-none">
                <p>The Credential improves your WISE Credit Score</p>
                <p className="text-white text-[40px]">
                  <span className="text-color8">+10K</span>
                </p>
              </div>
            }
            onClick={next}
          >
            <div className="w-full flex flex-col items-center">
              <TgPremiumIcon className="size-[160px]" />
              <p className="text-sm">So you awarded an extra WISE Credential</p>
              <p className="text-xl">#Telegram Premium</p>
            </div>
          </Frame>
        ),
      },
      {
        // show: data?.engagementScore?.tonLiquidityProvideScore > 0,
        show: false,
        key: 'ton-liquidity-provider',
        content: ({ next }) => (
          <Frame
            onClick={next}
            header="You're a TON hero."
            footer={
              <>
                <p>You are an outstanding</p>
                <p>liquidity provider on TON.</p>
              </>
            }
          >
            <div className="space-y-8 w-full flex flex-col items-center">
              <div className="text-[150px] leading-[150px] relative">
                💧
                <TonIcon
                  className="size-10 absolute right-9 bottom-0"
                  fill="white"
                />
              </div>
              <p className="text-xl">Token Ranger</p>
            </div>
          </Frame>
        ),
      },
      {
        // show:
        //   data?.engagementScore?.tonTransactionsScore > 0 ||
        //   data?.engagementScore?.notCoinTransactionScore > 0,
        show: false,
        key: 'tonchain-header',
        content: ({ next }) => (
          <Frame
            onClick={next}
            header="You're a Token Hoarder on TON."
            footer={
              <>
                <p>You have several transaction records </p>
                <p>of Toncoin or Notcoin.</p>
              </>
            }
          >
            <div className="space-y-8 w-full flex flex-col items-center">
              <TonIcon className="size-[160px]" />
              <p className="text-xl">Liquidity Provider</p>
            </div>
          </Frame>
        ),
      },
      {
        // show: data?.socialScore?.score > 0,
        show: false,
        key: 'fans',
        content: ({ next }) => (
          <Frame
            onClick={next}
            header="You're a social star!"
            footer={
              <>
                <p>You have a large and engaged</p>
                <p>following on social media!</p>
              </>
            }
          >
            <div className="space-y-8 w-full flex flex-col items-center">
              <div className="text-[150px] leading-[150px]">🌟</div>
              <p className="text-xl">
                {formatImpact(data?.socialScore?.score ?? 0)} Fans
              </p>
            </div>
          </Frame>
        ),
      },
      {
        show: true,
        key: 'wise-credit',
        content: () => (
          <Frame
            onClick={hide}
            header={
              <>
                <p className="text-white">Bravo!</p>
                <p className="text-white">
                  You level up to WISE
                  <WiseTag value={totalScore} className="mx-1" />
                </p>
              </>
            }
            footer={
              ton.connected ? (
                <p className="text-white/80">
                  Connect TON wallet successfully👏
                </p>
              ) : (
                <>
                  <p className="text-white/80">
                    Now, you could connect your TON wallet to
                  </p>
                  <p className="text-white/80">
                    improve WISE Credit Score by 10K.
                  </p>
                </>
              )
            }
            button={
              <>
                {ton.connected ? (
                  <Button
                    className="flex items-center justify-center font-syne gap-x-1.5 h-10 w-full "
                    onClick={hide}
                  >
                    View your WISE Credit Score
                    <ArrowIcon />
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
                      <button className="text-xs underline text-white/60">
                        Maybe later
                      </button>
                    </div>
                  </>
                )}
              </>
            }
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
    ]
      .filter((frame) => frame.show)
      .map((c, idx) => {
        return {
          ...c,
          idx,
          next() {
            if (swiperKeyList.includes(c.name)) {
              // slideTo()
            }
            setDisplayIdx(idx + 1);
          },
        };
      });
  }, [data, tg]);
  // console.log({ data });
  const swiperList = frames.filter((f) => swiperKeyList.includes(f.key));
  const CurrentFrame = frames.find((v) => v.idx === displayIdx);

  return (
    <div className="fixed inset-0 py-12 overflow-auto">
      {displayIdx === -1 ? (
        <Loading text="Aggregating metrics..." />
      ) : (
        <>
          {swiperKeyList.includes(CurrentFrame.key) && (
            <div className="flex h-0.5 items-center gap-x-2 px-10 mx-auto absolute inset-0 top-14">
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
          {CurrentFrame?.content && (
            <CurrentFrame.content next={CurrentFrame.next} />
          )}
        </>
      )}
    </div>
  );
}
