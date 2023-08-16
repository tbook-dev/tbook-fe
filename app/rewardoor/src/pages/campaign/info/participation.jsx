import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getCampaignDetail } from '@/api/incentive'

export default function Participation () {
  const { id } = useParams()
  const { data: pageInfo = {}, loading } = useQuery(
    ['campaignDetail', id],
    () => getCampaignDetail(id),
    {
      staleTime: Infinity
    }
  )
}
