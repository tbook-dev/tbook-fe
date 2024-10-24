import { useQuery } from 'react-query';
import {
  getCampaignDetail,
  getTaskSign,
  logUserReport,
  verifyCredential,
} from '@/api/incentive';
import { useEffect, useState } from 'react';
import useUserInfoQuery from './useUserInfoQuery';
import { merge } from 'lodash';
// import { credential } from '@tbook/credential';

const notStartList = [2, 0];
const endList = [3, 4, 5];

export const getCampaignStatus = (status) => {
  return {
    campaignNotStart: notStartList.includes(status),
    campaignEnd: endList.includes(status),
    campaignOngoing: status === 1,
  };
};

export const getFormatedGroups = (groups) => {
  // 已经完成，全部领取，没有全部领取
  // 没有完成
  const allExpand = groups.length < 6;
  const verifiedList = groups.filter((group) =>
    group.credentialList.every((c) => c.isVerified === 1)
  );
  let claimedList = verifiedList.filter((c) => {
    return [...c.nftList, ...c.pointList, ...c.sbtList].every(
      (c) => c.claimedType > 2
    );
  });
  let unclaimedList = verifiedList.filter((c) => {
    return [...c.nftList, ...c.pointList, ...c.sbtList].some(
      (c) => c.claimedType <= 2
    );
  });
  let notVerifiedList = groups.filter((group) =>
    group.credentialList.some((c) => c.isVerified !== 1)
  );
  if(allExpand){
    return [...unclaimedList, ...notVerifiedList, ...claimedList].map(v => ({...v, expand: true} ))
  }else{
    // 领取了的都收拢, 可以不处理，but better
    claimedList = claimedList.map(v => ({...v, expand: false}));
    if(unclaimedList.length > 0){
      // 没领取优先领取
      unclaimedList = unclaimedList.map((v,idx) => ({...v, expand: idx === 0}))
      return [...unclaimedList, ...notVerifiedList, ...claimedList];
    }
    if(notVerifiedList.length > 0){
      // 没做任务先做任务
      notVerifiedList = notVerifiedList.map((v,idx) => ({...v, expand: idx === 0}))
      return [...unclaimedList, ...notVerifiedList, ...claimedList];
    }
    return [...unclaimedList, ...notVerifiedList, ...claimedList];
  }

  // console.log({allExpand, unclaimedList,notVerifiedList })
  // console.log({ groups, verifiedList, claimedList, notVerifiedList });
  // return  [...unclaimedList, ...notVerifiedList, ...claimedList];
};
export default function useCampaignQuery(campaignId) {
  const [firstLoad, setFirstLoad] = useState(false);
  const {
    userLogined,
    user,
    twitterConnected,
    firstLoad: userLoaded,
  } = useUserInfoQuery();
  const { isLoading, data, isError, ...props } = useQuery(
    ['campaignDetail', `${campaignId}`, userLogined],
    () => getCampaignDetail(campaignId),
    {
      // staleTime: 50000,
      enabled: !!campaignId && userLoaded,
      // refetchOnWindowFocus: false,
    }
  );
  const page = merge({}, data?.campaignTotal, { code: data?.code });
  const campaignNotStart = notStartList.includes(page?.campaign?.status);
  const campaignEnd = endList.includes(page?.campaign?.status);
  const campaignOngoing = page?.campaign?.status === 1;
  const campaignDeleted = page?.code === 204;
  const compaignNotExist = page?.code === 404 || page?.campaign?.status === 5;
  const campaignUnavailable = campaignDeleted || compaignNotExist || isError;
  const hasDefi = page?.groups
    ?.map((v) => v.credentialList)
    .flat()
    .some((v) => 8 === v.groupType);
  const isDefi = page?.groups?.every((v) =>
    v?.credentialList?.some((c) => 8 === c.groupType)
  );
  const groupList = getFormatedGroups(page?.groups ?? []);
  useEffect(() => {
    if (!firstLoad && !isLoading) {
      setFirstLoad(true);
      return;
    }
  }, [isLoading]);

  useEffect(() => {
    if (userLogined && campaignOngoing && user?.userId) {
      const key = `logUserCampaign-${user?.userId}-${campaignId}`;
      if (!localStorage.getItem(key)) {
        logUserReport({
          userId: user?.userId,
          campaignId,
          address: user?.wallet,
          isTwitterLogin: twitterConnected,
        });
        localStorage.setItem(key, '1');
      }
    }
  }, [userLogined, campaignOngoing, user]);
  return {
    ...props,
    data: page,
    hasDefi,
    isDefi,
    firstLoad,
    groupList,
    isLoading: !userLoaded || isLoading,
    campaignNotStart,
    campaignEnd,
    campaignOngoing,
    campaignUnavailable,
    isError,
  };
}

export const useCredentialSign = (c = []) => {
  return useQuery({
    queryKey: ['credential-sign', c.credentialId],
    queryFn: () => getTaskSign(c.credentialId),
    enabled: c.labelType == 10,
  });
};

export const useAutoVerify = (credential, campaignId) => {
  const { campaignOngoing, refetch: refetchCampaign } =
    useCampaignQuery(campaignId);
  const { user, evmConnected, tonConnected } = useUserInfoQuery();
  return useQuery({
    queryKey: ['credential-auto-veirfy', credential.credentialId, user?.userId],
    queryFn: () => verifyCredential(credential.credentialId),
    onSuccess: refetchCampaign,
    enabled:
      (credential.labelType === 24 &&
        credential.isVerified === 0 &&
        campaignOngoing &&
        user &&
        evmConnected) ||
      (credential.labelType === 23 &&
        credential.isVerified === 0 &&
        campaignOngoing &&
        user &&
        tonConnected),
  });
};
