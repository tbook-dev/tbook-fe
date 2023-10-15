import { useQuery } from "react-query";
import { getReward } from "@/api/incentive";

export default function useReward(campaignId) {
  return useQuery(["reward", campaignId], () => getReward(campaignId), {
    enabled: !!campaignId,
    staleTime: 60 * 1000 * 60,
  });
}