import { useEffect, useState, useMemo } from 'react';
import TgPremiumIcon from '@/images/icon/svgr/tg-premium.svg?react';
import NotcoinIcon from '@/images/icon/svgr/notcoin.svg?react';
import TonIcon from '@/images/icon/svgr/ton.svg?react';
import ArrowIcon from '@/images/icon/svgr/arrow2.svg?react';
import wisescoreRadarSVG from '@/images/wise/radar.svg';
import { formatImpact } from '@tbook/utils/lib/conf';
import Button from '../components/button';
import Check from './check';
import PassportCard from '@/components/passportGen/card';
import Loading from '@/components/loading';
import WiseTag from '../components/wiseTag';

export default function Generating({ data, hasWiseScoreRes, hide }) {
  const [displayIdx, setDisplayIdx] = useState(-1);
  const totalScore = data?.totalScore ?? 0;
  useEffect(() => {
    if (hasWiseScoreRes === false) {
      hide();
    }
  }, [hasWiseScoreRes]);
  useEffect(() => {
    let timer;
    if (data) {
      if (data?.isFirstCreate === false) {
        hide();
      }
      timer = setTimeout(() => {
        setDisplayIdx(0);
      }, 100);
    }
    return () => clearTimeout(timer);
  }, [data]);

  const frames = useMemo(() => {
    return [
      {
        show: true,
        key: 'start',
        content: ({ next }) => (
          <div className="relative h-full flex flex-col justify-end items-center pb-10">
            <Loading className="animate-none" />
            <div className="text-center text-base z-10 pb-20">
              <h2>Generate WISE Credit.</h2>
              <h3>Enjoy your web3 credit journey !</h3>
            </div>
            <Button
              className="h-10 w-[310px] absolute bottom-10 inset-x-0 mx-auto z-10"
              onClick={next}
            >
              Let’s go
            </Button>
          </div>
        ),
      },
      {
        show: true,
        key: 'check',
        content: ({ next }) => {
          useEffect(() => {
            const timer = setTimeout(next, 3000);
            return () => clearTimeout(timer);
          }, []);
          return (
            <div className="relative px-4 h-full pb-10 space-y-16">
              <h2 className="text-2xl w-[220px] font-thin">
                Checking your Incentive Passport
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
              {/* <Button
                className="h-10 w-[310px] absolute bottom-10 inset-x-0 mx-auto"
                onClick={next}
              >
                Continue
              </Button> */}
            </div>
          );
        },
      },
      {
        show: true,
        key: 'passport',
        content: ({ next }) => (
          <div className="relative px-4 h-full pb-10 flex flex-col justify-center min-h-[580px]">
            <h2 className="text-2xl w-full absolute top-0 left-0 text-center">
              Becoming TBook <WiseTag value={totalScore} />
            </h2>
            <div className="pt-5">
              <PassportCard onClose={() => null} />
            </div>
            <Button
              className="h-10 w-[310px] mx-auto absolute inset-x-0 bottom-10"
              onClick={next}
            >
              Continue
            </Button>
          </div>
        ),
      },
      {
        show: false,
        key: 'tg-year',
        content: ({ next }) => (
          <div className="relative px-4 h-full pb-10 flex flex-col justify-center">
            <h2 className="text-2xl w-full absolute top-0 left-0 text-center">
              You’ve joined Telegram
            </h2>
            <div className="flex flex-col items-center w-full gap-y-10">
              <div className="space-y-8 w-full flex flex-col items-center">
                <div className="text-[150px] leading-[150px]">1</div>
                <p className="text-xl">Premium User</p>
              </div>
            </div>
            <Button
              className="h-10 w-[310px] mx-auto absolute inset-x-0 bottom-10"
              onClick={next}
            >
              Continue
            </Button>
          </div>
        ),
      },
      {
        show: data?.identityScore?.tgPremiumScore > 0,
        key: 'tg-premium',
        content: ({ next }) => (
          <div className="relative px-4 h-full pb-10 flex flex-col justify-center min-h-[400px]">
            <h2 className="text-2xl w-full absolute top-0 left-0 text-center">
              Telegram Premium
            </h2>
            <div className="flex flex-col items-center w-full gap-y-10">
              <div className="space-y-8 w-full flex flex-col items-center">
                <TgPremiumIcon className="size-[160px]" />
                <p className="text-xl">Premium User</p>
              </div>
            </div>
            <Button
              className="h-10 w-[310px] mx-auto absolute inset-x-0 bottom-10"
              onClick={next}
            >
              Continue
            </Button>
          </div>
        ),
      },
      {
        show: data?.engagementScore?.notCoinTransactionScore > 0,
        key: 'notcoin-liquidity-provider',
        content: ({ next }) => (
          <div className="relative px-4 h-full pb-10 flex flex-col justify-center min-h-[400px]">
            <h2 className="text-2xl w-full absolute top-0 left-0 text-center">
              Liquidity Provider
            </h2>
            <div className="flex flex-col items-center w-full gap-y-10">
              <div className="space-y-8 w-full flex flex-col items-center">
                <NotcoinIcon className="size-[180px]" />
                <p className="text-xl">Notcoin LP</p>
              </div>
            </div>
            <Button
              className="h-10 w-[310px] mx-auto absolute inset-x-0 bottom-10"
              onClick={next}
            >
              Continue
            </Button>
          </div>
        ),
      },
      {
        show: data?.engagementScore?.tonTransactionsScore > 0,
        key: 'ton-liquidity-provider',
        content: ({ next }) => (
          <div className="relative px-4 h-full pb-10 flex flex-col justify-center min-h-[400px]">
            <h2 className="text-2xl w-full absolute top-0 left-0 text-center">
              Onchain Footprint
            </h2>
            <div className="flex flex-col items-center w-full gap-y-10">
              <div className="space-y-8 w-full flex flex-col items-center">
                <TonIcon className="size-[160px]" />
                <p className="text-xl">Token Ranger</p>
              </div>
            </div>
            <Button
              className="h-10 w-[310px] mx-auto absolute inset-x-0 bottom-10"
              onClick={next}
            >
              Continue
            </Button>
          </div>
        ),
      },
      {
        show: data?.socialScore?.score > 0,
        key: 'fans',
        content: ({ next }) => (
          <div className="relative px-4 h-full pb-10 flex flex-col justify-center min-h-[400px]">
            <h2 className="text-2xl w-full absolute top-0 left-0 text-center">
              Social Star!
            </h2>
            <div className="flex flex-col items-center w-full gap-y-10">
              <div className="space-y-8 w-full flex flex-col items-center">
                <div className="text-[150px] leading-[150px]">🌟</div>
                <p className="text-xl">
                  {formatImpact(data?.socialScore?.score ?? 0)} Fans
                </p>
              </div>
            </div>
            <Button
              className="h-10 w-[310px] mx-auto absolute inset-x-0 bottom-10"
              onClick={next}
            >
              Continue
            </Button>
          </div>
        ),
      },
      {
        show: true,
        key: 'wise-credit',
        content: ({ next }) => (
          <div className="relative px-4 h-full pb-10 flex flex-col justify-center min-h-[420px]">
            <div className="absolute top-0 left-0 text-center  w-full">
              <h2 className="text-2xl">
                You are <WiseTag value={totalScore} />!
              </h2>
              <p className="text-base"> Here is your WISE Credit Score</p>
            </div>
            <div className="flex flex-col items-center w-full gap-y-10">
              <div
                className="w-[280px] h-[252px] flex justify-center items-center bg-center bg-contain"
                style={{ backgroundImage: `url(${wisescoreRadarSVG})` }}
              >
                <span className="text-color4 font-syne text-xl font-bold">
                  {formatImpact(data?.totalScore ?? 0)}
                </span>
              </div>
            </div>
            <Button
              className="flex items-center justify-center font-syne gap-x-1.5 h-10 w-[310px] mx-auto absolute inset-x-0 bottom-10"
              onClick={hide}
            >
              Claim Privilege with WISE Credit
              <ArrowIcon />
            </Button>
          </div>
        ),
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
  }, [data]);
  // console.log({ data });
  const CurrentFrame = frames.find((v) => v.idx === displayIdx);
  return (
    <div className="fixed inset-0 py-12 overflow-auto">
      {displayIdx === -1 ? (
        <Loading />
      ) : (
        CurrentFrame?.content && (
          <CurrentFrame.content next={CurrentFrame.next} />
        )
      )}
    </div>
  );
}
