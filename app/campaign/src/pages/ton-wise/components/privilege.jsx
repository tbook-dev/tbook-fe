import { useMemo } from 'react';
import SBTIcon from '@/images/icon/svgr/sbt.svg?react';
import AmbassadorIcon from '@/images/icon/svgr/ambassador.svg?react';

import { Link } from 'react-router-dom';
export default function Privilege() {
  const list = useMemo(() => {
    return [
      {
        text: 'WISE SBT',
        img: <SBTIcon className="size-[30px]" />,
        link: '/wise-score/sbt',
      },
      {
        text: 'Ambassador',
        img: <AmbassadorIcon className="size-[30px]" />,
        link: '/wise-score/ambassador',
      },
    ];
  }, []);
  return (
    <div className="space-y-2">
      <h2 className="text-sm text-white/40">Privilege</h2>
      <div className="flex items-center gap-x-2">
        {list.map((v) => {
          return (
            <Link
              to={v.link}
              className="flex flex-col items-center"
              key={v.text}
            >
              <div className="size-12 rounded-full bg-white/5 flex items-center justify-center">
                {v.img}
              </div>
              <span className="text-xs">{v.text}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
