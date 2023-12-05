import { useQuery } from "react-query";
import { getCampaignDetail } from "@/api/incentive";
import { useEffect, useState } from "react";

const notStartList = [2, 0];
const endList = [3, 4, 5];

export default function useCampaignQuery(campaignId) {
  const [firstLoad, setFirstLoad] = useState(false);
  const {
    isLoading,
    data: page,
    ...props
  } = useQuery(
    ["campaignDetail", campaignId],
    () => getCampaignDetail(campaignId),
    {
      staleTime: 50000,
      enabled: !!campaignId,
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
    isLoading,
    campaignNotStart,
    campaignEnd,
  };
}
