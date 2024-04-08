import { useQuery } from 'react-query';
import { getWiseScore } from '@/api/incentive';

export default function useWiseScore() {
  return useQuery('wise-score', getWiseScore, { retry: false });
}
