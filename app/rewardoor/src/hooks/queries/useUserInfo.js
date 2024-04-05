import { useQuery } from 'react-query';
import { getUserInfo } from '@/api/incentive';
import { useMemo } from 'react';

export default function useUserInfo() {
  const { data, isLoading, isSuccess, error, ...props } = useQuery(
    'userInfo',
    getUserInfo,
    {
      // staleTime: 1000 * 60 * 10,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );
  const projects = data?.projects;
  const project = data?.projects?.[data?.projects?.length - 1];
  const projectId = project?.projectId;
  const userDc = data?.userDc;
  const userTg = data?.userTg;
  const userTwitter = data?.userTwitter;
  const user = data?.user;
  const userLogined = isSuccess;
  const address = user?.wallet;
  const evmConnected = !!data?.user?.wallet;
  const tonConnected = !!data?.userTon?.binded;
  const evmAddress = data?.user?.wallet;
  const tonAddress = data?.userTon?.address;
  const currentAddress = useMemo(() => {
    return [
      {
        type: 'evm',
        connected: evmConnected,
        address: evmAddress,
      },
      {
        type: 'ton',
        connected: tonConnected,
        address: tonAddress,
      },
    ]
      .filter((v) => v.connected)
      .pop();
  }, [data]);
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
    userLogined,
    isSuccess,
    address,
    evmConnected,
    tonConnected,
    evmAddress,
    tonAddress,
    currentAddress,
    ...props,
  };
}
