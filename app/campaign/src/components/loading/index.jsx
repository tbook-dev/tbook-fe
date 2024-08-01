import { cn } from '@/utils/conf';

import SBTIcon from '@/images/icon/svgr/sbt.svg?react';
import SBT20KIcon from '@/images/icon/svgr/sbt20K.svg?react';
import SBT50KIcon from '@/images/icon/svgr/sbt50K.svg?react';
import SBT200KIcon from '@/images/icon/svgr/sbt200K.svg?react';
import SBT500KIcon from '@/images/icon/svgr/sbt500K.svg?react';
import SBT1MIcon from '@/images/icon/svgr/sbt1M.svg?react';

export default function Loading({ className, text = '' }) {
  return (
    <div
      className={cn(
        'fixed inset-0 h-full overflow-hidden',
        className
      )}
    >
      <SBTIcon className="animate-pulse opacity-80 size-[150px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
      <SBT20KIcon className="animate-pulse opacity-80 size-[120px] absolute top-12 lg:top-20 left-6" />
      <SBT50KIcon className="animate-pulse opacity-80 size-[110px] absolute bottom-10 right-8" />
      <SBT200KIcon className="animate-pulse opacity-80 size-[130px] absolute bottom-20 left-0" />
      <SBT500KIcon className="animate-pulse opacity-80 size-[120px] absolute top-80 left-20  lg:left-40" />
      <SBT1MIcon className="animate-pulse opacity-80 size-[100px] absolute top-20 lg:top-10 right-10" />
      <div className="absolute inset-0 z-10 bg-gradient-to-b	from-black/50 to-black/80 from-50%" />
      {text && <p className='text-white/60 text-base text-center inset-x-0 absolute z-20 bottom-20'>{text}</p>}
    </div>
  );
}
