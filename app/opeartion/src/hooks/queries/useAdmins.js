import { useQuery } from "react-query";
import { getAdmins } from "@/api/incentive";
import useUserInfo from "./useUserInfo";

export default function useAdmins() {
  const { projectId } = useUserInfo();
  return useQuery(["asset", projectId], () => getAdmins(projectId), {
    enabled: !!projectId,
    staleTime: 60 * 1000 ,
  });
}
