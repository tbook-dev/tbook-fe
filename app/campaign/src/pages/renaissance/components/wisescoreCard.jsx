import { formatImpact } from '@tbook/utils/lib/conf';
import moduleConf from '../conf';
import Button from './ui/button';
import { Link } from 'react-router-dom';
import Score from './ui/score';
import { cn } from '@/utils/conf';
import { useUserRenaissanceKit, useLevel } from '@/hooks/useUserRenaissance';

export default function WisescoreCard () {
  const { tpoints } = useUserRenaissanceKit();
  const { userLevel, totalWiseScore } = useLevel();

  return (
    <>
      <div
        className={cn(
          'relative flex flex-col items-center gap-5 py-4 px-5 rounded-2xl border border-[#FFEAB5]/30',
          userLevel === 3 ? 'mt-3' : 'mt-1'
        )}
      >
        <div className='space-y-2 w-full'>
          <div className='flex justify-between items-center w-full'>
            <div className='text-[#FFDFA2] bg-[#F8C685]/5 rounded-md py-1 px-2'>
              <span className='mr-1 font-syne font-bold'>TPoints</span>
              {formatImpact(tpoints)}
            </div>
            <div className='text-[#F2A85D]/60 bg-[#F8C685]/5 rounded-md font-medium py-1 px-2'>
              {moduleConf.endTime}
            </div>
          </div>

          <div className='flex flex-col items-center gap-1 text-center'>
            <div className='text-color5 text-lg font-bold font-syne'>
              WISE Score <br />
              Credit on TON
            </div>
          </div>
        </div>

        <Score text={formatImpact(totalWiseScore)} />

        <div className='flex justify-center'>
          <Link to='/event/renaissance'>
            <Button>Improve WISE Score</Button>
          </Link>
        </div>
      </div>
      <>
        <Link
          to='/event/renaissance'
          className='fixed top-20 left-2.5 flex flex-col'
        >
          {moduleConf.svg.scratchButton}
          <img src={moduleConf.url.dog} className='relative -top-1 size-12' />
        </Link>
      </>
    </>
  );
}
