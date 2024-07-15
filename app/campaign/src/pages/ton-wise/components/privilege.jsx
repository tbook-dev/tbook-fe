import { useMemo } from 'react';
import sbtSVG from '@/images/wise/rewards/sbt.png';

export default function Privilege() {
  const list = useMemo(() => {
    return [
      {
        text: 'WISE SBT',
        img: <img src={sbtSVG} className="size-[30px]" />,
      },
    ];
  }, []);
  return (
    <div className="space-y-2">
      <h2 className="text-sm text-white/40">Privilege</h2>
      <div className="flex items-center gap-x-2">
        {list.map((v) => {
          return (
            <div className="space-y-1" key={v.text}>
              <div className="size-12 rounded-full bg-white/5 flex items-center justify-center">
                {v.img}
              </div>
              <span className="text-xs">{v.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
