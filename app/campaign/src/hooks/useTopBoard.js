import { useQuery } from 'react-query';
import { getTopBoard } from '@/api/incentive';

export default function useTopBoard() {
  return useQuery(['wise-board'], getTopBoard);
}
