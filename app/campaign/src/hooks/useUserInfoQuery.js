import { useQuery } from "react-query";
import { getUserInfo } from "@/api/incentive";
import { useEffect, useState } from "react";

export default function useUserInfo() {
  const [firstLoad, setFirstLoad] = useState(false);
  const { data, isLoading, error, isSuccess, ...props } = useQuery(
    "userInfo",
    getUserInfo,
    {
      staleTime: 1000 * 60 * 10,
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
  useEffect(() => {
    if (!firstLoad && !isLoading) {
      setFirstLoad(true);
      return;
    }
  }, [isLoading]);

  const projects = data?.projects;
  const project = data?.projects?.[data?.projects?.length - 1];
  const projectId = project?.projectId;
  const twitterConnected = !!data?.userTwitter?.connected;
  const discordConnected = !!data?.userDc?.connected;
  const telegramConnected = !!data?.userTg?.connected;
  const wallectConnected = !!data?.user?.wallet;
  const user = data?.user ?? {};
  const userLogined = isSuccess;
  return {
    data,
    isLoading,
    error,
    project,
    projectId,
    projects,
    twitterConnected,
    discordConnected,
    telegramConnected,
    wallectConnected,
    firstLoad,
    userLogined,
    user,
    ...props,
  };
}
