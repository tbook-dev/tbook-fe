import { useQuery } from "react-query";
import { getAirdropAddress } from "@/api/incentive";

export default function useAirdrop({ userId, credentialId, enabled }) {
  return useQuery(
    ["airDrop", userId, credentialId],
    () => getAirdropAddress({ userId, credentialId }),
    {
      enabled,
    }
  );
}
