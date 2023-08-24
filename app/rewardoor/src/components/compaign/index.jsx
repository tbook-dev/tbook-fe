import { Link } from 'react-router-dom'
import { memo, useMemo } from 'react'
import { incentiveAssetsTypeList } from '@/utils/conf'

const draftId = 0

function Compaign ({ campaign = {}, groups }) {
  const { status, campaignId, picUrl, name } = campaign
  const rewardOpt = useMemo(() => {
    const hasNFT = groups.some(v => v.nftList.length > 0)
    const hasPoint = groups.some(v => v.pointList.length > 0)
    return { hasNFT, hasPoint }
  }, [groups])

  return (
    <Link
      key={campaignId}
      to={
        draftId === status
          ? `/campaign/${campaignId}/edit`
          : `/campaign/${campaignId}/detail`
      }
      className='rounded-3xl overflow-hidden bg-gray flex flex-col'
    >
      <img
        src={picUrl}
        className='w-full object-cover  hover:translate-y-2 hover:scale-105 transition-all transition-2000'
      />
      <div className='p-5 text-t-1 flex flex-col justify-between'>
        <div className='mb-3'>
          <h2 className='font-black text-xl line-clamp-2 h-14'>{name}</h2>
          {/* <p className='font-medium text-xs line-clamp-2 mb-3 h-8'>
            {description}
          </p> */}
        </div>

        <div className='flex flex-wrap text-xs font-medium space-x-3'>
          {rewardOpt.hasNFT && (
            <div className='px-4 py-0.5 rounded-2.5xl relative flex items-center gap-x-2  text-t-1 border divide-t-1'>
              <img
                src={incentiveAssetsTypeList.find(v => v.value === 1)?.icon}
                className='w-4 h-4'
              />
              NFT
            </div>
          )}

          {rewardOpt.hasPoint && (
            <div className='px-4 py-0.5 rounded-2.5xl flex items-center gap-x-2  text-t-1 border divide-t-1'>
              <img
                src={incentiveAssetsTypeList.find(v => v.value === 2)?.icon}
                className='w-4 h-4'
              />
              POINTS
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

export default memo(Compaign)
