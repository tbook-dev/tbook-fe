import { useEffect, useState, useCallback, useMemo } from 'react';
import SBTIcon from '@/images/icon/svgr/sbt2k.svg?react';
import Button from '../components/button';
import Check from './check';
export default function Generating({ data, hasWiseScoreRes, wiseTag, hide }) {
  const isFirstGen = data?.isFirstGen;
  //
  const [displayIdx, setDisplayIdx] = useState(0);
  useEffect(() => {
    if (!hasWiseScoreRes) {
      // hide();
    }
  }, [hasWiseScoreRes]);
  const Loading = useCallback(() => {
    return (
      <div className="relative h-full">
        <SBTIcon className="animate-pulse size-[150px]" />
      </div>
    );
  }, []);
  const frames = useMemo(() => {
    return [
      {
        show: false,
        key: 'start',
        content: ({ next }) => (
          <div className="relative h-full flex flex-col justify-end items-center pb-10">
            <SBTIcon />
            <div className="space-y-12">
              <div className="text-center text-base">
                <h2>Generate WISE Credit.</h2>
                <h3>Enjoy your web3 credit journey !</h3>
              </div>
              <Button className="h-10 w-[310px]" onClick={next}>
                Let’s go
              </Button>
            </div>
          </div>
        ),
      },
      {
        show: true,
        key: 'check',
        content: ({ next }) => (
          <div className="relative px-4 h-full flex flex-col justify-between gap-y-16 pb-10">
            <h2 className="text-2xl w-[220px] font-thin">
              Checking your Incentive Passport
            </h2>
            <div className="flex flex-col items-center w-full gap-y-10">
              <div className="space-y-8 w-full">
                <Check title="TON Address" />
                <Check title="Telegram Account" />
                <Check title="Twitter Account" />
                <Check title="Discord Account" />
                <Check title="Incentive Footprint" />
              </div>
              <Button className="h-10 w-[310px] mx-auto" onClick={next}>
                Continue
              </Button>
            </div>
          </div>
        ),
      },
      {
        show: true,
        key: 'passport',
        content: ({ next }) => (
          <div className="relative px-4 h-full flex flex-col justify-center gap-y-16 pb-10">
            <h2 className="text-2xl text-center">Becoming TBook {wiseTag}!</h2>
            <div className="flex flex-col items-center w-full gap-y-10">
              <div className="space-y-8 w-full">
                <div></div>
              </div>
              <Button className="h-10 w-[310px] mx-auto" onClick={next}>
                Continue
              </Button>
            </div>
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
        <Loading />
      ) : (
        CurrentFrame?.content && (
          <CurrentFrame.content next={CurrentFrame.next} />
        )
      )}
    </div>
  );
}
