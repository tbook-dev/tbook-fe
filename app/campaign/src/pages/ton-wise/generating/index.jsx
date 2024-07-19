import { useEffect, useState, useCallback, useMemo } from 'react';
import SBTIcon from '@/images/icon/svgr/sbt.svg?react';
import SBT20KIcon from '@/images/icon/svgr/sbt20K.svg?react';
import SBT50KIcon from '@/images/icon/svgr/sbt50K.svg?react';
import SBT200KIcon from '@/images/icon/svgr/sbt200K.svg?react';
import SBT500KIcon from '@/images/icon/svgr/sbt500K.svg?react';
import SBT1MIcon from '@/images/icon/svgr/sbt1M.svg?react';
import Button from '../components/button';
import Check from './check';
import clsx from 'clsx';

export default function Generating({ data, hasWiseScoreRes, wiseTag, hide }) {
  const isFirstGen = data?.isFirstCreate;
  //
  const [displayIdx, setDisplayIdx] = useState(0);
  useEffect(() => {
    if (!hasWiseScoreRes) {
      // hide();
    }
  }, [hasWiseScoreRes]);
  const Loading = useCallback(({ className }) => {
    return (
      <div className={clsx(className, 'relative h-full overflow-hidden ')}>
        <SBTIcon className="opacity-80 size-[150px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
        <SBT20KIcon className="opacity-80 size-[120px] absolute  top-10 -left-6" />
        <SBT50KIcon className="opacity-80 size-[110px] absolute bottom-10 -right-8" />
        <SBT200KIcon className="opacity-80 size-[130px] absolute bottom-20 left-0" />
        <SBT500KIcon className="opacity-80 size-[120px] absolute bottom-0 top-48" />
        <SBT1MIcon className="opacity-80 size-[100px] absolute top-0 right-10" />
        <div className="absolute inset-0 z-10 bg-gradient-to-b	from-black/50 to-black/80 from-50%" />
      </div>
    );
  }, []);
  const frames = useMemo(() => {
    return [
      {
        show: true,
        key: 'start',
        content: ({ next }) => (
          <div className="relative h-full flex flex-col justify-end items-center pb-10">
            <div className="absolute inset-0">
              <Loading />
            </div>
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
        content: ({ next }) => (
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
            <Button
              className="h-10 w-[310px] absolute bottom-10 inset-x-0 mx-auto"
              onClick={next}
            >
              Continue
            </Button>
          </div>
        ),
      },
      {
        show: true,
        key: 'passport',
        content: ({ next }) => (
          <div className="relative px-4 h-full pb-10">
            <h2 className="text-2xl text-center">Becoming TBook {wiseTag}!</h2>
            <div className="flex flex-col items-center w-full gap-y-10">
              <div className="space-y-8 w-full">
                <div></div>
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
        show: data?.identityScore?.tgPremiumScore >= 0,
        key: 'tgPremium',
        content: ({ next }) => (
          <div className="relative px-4 h-full pb-10 flex flex-col justify-center">
            <h2 className="text-2xl w-full absolute top-0 left-0 text-center">
              You’ve joined Telegram
            </h2>
            <div className="flex flex-col items-center w-full gap-y-10 pb-20">
              <div className="space-y-8 w-full flex flex-col items-center">
                <div className="text-[160px] leading-[160px]">1</div>
                <p className="text-xl">year ago</p>
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
  console.log({ data });

  const CurrentFrame = frames.find((v) => v.idx === displayIdx);
  return (
    <div className="fixed inset-0 py-12">
      {!data ? (
        <Loading className="animate-pulse" />
      ) : (
        CurrentFrame?.content && (
          <CurrentFrame.content next={CurrentFrame.next} />
        )
      )}
    </div>
  );
}
