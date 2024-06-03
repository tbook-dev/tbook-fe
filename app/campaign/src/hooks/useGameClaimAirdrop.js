import { useQuery } from 'react-query';
import { claimGameAirdrop } from '@/api/incentive';
import useUserInfo from './useUserInfoQuery';

export default function useclaimGameAirdrop(phase) {
  const { userLogined } = useUserInfo();
  return useQuery(['game-airDrop', phase], () => claimGameAirdrop(phase), {
    enabled: userLogined && !!phase,
    staleTime: 5 * 60 * 1000,
  });
}
