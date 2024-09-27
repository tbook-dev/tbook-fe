import { useQuery } from "react-query";
import { getUserAssetByCompany } from "@/api/incentive";
import useUserInfoQuery from "./useUserInfoQuery";

export default function useAssetCompanyQuery(companyId) {
  const { userLogined } = useUserInfoQuery();
  return useQuery(
    [ 'asset-company', companyId, userLogined],
    () => getUserAssetByCompany(companyId),
    {
      enabled: !!companyId,
    }
  );
}
