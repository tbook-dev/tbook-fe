import { useQuery } from 'react-query';
import { getUserInfo } from '@/api/incentive';
import { useEffect, useState, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setShowPassportGeneratingModal } from '@/store/global';
import { useTelegram } from './useTg';
import {
  TMAAddressList,
  webAddressList,
  TMAsocialList,
  webSocialList,
} from '@/utils/logType';
import { useLocation } from 'react-router-dom';

const whiteList = ['/event/renaissance'];
const whitePrefixList = ['/wise-score'];
export default function useUserInfo() {
  const [firstLoad, setFirstLoad] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const { isTMA } = useTelegram();
  const showPassportGeneratingModal = useSelector(
    (s) => s.global.showPassportGeneratingModal
  );
  const { data, isLoading, error, isSuccess, ...props } = useQuery(
    'userInfo',
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
  const tonConnected = !!data?.userTon?.binded;
  const user = data?.user ?? {};
  const userLogined = isSuccess;
  const isZK = Boolean(data?.user?.zk?.binded);
  const isGoogle = data?.userZk.issuer === 'Google';
  const googleConnected = isGoogle;
  const newUser = !!data?.newUser;
  const zkAddress = data?.userZk?.address;
  const evmAddress = data?.user?.wallet;
  const tonAddress = data?.userTon?.address;

  // const address = data?.user?.zk?.address || data?.user?.wallet;
  const currentAddress = useMemo(() => {
    // 在ton之中，优先展示TON地址>SUI地址>EVM地址
    const addressList = isTMA
      ? TMAAddressList({ tonAddress, zkAddress, evmAddress })
      : webAddressList({ tonAddress, zkAddress, evmAddress });
    return addressList
      .filter((v) => Boolean(v.address))
      .sort((a, b) => (a.weight - b.weight > 0 ? 1 : -1))
      .pop();
  }, [isTMA, tonAddress, zkAddress, evmAddress]);

  const address = currentAddress?.address;
  const isUsingWallet = useMemo(() => {
    return Boolean(currentAddress);
  }, [currentAddress]);
  const currentSocial = useMemo(() => {
    const twitterName = data?.userTwitter?.twitterName;
    const tgName = data?.userTg?.connected
      ? data?.userTg?.username ||
        `${data?.userTg?.firstName}_${data?.userTg?.lastName}`
      : '';
    const socialList = isTMA
      ? TMAsocialList({ twitterName, tgName })
      : webSocialList({
          twitterName,
          tgName,
        });
    return socialList
      .filter((v) => Boolean(v.name))
      .sort((a, b) => (a.weight - b.weight > 0 ? 1 : -1))
      .pop();
  }, [data, isTMA]);
  const isMultAccount =
    [
      // user, evm
      !!data?.user?.evm?.evmWallet,
      !!data?.userTon?.binded,
      isZK,
      // tw
      !!data?.userTwitter?.connected,
      !!data?.userDc?.connected,
      !!data?.userTg?.connected,
    ].filter(Boolean).length > 1;

  const sessionKey = `markNewUser-${user?.userId ?? ''}`;

  useEffect(() => {
    if (
      data &&
      !showPassportGeneratingModal &&
      newUser &&
      !sessionStorage.getItem(sessionKey) &&
      !whiteList.includes(location.pathname) &&
      !whitePrefixList.some((whitePrefix) =>
        location.pathname.startsWith(whitePrefix)
      )
    ) {
      sessionStorage.setItem(sessionKey, '1');
      dispatch(setShowPassportGeneratingModal(true));
    }
  }, [
    data,
    location,
    showPassportGeneratingModal,
    newUser,
    sessionStorage,
    dispatch,
  ]);

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
    evmConnected: wallectConnected,
    tonConnected,
    firstLoad,
    userLogined,
    user,
    address,
    isZK,
    googleConnected,
    isGoogle,
    newUser,
    zkAddress,
    evmAddress,
    tonAddress,
    currentAddress,
    currentSocial,
    isUsingWallet,
    isMultAccount,
    ...props,
  };
}
