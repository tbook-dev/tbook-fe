import { useQuery } from "react-query";
import { getNft } from "@/api/incentive";

export default function useNftQuery(groupId, nftId) {
  return useQuery(["nft", groupId, nftId], () => getNft(groupId, nftId), {
    staleTime: 50000,
  });
}
