import { useQuery } from 'react-query';
import { getTopBoard, getWiseScoreTop3 } from '@/api/incentive';
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

export const useWisescoreTop3 = () => {
  return useQuery(['wise-board-top3'], getWiseScoreTop3, {
    staleTime: 5000,
  });
};
