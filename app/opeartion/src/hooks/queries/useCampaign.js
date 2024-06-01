import { useQuery } from 'react-query';
import { getCampaignDetail } from '@/api/incentive';

export default function useCampaign(id) {
  return useQuery(['campaignDetail', id], () => getCampaignDetail(id), {
    enabled: !!id,
    staleTime: Infinity,
  });
}
