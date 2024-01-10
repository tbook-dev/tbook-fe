import { getCampaign } from "@/api/incentive";
import { useQuery } from "react-query";

export default function useCampaignList(projectId) {
  return useQuery(["campaignList", projectId], () => getCampaign(projectId), {
    staleTime: 1000,
    enabled: !!projectId,
  });
}
