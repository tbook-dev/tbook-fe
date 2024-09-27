import { useQuery } from "react-query";
import { getUserAsset, getUserAssetByCompany } from "@/api/incentive";
import useUserInfoQuery from "./useUserInfoQuery";

export default function useAssetQuery(projectId, companyId, isCompany) {
  const { userLogined } = useUserInfoQuery();

  if (isCompany) {
    return useQuery(
      ["asset-company", companyId, userLogined],
      () => getUserAssetByCompany(companyId),
      {
        enabled: !!companyId,
      }
    );
  } else {
    return useQuery(
      [ "asset", projectId, userLogined ],
      () => getUserAsset(projectId),
      {
        enabled: !!projectId,
      }
    );
  }

}
