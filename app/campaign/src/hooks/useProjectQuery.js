import { useQuery } from "react-query";
import { getProjectInfo } from "@/api/incentive";

export default function useProjectQuery(projectId) {
  return useQuery(["project", projectId], () => getProjectInfo(projectId), {
    staleTime: 50000,
    enabled: !!projectId,
  });
}
