import { useQuery } from "react-query";
import { getOwnerInfo } from "@/api/incentive";

export default function useOwnerInfo() {
  const { data, ...props } = useQuery(["ownerInfo"], getOwnerInfo);
  const ownerDc = data?.userDc ?? {};
  const ownerTg = data?.userTg ?? {};
  const ownerTwitter = data?.userTwitter ?? {};
  return {
    data,
    ownerDc,
    ownerTg,
    ownerTwitter,
    ...props,
  };
}
