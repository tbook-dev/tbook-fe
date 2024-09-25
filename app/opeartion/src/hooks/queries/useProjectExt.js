import { useQuery } from "react-query";
import { getProjectExternalConfig } from "@/api/incentive";

export default function useProjectExt(projectId) {
  return useQuery(["project-external", projectId], () => getProjectExternalConfig(projectId), {
    staleTime: 60 * 1000 * 60,
    enabled: !!projectId,
  });
}
