import { memo } from 'react';
import { formatImpact } from '@tbook/utils/lib/conf';
import LazyImage from '@/components/lazyImage';
import { Statistic } from 'antd';
import clsx from 'clsx';
import { Link, useLoaderData } from 'react-router-dom';


function ProjectTon ({
  banner,
  projectLogoUrl,
  avatarUrl,
  projectDescription,
  projectName,
  projectUrl,
  isActive,
}) {

  const { isLightTheme } = useLoaderData()
  // const isLightTheme = false

  return (
    <Link
      to={ `/${projectUrl}` }
      className={ clsx(
        'relative rounded-xl overflow-hidden flex flex-col',
        isLightTheme ? 'text-black' : 'text-white/90',
        isActive
          ? isLightTheme ? 'shadow-s2 bg-white' : 'shadow-s2 bg-[#252525]'
          : isLightTheme ? 'bg-white' : 'bg-[#1e1e1e]'
      ) }
    >
      <LazyImage
        src={ banner }
        className="w-full h-[160px] lg:h-[140px] object-cover object-center"
        alt="banner"
      />
      <div className="flex flex-col justify-between flex-auto p-5 gap-y-3">
        <div className="space-y-2">
          <div className="flex items-center text-sm gap-x-2">
            <img className="size-4" src={ avatarUrl } alt="project logo" />
            { projectName }
          </div>
          <h2 className="text-base font-medium">{ projectDescription }</h2>
        </div>

        {/* <div className="space-y-3">
          <div className='flex items-center gap-x-1 text-[#C0ABD9]'>
            <span className='font-zen-dot'>{formatImpact(participantNum)}</span>
            {participantNum > 1 ? 'Participants' : 'Participant'}
          </div>
        </div> */}
      </div>
    </Link>
  );
}

export default memo(ProjectTon);
