import { useQuery } from "react-query";
import { getUserCampaign } from "@/api/incentive";
import useUserInfoQuery from "./useUserInfoQuery";

export default function useUserCampaignQuery(projectId) {
  const { userLogined } = useUserInfoQuery();

  return useQuery(
    ["user-campaign", projectId, userLogined],
    () => getUserCampaign(projectId),
    {
      staleTime: 50000,
      enabled: !!projectId,
    }
  );
}
