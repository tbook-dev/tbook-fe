import { useQuery } from 'react-query';
import { getNormis } from '@/api/incentive';
import useUserInfo from './useUserInfoQuery';

export default function useNormieAirdrop() {
  const { userLogined } = useUserInfo();
  return useQuery(['normis-airdrop'], () => getNormis(), {
    enabled: userLogined,
  });
}
