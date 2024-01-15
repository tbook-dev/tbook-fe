import { useQuery } from "react-query";
import { getUserInfo } from "@/api/incentive";
import { useEffect, useState } from "react";

export default function useUserInfo() {
  const [firstLoad, setFirstLoad] = useState(false);
  const { data, isLoading, error, isSuccess, ...props } = useQuery(
    "userInfo",
    getUserInfo,
    {
      staleTime: 5000,
      retry: false,
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
  const isZK = Boolean(data?.user?.zk?.binded)

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
    address: data?.user?.wallet || data?.user?.zk?.address,
    isZK,
    ...props,
  };
}
