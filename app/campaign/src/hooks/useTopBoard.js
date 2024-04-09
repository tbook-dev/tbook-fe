import { useQuery } from 'react-query';
import { getTopBoard } from '@/api/incentive';

export default function useTopBoard({ pageSize = 10, num = 1 }) {
  return useQuery(['wise-board', pageSize, num], getTopBoard);
}
