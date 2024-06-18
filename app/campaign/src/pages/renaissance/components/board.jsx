import moduleConf from '../conf';
import { useUserRenaissanceKit, useLevel } from '@/hooks/useUserRenaissance';
import { formatImpact } from '@tbook/utils/lib/conf';
import sbtIcon from '@/images/wise/prize/wise-sbt.png';
import { Link } from 'react-router-dom';
import { memo } from 'react';

function Board () {
  const { tpoints, luckyDrawCnt, isInSBTWhiteList } = useUserRenaissanceKit();
  const { userLevel, totalWiseScore } = useLevel();
  const hasWiseScore = userLevel && userLevel !== 1;
  return (
    <div className='flex justify-between items-stretch'>
      <div className='border border-[#FFEAB5]  rounded-xl bg-linear9 px-4 py-2 text-[#FFDFA2] text-xs space-y-2 w-max'>
        <div className='flex justify-between items-center'>
          <span className='flex items-center gap-x-1 font-syne'>
            <img src={moduleConf.url.tpoint} className='size-3' />
            TPoints
          </span>
          {formatImpact(tpoints)}
        </div>

        <div className='flex justify-between items-center gap-x-4'>
          <div className='flex items-center gap-x-1'>
            <img src={moduleConf.url.cat} className='w-5 -mt-1' />

            <div className='flex font-syne'>
              <span className='font-rhd mr-1'>
                {luckyDrawCnt > 1000
                  ? formatImpact(luckyDrawCnt)
                  : luckyDrawCnt}
              </span>
              scratch card
              {luckyDrawCnt > 0 && 's'}
            </div>
          </div>
          {isInSBTWhiteList && <img src={sbtIcon} className='size-6' />}
        </div>
      </div>

      {hasWiseScore ? (
        <Link
          to='/event/renaissance/detail'
          className='px-4 py-2 rounded-xl border border-[#3f3b30] font-syne text-center'
        >
          <div className='text-[#FFDFA2] text-base'>WISE Score</div>
          <span className='text-renaissance-1 text-xl font-bold leading-[20px]'>
            {formatImpact(totalWiseScore)}
          </span>
        </Link>
      ) : (
        <div className='px-4 py-2 rounded-xl border border-[#3f3b30] font-syne text-center'>
          <div className='text-[#FFDFA2] text-base'>WISE Score</div>
          <span className='text-renaissance-1 text-xl font-bold leading-[20px]'>
            8???8
          </span>
        </div>
      )}
    </div>
  );
}

export default memo(Board);
