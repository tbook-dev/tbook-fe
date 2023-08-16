import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
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
