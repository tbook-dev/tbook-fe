import { useQuery } from 'react-query';
import { checkGameAirDrapData } from '@/api/incentive';
import useUserInfo from './useUserInfoQuery';

export default function useGameCheckAirdrop() {
  const { userLogined } = useUserInfo();
  return useQuery(['game-airDrop'], () => checkGameAirDrapData(), {
    enabled: userLogined,
    staleTime: 5 * 60 * 1000,
  });
}
