import { useQuery } from "react-query";
import { getUserCampaign } from "@/api/incentive";

export default function useUserCampaignQuery(projectId) {
  return useQuery(["user-campaign", projectId], () => getUserCampaign(projectId), {
    staleTime: 50000,
    enabled: !!projectId
  });
}
