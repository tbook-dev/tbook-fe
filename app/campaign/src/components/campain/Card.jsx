import { Link, useLoaderData } from 'react-router-dom';
import { formatStandard } from '@tbook/utils/lib/conf';
import clsx from 'clsx'

// 上下解构
export default function CampaignCard ({
  campaignId,
  picUrl,
  name,
  nft,
  points,
  project,
  participantNum = 0,
}) {
  const { isUsingSubdomain, projectUrl, isLightTheme } = useLoaderData();

  return (
    <Link
      to={`${
        isUsingSubdomain ? '' : `/${project?.projectUrl || projectUrl}`
      }/${campaignId}`}
      className='rounded-xl bg-[rgb(144,75,246)]/[0.1] p-5 flex flex-col gap-y-8 justify-between'
    >
      <div>
        <img
          src={picUrl}
          className='rounded-lg w-full h-[200px] object-center object-cover mb-4'
        />
        <h1 className='text-base font-medium'>{name}</h1>
        <h2 className={ clsx("text-xs", isLightTheme ? 'text-[#333]' : 'text-[#C4C4C4] ')}>
          {formatStandard(participantNum)} Participants
        </h2>
      </div>

      <div className='flex items-center text-xs font-medium gap-x-2'>
        {nft > 0 && <div className='px-1.5 bg-[#904BF6] rounded-full'>nft</div>}
        {points > 0 && (
          <div className='px-1.5 bg-[#904BF6] rounded-full'>points</div>
        )}
      </div>
    </Link>
  );
}
