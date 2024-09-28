import { getCompanyOnboardCampaignInfo } from '@/api/incentive';
import useUserInfoQuery from './useUserInfoQuery';
import { useQuery } from 'react-query';

export const useCompanyOnboardQuery = (companyId) => {
  const { userLogined } = useUserInfoQuery();
  return useQuery(
    ['company-onboard', companyId, userLogined],
    () => getCompanyOnboardCampaignInfo(companyId),
    {
      enabled: !!companyId,
    }
  );
};
