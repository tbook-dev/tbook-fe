import { useQuery } from "react-query";
import { getNft } from "@/api/incentive";

export default function useNft(nftId, groupId) {
  return useQuery(["nft", nftId,groupId], () => getNft(nftId,groupId), {
    staleTime: 60 * 1000 * 60,
    enabled: !!nftId && !!groupId,
  });
}
