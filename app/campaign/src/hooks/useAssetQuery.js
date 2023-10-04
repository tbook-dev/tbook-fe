import { useQuery } from "react-query";
import { getUserAsset } from "@/api/incentive";
import useUserInfo from './useUserInfoQuery'

export default function useAssetQuery() {
  const { projectId } = useUserInfo()
  return useQuery(["asset", projectId], () => getUserAsset(projectId), {
    staleTime: 5000,
    enabled: !!projectId,
  });
}
