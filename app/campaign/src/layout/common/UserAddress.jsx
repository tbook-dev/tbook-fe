import { useWeb3Modal } from "@web3modal/wagmi/react";
import { shortAddress } from "@tbook/utils/lib/conf";
import { useAccount } from "wagmi";

export default function UserAddress() {
  const { open } = useWeb3Modal();
  const { address } = useAccount();

  return (
    <button onClick={async () => await open()} className="text-c-6">
      {shortAddress(address)}
    </button>
  );
}
