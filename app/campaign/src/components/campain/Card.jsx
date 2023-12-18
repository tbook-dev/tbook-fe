import { Link } from 'react-router-dom'
import { formatDollar } from '@tbook/utils/lib/conf'

// 上下解构
export default function CampaignCard ({
  campaignId,
  picUrl,
  name,
  nft,
  points,
  projectId,
  participantNum = 0
}) {
  return (
    <Link
      to={`/app/${projectId}/campaign/${campaignId}`}
      target='__blank'
      className='rounded-xl bg-[rgb(144,75,246)]/[0.1] p-5 flex flex-col gap-y-8 justify-between'
    >
      <div>
        <img
          src={picUrl}
          className='rounded-lg w-full h-[200px] object-center object-cover mb-4'
        />
        <h1 className='text-base font-medium'>{name}</h1>
        <h2 className='text-[#C4C4C4] text-xs'>
          {formatDollar(participantNum)} Participants
        </h2>
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
