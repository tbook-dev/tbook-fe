import { useQuery } from 'react-query';
import { getCampaignDetail } from '@/api/incentive';
import { useEffect, useState } from 'react';
import useUserInfoQuery from './useUserInfoQuery';
import { merge } from 'lodash';
const notStartList = [2, 0];
const endList = [3, 4, 5];

export default function useCampaignQuery(campaignId) {
  const [firstLoad, setFirstLoad] = useState(false);
  const { userLogined, firstLoad: userLoaded } = useUserInfoQuery();
  const {
    isLoading,
    data,
    isError,
    ...props
  } = useQuery(
    ['campaignDetail', `${campaignId}`, userLogined],
    () => getCampaignDetail(campaignId),
    {
      staleTime: 50000,
      enabled: !!campaignId && userLoaded,
      // refetchOnWindowFocus: false,
    }
  );
  const page = merge({},data?.campaignTotal, { code: data?.code });
  const campaignNotStart = notStartList.includes(page?.campaign?.status);
  const campaignEnd = endList.includes(page?.campaign?.status);
  const campaignOngoing = page?.campaign?.status === 1;
  const campaignDeleted = page?.code === 204;
  const compaignNotExist = page?.code === 404;
  const campaignUnavailable = campaignDeleted || compaignNotExist || isError;

  useEffect(() => {
    if (!firstLoad && !isLoading) {
      setFirstLoad(true);
      return;
    }
  }, [isLoading]);

  return {
    ...props,
    data: page,

    firstLoad,
    isLoading: !userLoaded || isLoading,
    campaignNotStart,
    campaignEnd,
    campaignOngoing,
    campaignUnavailable,
    isError,
  };
}
