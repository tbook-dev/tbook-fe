import { useQuery } from 'react-query';
import { getNFTSupportedChains } from '@/api/incentive';

export default function useSupportedChains({ enabled }) {
  return useQuery(['support-chains'], () => getNFTSupportedChains(), {
    staleTime: Infinity,
    enabled,
  });
}
