import { useQuery } from 'react-query';
import { getWiseScore } from '@/api/incentive';
import useUserInfoQuery from './useUserInfoQuery';

export default function useWiseScore() {
  const { user } = useUserInfoQuery();
  const { data, ...p } = useQuery(
    'wise-score',
    () => getWiseScore(user.userId),
    {
      // retry: false,
      enabled: !!user.userId,
      retryOnMount: false,
      refetchOnMount: false,
    }
  );
  return {
    data,
    engagementScore: data?.engagementScore?.score ?? 0,
    socialScore: data?.socialScore?.score ?? 0,
    identityScore: data?.identityScore?.score ?? 0,
    wealthScore: data?.wealthScore?.score ?? 0,
    ...p,
  };
}
