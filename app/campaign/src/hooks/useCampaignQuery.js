import { useQuery } from "react-query";
import { getCampaignDetail } from "@/api/incentive";
import { useEffect, useState } from "react";

export default function useUserInfo(campaignId) {
  const [firstLoad, setFirstLoad] = useState(false);
  const { isLoading, ...props } = useQuery(
    ["campaignDetail", campaignId],
    () => getCampaignDetail(campaignId),
    {
      cacheTime: 0,
      enabled: !!campaignId,
      retry: false
    }
  );
  useEffect(() => {
    if (!firstLoad && !isLoading) {
      setFirstLoad(true);
      return;
    }
  }, [isLoading]);

  return {
    ...props,
    firstLoad,
  };
}
