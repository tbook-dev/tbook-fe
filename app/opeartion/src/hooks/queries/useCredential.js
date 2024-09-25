import { useQuery } from "react-query";
import { getCredentials } from "@/api/incentive";
import useUserInfo from "./useUserInfo";

export default function useCredential() {
  const { projectId } = useUserInfo();
  return useQuery(["credential", projectId], () => getCredentials(projectId), {
    enabled: !!projectId,
    staleTime: 60 * 1000 * 60,
  });
}
