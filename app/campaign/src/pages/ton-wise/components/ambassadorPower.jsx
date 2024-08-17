import { useMemo } from 'react';
import TpointIcon from '@/images/icon/svgr/tpoint.svg?react';
import { ArrowIcon } from './ambassadorSwiper';

const AmbassadorPower = () => {
  const list = useMemo(() => {
    return [
      {
        type: 'invite',
        content: '+6,000 TPoints',
        title: 'Invite 1 friends to generate WISE Score',
        arrowColor: '#CDE69E',
      },
    ];
  }, []);
  return (
    <div className="space-y-2 fixed px-5 pt-4 bottom-0 inset-x-0 h-[220px] overflow-auto rounded-t-2xl bg-black/40">
      <h2 className="text-base font-medium">Max Ambassador Power</h2>
      <div className="space-y-1">
        {list.map((v, i) => {
          return (
            <button
              key={i}
              className="w-full px-4 py-3 flex items-center justify-between gap-x-1 border border-white/10 rounded-lg bg-white/10"
            >
              <div>
                <div className="text-base"> {v.title}</div>
                <div className="text-sm flex items-center gap-x-1">
                  <TpointIcon className="size-3" />
                  {v.content}
                </div>
              </div>
              <ArrowIcon stroke={v.arrowColor} />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AmbassadorPower;
