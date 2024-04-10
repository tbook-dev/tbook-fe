import { useQuery } from 'react-query';
import { getTopBoard } from '@/api/incentive';
import useWiseScore from './useWiseScore';

export default function useTopBoard() {
  const { data, ...rest } = useQuery(['wise-board'], getTopBoard, {
    staleTime: 5000,
  });
  const { data: userScore } = useWiseScore();

  return {
    data: Array.isArray(data)
      ? data.map((v, idx) => ({ ...v, rank: idx + 1 }))
      : null,
    userScore,
    ...rest,
  };
}
