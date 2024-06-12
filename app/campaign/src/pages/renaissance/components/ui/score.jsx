import { cn } from '@/utils/conf';
import moduleConf from '../../conf';

export default function Score ({ className, text = '8???8', ...props }) {
  return (
    <div
      className={cn(
        className,
        'w-[280px] h-[252px] flex justify-center items-center bg-center bg-contain'
      )}
      style={{ backgroundImage: `url(${moduleConf.url.wisescoreRadar})` }}
      {...props}
    >
      <span className='text-color4 font-syne text-xl font-bold'>{text}</span>
    </div>
  );
}
