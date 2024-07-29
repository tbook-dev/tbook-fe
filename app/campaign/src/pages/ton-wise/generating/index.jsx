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

preloadImage(wisescoreRadarpng);
export default function Generating({
  data,
  hasWiseScoreRes,
  isFirstCreate,
  hide,
}) {
  const { getSocialByName } = useSocial();
  const [displayIdx, setDisplayIdx] = useState(-1);
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
    return () => timer && clearTimeout(timer);
  }, [isFirstCreate]);

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
            onClick={next}
            header="Your Incentive Passport is ready."
            footer={
              <>
                <p>You have generated TBook incentive passport</p>
                <p>with your telegram account.</p>
              </>
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
            onClick={next}
            header="You're a loyal telegram user! "
            footer={
              <>
                <p>You have joined telegram with </p>
                <p>
                  <span className="text-[#2E85EA] me-1">@{tg.userName}</span>in
                  a while.
                </p>
              </>
            }
          >
            <TgIcon className="size-[160px]" />
          </Frame>
        ),
      },
      {
        show: data?.identityScore?.tgPremiumScore > 0,
        key: 'tg-premium',
        content: ({ next }) => (
          <Frame
            onClick={next}
            header="You're one of the Telegram Premiums"
            footer={
              <>
                <p>You have upgraded to Telegram Premium</p>
                <p>to get the best.</p>
              </>
            }
          >
            <div className="space-y-8 w-full flex flex-col items-center">
              <TgPremiumIcon className="size-[160px]" />
              <p className="text-xl">Premium User</p>
            </div>
          </Frame>
        ),
      },
      {
        show: data?.engagementScore?.tonLiquidityProvideScore > 0,
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
        show:
          data?.engagementScore?.tonTransactionsScore > 0 ||
          data?.engagementScore?.notCoinTransactionScore > 0,
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
        show: data?.socialScore?.score > 0,
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
                You are WISE <WiseTag value={totalScore} />!
              </>
            }
            footer={
              <>
                <p>WISE Score represents your overall</p>
                <p>impact in the TON community.</p>
              </>
            }
            button={
              <Button
                className="flex items-center justify-center font-syne gap-x-1.5 h-10 w-full "
                onClick={hide}
              >
                Claim Privilege with WISE Credit
                <ArrowIcon />
              </Button>
            }
          >
            <div
              className="w-[259px] h-[212px] flex justify-center items-center bg-center bg-contain"
              style={{ backgroundImage: `url(${wisescoreRadarpng})` }}
            >
              <span className="text-color4 font-syne text-xl font-bold">
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
            setDisplayIdx(idx + 1);
          },
        };
      });
  }, [data, tg]);
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
