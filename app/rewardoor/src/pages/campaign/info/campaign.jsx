import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
export default function Campaign () {
  const { id } = useParams()
  const { data: pageInfo = {}, loading } = useQuery(
    ['campaignDetail', id],
    () => getCampaignDetail(id),
    {
      staleTime: Infinity
    }
  )

  return (
    <div className='space-y-5'>
      <div className='space-y-3'>
        <h2 className='font-bold text-base '>Credential Group & Reward</h2>
      </div>
      <h2 className='font-bold text-base mb-4'>Campaign Description</h2>
      <div className='font-medium text-base'>
        {pageInfo?.campaign?.description}
      </div>
    </div>
  )
}
