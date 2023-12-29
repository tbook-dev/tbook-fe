import { useQuery } from "react-query";
import { getProjectId } from "@/api/incentive";

export default function useProjectByName(projectName) {
  return useQuery(["project", projectName], () => getProjectId(projectName), {
    staleTime: Infinity,
    enabled: !!projectName,
  });
}
