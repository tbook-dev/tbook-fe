import { useQuery } from 'react-query';
import { getNormis } from '@/api/incentive';
import useUserInfo from './useUserInfoQuery';

export default function useNormieAirdrop() {
  const { tonConnected } = useUserInfo();
  return useQuery(['normis-airdrop'], () => getNormis(), {
    enabled: tonConnected,
  });
}
