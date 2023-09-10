import { useQuery } from "react-query";
import { getNft } from "@/api/incentive";

export default function useNft(nftId) {
  return useQuery(["nft", nftId], () => getNft(nftId), {
    staleTime: 60 * 1000 * 60,
    enabled: !!nftId,
  });
}
