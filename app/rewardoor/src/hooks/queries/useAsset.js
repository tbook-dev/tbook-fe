import { useQuery } from "react-query";
import { getAsset } from "@/api/incentive";
import useUserInfo from "./useUserInfo";

export default function usePonit() {
  const { projectId } = useUserInfo();
  return useQuery(["asset", projectId], () => getAsset(projectId), {
    enabled: !!projectId,
    staleTime: 60 * 1000 * 60,
  });
}
