import { useQuery } from "react-query";
import { getUserInfo } from "@/api/incentive";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowPassportGeneratingModal } from "@/store/global";

export default function useUserInfo() {
  const [firstLoad, setFirstLoad] = useState(false);
  const dispatch = useDispatch();
  const showPassportGeneratingModal = useSelector(
    (s) => s.global.showPassportGeneratingModal
  );
  const { data, isLoading, error, isSuccess, ...props } = useQuery(
    "userInfo",
    getUserInfo,
    {
      staleTime: 300000,
      retry: false,
      retryOnMount: false,
      // metamask 设置之后会有并发问题，在pc上为false, 手机上跳转app 为true
      // refetchOnWindowFocus: pc ? false : true,
      // refetchOnWindowFocus: false,
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
  const isZK = Boolean(data?.user?.zk?.binded);
  const isGoogle = data?.userZk.issuer === "Google";
  const googleConnected = isGoogle;
  const newUser = !!data?.newUser;
  if (
    data &&
    !showPassportGeneratingModal &&
    newUser &&
    !sessionStorage.getItem("markNewUser")
  ) {
    sessionStorage.setItem("markNewUser", "1");
    dispatch(setShowPassportGeneratingModal(true));
  }
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
    googleConnected,
    isGoogle,
    newUser,
    ...props,
  };
}
