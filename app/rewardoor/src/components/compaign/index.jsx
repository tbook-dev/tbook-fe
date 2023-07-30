import { Link } from 'react-router-dom'
import { memo, useMemo } from 'react'

const draftId = 0

function Compaign ({ status, campaignId, picUrl, name, reward, description }) {
  const rewardOpt = useMemo(() => {
    let hasNFT = true
    let hasPoint = true
    try {
      const reward = JSON.parse(reward) || []
      // incentiveAssetsTypeList.NFT =1,2
      hasNFT = reward.some(v => v.incentiveAsset === 1)
      hasPoint = reward.some(v => v.incentiveAsset === 2)
    } catch (e) {
      // console.log(e)
    }
    return { hasNFT, hasPoint }
  }, [reward])
  return (
    <Link
      key={campaignId}
      to={
        draftId === status
          ? `/draft/${campaignId}`
          : `/dashboard/campaign/${campaignId}`
      }
      className='rounded-3xl overflow-hidden h-[300px] bg-gray flex flex-col'
    >
      <img
        src={picUrl}
        className='h-[140px] w-full object-cover  hover:translate-y-2 hover:scale-105 transition-all transition-2000'
      />
      <div className='p-5 text-t-1 flex flex-col justify-between'>
        <div>
          <h2 className='font-black text-xl line-clamp-2'>{name}</h2>
          <p className='font-medium text-xs line-clamp-2 mb-3'>{description}</p>
        </div>

        <div className='flex flex-wrap text-xs font-medium space-x-3'>
          {rewardOpt.hasNFT && (
            <div className='px-4 py-0.5 rounded-md relative  text-t-1 border divide-t-1'>
              🎁 NFT
            </div>
          )}

          {rewardOpt.hasPoint && (
            <div className='px-4 py-0.5 rounded-md relative  text-t-1 border divide-t-1'>
              💎 POINTS
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

export default memo(Compaign)
