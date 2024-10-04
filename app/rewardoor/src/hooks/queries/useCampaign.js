import { useQuery, useMutation } from 'react-query';
import { getCampaignDetail, syncTONSociety } from '@/api/incentive';

export default function useCampaign(id) {
  return useQuery(['campaignDetail', id], () => getCampaignDetail(id), {
    enabled: !!id,
    staleTime: Infinity,
  });
}

export function useSyncTONSocietyMutation() {
  return useMutation(syncTONSociety);
}
