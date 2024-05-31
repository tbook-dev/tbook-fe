import { useQuery } from 'react-query';
import { getGameAirDrapData } from '@/api/incentive';
import useUserInfo from './useUserInfoQuery';

export default function useGameAirdrop(phase) {
  const { userLogined } = useUserInfo();
  return useQuery(['game-airDrop', phase], () => getGameAirDrapData(phase), {
    enabled: userLogined && !!phase,
    staleTime: 5*60*1000
  });
}
