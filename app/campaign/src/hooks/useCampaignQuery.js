import { useQuery } from "react-query";
import { getCampaignDetail } from "@/api/incentive";
import { useEffect, useState } from "react";

const notStartList = [2, 0];
const endList = [3, 4, 5];

export default function useUserInfo(campaignId) {
  const [firstLoad, setFirstLoad] = useState(false);
  const { isLoading, data: page, ...props } = useQuery(
    ["campaignDetail", campaignId],
    () => getCampaignDetail(campaignId),
    {
      cacheTime: 0,
      enabled: !!campaignId,
      retry: false
    }
  );
  const campaignNotStart = notStartList.includes(page?.campaign?.status);
  const campaignEnd = endList.includes(page?.campaign?.status);
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
    campaignNotStart,
    campaignEnd
  };
}
