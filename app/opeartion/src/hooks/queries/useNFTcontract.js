import { useQuery } from 'react-query';
import { getNFTcontracts } from '@/api/incentive';
import useUserInfo from './useUserInfo';

export default function useNFTcontract() {
  const { projectId } = useUserInfo();
  return useQuery(
    ['NFTcontracts', projectId],
    () => getNFTcontracts(projectId),
    {
      enabled: !!projectId,
      staleTime: 60 * 1000 * 60,
    }
  );
}
