import { useQuery } from "react-query";
import { getAsset } from "@/api/incentive";

export default function useReward(campaignId) {
  return useQuery(["reward", campaignId], () => getAsset(campaignId), {
    enabled: !!campaignId,
    staleTime: 60 * 1000 * 60,
  });
}