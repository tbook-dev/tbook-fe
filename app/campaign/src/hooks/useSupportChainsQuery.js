import { useQuery } from "react-query";
import { getNFTSupportedChains } from "@/api/incentive";

export default function useSupportChainsQuery() {
  return useQuery(["getNFTSupportedChains"], getNFTSupportedChains, {
    staleTime: 50000,
  });
}
