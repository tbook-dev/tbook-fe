import { useQuery } from 'react-query';
import { getCampaignDetail, getTaskSign, logUserReport } from '@/api/incentive';
import { useEffect, useState } from 'react';
import useUserInfoQuery from './useUserInfoQuery';
import { merge } from 'lodash';

const notStartList = [2, 0];
const endList = [3, 4, 5];
const defiLabelTypes = [10, 11];
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
  const compaignNotExist = page?.code === 404;
  const campaignUnavailable = campaignDeleted || compaignNotExist || isError;
  const hasDefi = page?.groups
    ?.map((v) => v.credentialList)
    .flat()
    .some((v) => defiLabelTypes.includes(v.labelType));
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
    firstLoad,
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
