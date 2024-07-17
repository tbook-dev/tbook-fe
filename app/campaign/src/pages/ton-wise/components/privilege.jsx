import { useMemo } from 'react';
import sbtPNG from '@/images/wise/rewards/sbt.png';
import { Link } from 'react-router-dom';
export default function Privilege() {
  const list = useMemo(() => {
    return [
      {
        text: 'WISE SBT',
        img: (
          <Link to="/wise-score/sbt">
            <img src={sbtPNG} className="size-[30px]" />
          </Link>
        ),
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
