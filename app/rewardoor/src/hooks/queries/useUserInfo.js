import { useQuery } from "react-query";
import { getUserInfo } from "@/api/incentive";

export default function useUserInfo() {
  const { data, isLoading, error, ...props } = useQuery(
    "userInfo",
    getUserInfo,
    {
      staleTime: 1000 * 60 * 10,
    }
  );
  const projects = data?.projects;
  const project = data?.projects?.[data?.projects?.length - 1];
  const projectId = project?.projectId;
  const userDc = data?.userDc;
  const userTg = data?.userTg;
  const userTwitter = data?.userTwitter;
  const user = data?.user;
  return {
    data,
    isLoading,
    error,
    project,
    projectId,
    projects,
    userDc,
    userTg,
    userTwitter,
    user,
    ...props,
  };
}