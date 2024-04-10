import { useQuery } from 'react-query';
import { getTopBoard } from '@/api/incentive';
import useUserInfoQuery from './useUserInfoQuery';
import { useMemo } from 'react';

export default function useTopBoard() {
  const { user } = useUserInfoQuery();
  const { data, ...rest } = useQuery(['wise-board'], getTopBoard, {
    staleTime: 5000,
  });

  const userScore = useMemo(() => {
    if (!user || !data) return null;
    return data?.find((all) => all.userId === user.userId);
  }, [user, data]);

  return {
    data,
    userScore,
    ...rest,
  };
}
