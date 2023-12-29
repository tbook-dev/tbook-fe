import { Link, useLoaderData } from 'react-router-dom'
import { formatDollar } from '@tbook/utils/lib/conf'

export default function CampaignCard ({
  campaignId,
  picUrl,
  name,
  nft,
  points,
  project,
  participantNum = 0
}) {
  const { isUsingSubdomain, projectName } = useLoaderData()

  return (
    <Link
      to={`/${
        isUsingSubdomain ? '' : `${project?.project || projectName}`
      }/${campaignId}`}
      target='__blank'
      className='rounded-xl bg-[rgb(144,75,246)]/[0.1] p-5 flex flex-col gap-y-8 justify-between'
    >
      <div className='flex justify-between'>
        <div className='w-[180px]'>
          <h1 className='text-base font-medium'>{name}</h1>
          <h2 className='text-[#C4C4C4] text-xs'>
            {formatDollar(participantNum)} Participants
          </h2>
        </div>

        <img
          src={picUrl}
          className='rounded-lg h-20 w-20 object-center object-cover hover:scale-150 transition-all'
        />
      </div>

      <div className='flex items-center gap-x-2 text-xs font-medium'>
        {nft > 0 && <div className='px-1.5 bg-[#904BF6] rounded-full'>nft</div>}
        {points > 0 && (
          <div className='px-1.5 bg-[#904BF6] rounded-full'>points</div>
        )}
      </div>
    </Link>
  )
}
