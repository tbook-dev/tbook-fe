import React from "react";
import { conf } from "@tbook/utils";
import Network from "../Icon/NetWork";
import { useNetwork } from "wagmi";

const { chains } = conf;

export default function ({ networkId }) {
  const { chain } = useNetwork();
  const currentId = networkId || chain?.id || parseInt(localStorage.getItem("chainId")) || 1;
  const userChain = chains.find((v) => v.evmChainId === currentId);

  return (
    <span className="flex items-center h-8 px-3 rounded-lg">
      <Network id={userChain?.evmChainId} />
      <span className="ml-2 text-white">{userChain.name}</span>
    </span>
  );
}
