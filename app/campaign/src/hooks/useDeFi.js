import { useQuery } from 'react-query';
import { getDeFi } from '@/api/incentive';

export default function useDeFi() {
  return useQuery(['DeFi-ad'], () => getDeFi(), {
    staleTime: Infinity,
  });
}
