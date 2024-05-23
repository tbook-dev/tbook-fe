import { useQuery } from 'react-query';
import { getWiseScore } from '@/api/incentive';
import useUserInfoQuery from './useUserInfoQuery';

export default function useWiseScore() {
  const { user } = useUserInfoQuery();
  return useQuery('wise-score', () => getWiseScore(user.userId), {
    retry: false,
    enabled: !!user.userId,
    retryOnMount: false,
  });
}
