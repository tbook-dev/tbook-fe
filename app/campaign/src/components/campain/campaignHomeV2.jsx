import { Link, useLoaderData } from 'react-router-dom'
import { memo, useMemo } from 'react'
import { incentiveAssetsTypeList } from '@/utils/conf'
import { formatDollar } from '@tbook/utils/lib/conf'

function Compaign ({ campaignId, picUrl, name, project, users, groups }) {
  const { isUsingSubdomain } = useLoaderData()
  const rewardOpt = useMemo(() => {
    const hasNFT = groups.some(v => v.nftList.length > 0)
    const hasPoint = groups.some(v => v.pointList.length > 0)
    return { hasNFT, hasPoint }
  }, [groups])

  return (
    <Link
      to={`${isUsingSubdomain ? '' : `/${project?.projectName}`}/${campaignId}`}
      className='rounded-3xl overflow-hidden  flex flex-col shadow-s2'
    >
      <img
        src={picUrl}
        className='w-full h-[160px] lg:h-[140px] object-cover object-center  hover:translate-y-2 hover:scale-105 transition-all transition-2000'
      />
      <div className='p-5 flex flex-col'>
        <div className='flex items-center gap-x-2'>
          <img src={project.avatarUrl} className='w-5 h-5 rounded-full' />
          <p className='text-sm font-medium truncate max-w-[calc(100%_-_40px)]'>
            {project.projectName}
          </p>
        </div>

        <h2 className='font-bold text-lg line-clamp-2 h-14 mb-3'>{name}</h2>

        <div className='flex items-center gap-x-1 mb-3'>
          <span className='font-zen-dot'>{formatDollar(users.length)}</span>
          {users.length > 1 ? 'Participants' : 'Participant'}
        </div>

        <div className='flex flex-wrap text-xs font-medium space-x-3'>
          {rewardOpt.hasNFT && (
            <div className='py-0.5 rounded-2.5xl relative flex items-center gap-x-2'>
              NFT
            </div>
          )}

          {rewardOpt.hasPoint && (
            <div className='py-0.5 rounded-2.5xl flex items-center gap-x-2'>
              Ponits
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

export default memo(Compaign)
