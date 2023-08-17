import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { useMemo } from 'react'
import { getCampaignDetail } from '@/api/incentive'

export default function Campaign () {
  const { id } = useParams()
  const { data: pageInfo = {} } = useQuery(
    ['campaignDetail', id],
    () => getCampaignDetail(id),
    {
      staleTime: Infinity
    }
  )
  const groups = useMemo(() => {
    return pageInfo?.groups?.filter(v => {
      // 脏数据
      return v.nftList?.length > 0 && v.nftList?.pointList > 0
    }).map(v => {
      return {
        credential: [],
        reward: [],
      }
    })
  }, [pageInfo])
  console.log({groups,pageInfo})
  return (
    <div className='space-y-5'>
      <div className='space-y-3'>
        <h2 className='font-bold text-base text-t-1'>Credential Group & Reward</h2>
      </div>
      <h2 className='font-bold text-base mb-4 text-t-1'>Campaign Description</h2>
      <div className='font-medium text-base'>
        {pageInfo?.campaign?.description}
      </div>
    </div>
  )
}
