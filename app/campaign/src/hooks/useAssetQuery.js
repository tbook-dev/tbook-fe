import { useQuery } from "react-query";
import { getUserAsset } from "@/api/incentive";
import useUserInfoQuery from "./useUserInfoQuery";

export default function useAssetQuery(projectId) {
  const { userLogined } = useUserInfoQuery();
  return useQuery(
    ["asset", projectId, userLogined],
    () => getUserAsset(projectId),
    {
      enabled: !!projectId,
    }
  );
}
