import { useQuery } from 'react-query';
import { getUserRenaissance } from '@/api/incentive';
import useUserInfoQuery from './useUserInfoQuery';

export default function useUserRenaissance() {
  const { user } = useUserInfoQuery();
  return useQuery('wise-score', () => getUserRenaissance(user.userId), {
    retry: false,
    enabled: !!user.userId,
    retryOnMount: false,
  });
}