import { useQuery } from "react-query";
import { getUserAsset } from "@/api/incentive";

export default function useAssetQuery(projectId) {
  return useQuery(["asset", projectId], () => getUserAsset(projectId), {
    staleTime: 50000,
    enabled: !!projectId,
  });
}
