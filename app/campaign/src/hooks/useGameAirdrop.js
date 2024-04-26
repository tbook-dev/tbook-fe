import { useQuery } from 'react-query';
import { getGameAirDrapData } from '@/api/incentive';

export default function useGameAirdrop(phase) {
  return useQuery(['game-airDrop', phase], () => getGameAirDrapData(phase), {
    enabled: !!phase,
  });
}
