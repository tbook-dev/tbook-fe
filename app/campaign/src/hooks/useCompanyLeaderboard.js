

import { useQuery } from 'react-query';
import { getCompanyLeaderboard } from '@/api/incentive';

export default function useCompanyLeaderboard (companyId) {
  return useQuery([ 'company-leaderboard' ], () => getCompanyLeaderboard(companyId));
}
