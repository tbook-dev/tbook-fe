import { Link, useLoaderData } from 'react-router-dom'
import { memo, useMemo } from 'react'
import { formatDollar } from '@tbook/utils/lib/conf'
import LazyImage from '@/components/lazyImage'
import { Statistic } from 'antd'
const { Countdown } = Statistic

const colorMap = {
  1: {
    color: '#F87171',
    backgroundColor: 'rgba(248, 113, 113, 0.1)'
  },
  2: {
    color: 'rgb(234,179,8)',
    backgroundColor: 'rgba(250,204,21,0.1)'
  }
}
function Compaign ({
  title,
  campaignId,
  picUrl,
  startAt,
  endAt,
  project,
  usersNum,
  groups,
  status
}) {
  const { isUsingSubdomain } = useLoaderData()
  const rewardOpt = useMemo(() => {
    const hasNFT = groups.some(v => v.nftList.length > 0)
    const hasPoint = groups.some(v => v.pointList.length > 0)
    return { hasNFT, hasPoint }
  }, [groups])

  return (
    <Link
      to={`${isUsingSubdomain ? '' : `/${project?.projectUrl}`}/${campaignId}`}
      className='relative rounded-xl overflow-hidden flex flex-col shadow-s2 bg-[#0e0819]'
      target='_blank'
    >
      {[1,2].includes(status) && (
        <div
          className='absolute top-3 right-3 px-2 py-0.5 flex items-center gap-x-1.5 rounded'
          style={colorMap[status]}
        >
          <span
            className='w-2 h-2 rounded-full'
            style={{ background: colorMap[status].color }}
          />
          <Countdown
            value={status === 2 ? startAt :endAt}
            format='D[d] H[h] m[m]'
            valueStyle={{
              fontWeight: 500,
              color: colorMap[status].color,
              fontSize: '14px',
              lineHeight: '20px'
            }}
          />
        </div>
      )}

      <LazyImage
        src={picUrl}
        className='w-full h-[160px] lg:h-[140px] object-cover object-center'
      />
      <div className='p-5 flex-auto flex flex-col justify-between gap-y-3'>
        <h2 className='font-medium text-base'>{title}</h2>

        <div className='space-y-3'>
          <div className='flex items-center gap-x-1 text-[#C0ABD9]'>
            <span className='font-zen-dot'>{formatDollar(usersNum)}</span>
            {usersNum > 1 ? 'Participants' : 'Participant'}
          </div>

          <div className='flex flex-wrap text-xs font-medium space-x-3'>
            {rewardOpt.hasNFT && (
              <div className='px-1.5 py-0.5 rounded-2.5xl bg-[#904BF6]'>
                NFT
              </div>
            )}

            {rewardOpt.hasPoint && (
              <div className='px-1.5 py-0.5 rounded-2.5xl bg-[#904BF6]'>
                Points
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default memo(Compaign)
