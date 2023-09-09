import pointIcon from '@/images/icon/point.svg'
import nftIcon from '@/images/icon/nft.svg'
import { credentialStatus } from '@/utils/conf'

export default function RewardClaim ({ group }) {
  console.log({ group })
  const hasNFT = group.nftList?.length > 0
  const hasPoint = group.pointList?.length > 0

  return (
    <div>
      {group.nftList?.map(nft => {
        const itemStatus = credentialStatus.find(v => v.value === 1)
        return (
          <div>
            <div className='flex items-center gap-x-2.5'>
              <img src={pointIcon} className='w-8 h-8' />
              <span className='font-semibold'>
                {nft.number}
                Points
              </span>
            </div>
            <p className='text-xs'>{itemStatus.desc}</p>
            <button className='block'>{itemStatus}.label</button>
          </div>
        )
      })}
      {group.pointList?.map(point => {
        const itemStatus = credentialStatus.find(v => v.value === 1)

        return (
          <div>
            <div className='flex items-center gap-x-2.5'>
              <img src={pointIcon} className='w-8 h-8' />
              <span className='font-semibold'>
                {point.number}
                Points
              </span>
            </div>
            <p className='text-xs'>{itemStatus.desc}</p>
            <button
              className='w-full py-2.5'
              style={{
                color: itemStatus.color,
                backgroundColor: itemStatus.bgColor
              }}
              disabled={itemStatus.disabled}
            >
              {itemStatus.label}
            </button>
          </div>
        )
      })}
    </div>
  )
}
