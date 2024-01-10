import { Link, useLoaderData } from 'react-router-dom'
import { memo, useMemo } from 'react'
import { formatDollar } from '@tbook/utils/lib/conf'
import LazyImage from '@/components/lazyImage'

function Compaign ({ title, campaignId, picUrl, project, users, groups }) {
  const { isUsingSubdomain } = useLoaderData()
  const rewardOpt = useMemo(() => {
    const hasNFT = groups.some(v => v.nftList.length > 0)
    const hasPoint = groups.some(v => v.pointList.length > 0)
    return { hasNFT, hasPoint }
  }, [groups])

  return (
    <Link
      to={`${isUsingSubdomain ? '' : `/${project?.projectName}`}/${campaignId}`}
      className='rounded-xl overflow-hidden  flex flex-col shadow-s2 bg-[#0e0819]'
    >
      <LazyImage
        src={picUrl}
        className='w-full h-[160px] lg:h-[140px] object-cover object-center  hover:scale-105 transition-all transition-2000'
      />
      <div className='p-5 flex flex-col gap-y-3'>
        <h2 className='font-medium text-base'>{title}</h2>

        <div className='space-y-3'>
          <div className='flex items-center gap-x-1 text-[#C0ABD9]'>
            <span className='font-zen-dot'>{formatDollar(users.length)}</span>
            {users.length > 1 ? 'Participants' : 'Participant'}
          </div>

          <div className='flex flex-wrap text-xs font-medium space-x-3'>
            {rewardOpt.hasNFT && (
              <div className='px-1.5 py-0.5 rounded-2.5xl bg-[#904BF6]'>
                NFT
              </div>
            )}

            {rewardOpt.hasPoint && (
              <div className='px-1.5 py-0.5 rounded-2.5xl bg-[#904BF6]'>
                Ponits
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default memo(Compaign)
