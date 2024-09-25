import { useQuery } from "react-query";
import { getNFTSupportedChains } from "@/api/incentive";

export default function useSupportChains() {
  return useQuery("supportedChains", getNFTSupportedChains, {
      staleTime: 1000 * 60 * 10,
      retry:  false
    }
  );
}
