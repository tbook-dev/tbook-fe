import { useQuery, useMutation } from 'react-query';
import {
  getCampaignDetail,
  syncTONSociety,
  getTonPrivilege,
} from '@/api/incentive';
import useUserInfo from './useUserInfo';

export default function useCampaign(id) {
  return useQuery(['campaignDetail', id], () => getCampaignDetail(id), {
    enabled: !!id,
    staleTime: Infinity,
  });
}

export function useSyncTONSocietyMutation() {
  return useMutation(syncTONSociety);
}

export function useTonPrivilege(campaignId) {
  const { userLogined } = useUserInfo();
  return useQuery(
    ['campaign', 'privilege', campaignId],
    () => getTonPrivilege(campaignId),
    {
      enabled: Boolean(userLogined && !!campaignId),
      staleTime: Infinity,
    }
  );
}
