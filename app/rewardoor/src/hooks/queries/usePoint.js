import { useQuery } from "react-query";
import { getPoint } from "@/api/incentive";
import useUserInfo from "./useUserInfo";

export default function usePonit() {
  const { projectId } = useUserInfo();
  return useQuery(["point", projectId], () => getPoint(projectId), {
    enabled: !!projectId,
    staleTime: 60 * 1000 * 60,
  });
}
