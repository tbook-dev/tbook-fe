import { useQuery, useQueryClient } from 'react-query';
import {
  getCampaignDetail,
  getTaskSign,
  logUserReport,
  verifyCredential,
} from '@/api/incentive';
import { useEffect, useState } from 'react';
import useUserInfoQuery from './useUserInfoQuery';
import { merge } from 'lodash';
import { credential } from '@tbook/credential';

const notStartList = [2, 0];
const endList = [3, 4, 5];

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
  const groupList =
    page?.groups
      ?.map((group) => {
        const firstDefi = group.credentialList.find((v) => v.groupType === 8);
        const defaultCategory =
          group.credentialList[0].category ?? group.credentialList[0].labelType;
        const category = firstDefi
          ? credential.find((c) => c.labelType === firstDefi.labelType)
              ?.category
          : defaultCategory;
        return {
          ...group,
          firstCategory: category,
        };
      })
      .reduce((acc, cur) => {
        const savedKeys = acc.map((c) => c[0] ?? []);
        if (savedKeys.includes(cur.firstCategory)) {
          acc[savedKeys.indexOf(cur.firstCategory)][1].push(cur);
        } else {
          acc.push([cur.firstCategory, [cur]]);
        }
        return acc;
      }, []) ?? [];

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
