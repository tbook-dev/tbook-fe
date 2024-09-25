import { getCampaign } from '@/api/incentive';
import { useQuery } from 'react-query';
import useUserInfo from './useUserInfo';

export default function useCampaignList() {
  const { projectId } = useUserInfo();
  return useQuery(['campaignList', projectId], () => getCampaign(projectId), {
    enabled: !!projectId,
  });
}
