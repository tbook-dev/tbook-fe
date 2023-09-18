import { useEffect } from 'react';
import pointIcon from "@/images/icon/point.svg";
import nftIcon from "@/images/icon/nft.svg";
import { credentialStatus, incentiveMethodList } from "@/utils/conf";
import { claimCampaign, getNftClaimInfo } from "@/api/incentive";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { useAccount, useSwitchNetwork, usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi'
import { optimismGoerli, optimism } from 'wagmi/chains'
import abi from "@/abi/st";

//TODO: use chainId from NFT
const chainId = import.meta.env.VITE_CHAIN_ID
const stContract = import.meta.env.VITE_SPACESTATION_CONTRACT

export default function RewardClaim({ group }) {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const { campaignId } = useParams();
  const { address, isConnected, ...others } = useAccount()
  const { switchNetwork, data: currentChain } = useSwitchNetwork()

  useEffect(() => {
    if (currentChain?.id != chainId) {
      switchNetwork(chainId)
    }
  },[currentChain])

  const { config } = usePrepareContractWrite({
    address: stContract,
    abi: abi,
    functionName: 'claim',
    args: [1, address, 1, 1, address, ""],
    enabled: true
  })

  const { data, isLoading, isSuccess,  writeAsync } = useContractWrite(config)

  const waitForTransaction = useWaitForTransaction({
    hash: data?.hash,
    onSuccess(data) {
      console.log("transaction log: ", data)
    }
  })

  const handleClaim = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await claimCampaign(group.id);
    } catch (error) {
      console.log(error);
    }
    await queryClient.refetchQueries(["campaignDetail", campaignId]);
    setLoading(false);
  };

  const handleClaimNFT = async (nft) => {
    if (loading) return;
    setLoading(true);
    try {
      // TODO use real campaignId and nft id
      const info = await getNftClaimInfo(251694151087, 249198571024);
      const r = await writeAsync?.({
        args: [info.cid, info.nftAddress, info.dummyId, info.powah, info.account, info.sign],
        from: address
      })
      console.log(r)
    } catch (error) {
      console.log(error);
    }
    await queryClient.refetchQueries(["campaignDetail", campaignId]);
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      {group.nftList?.map((nft) => {
        const itemStatus = credentialStatus.find(
          (v) => v.value === nft.claimedType
        );
        const incentiveMethodItem =
          incentiveMethodList.find((v) => v.value === nft.methodType) ||
          incentiveMethodList[0];

        return (
          <div key={nft.nftId}>
            <div className="flex items-center gap-x-0.5 mb-2">
              <img src={nftIcon} className="w-4 h-4" />
              <span className="text-c-6 text-sm">nft</span>
            </div>
            <div className="flex mb-2.5">
              <div className="flex flex-col gap-y-1.5 text-c-9 text-sm flex-auto">
                <p>{nft.name}</p>
                <div className="flex items-center gap-x-0.5 lowercase">
                  <img src={incentiveMethodItem?.icon} className="w-3 h-4" />
                  {incentiveMethodItem?.title}
                </div>
              </div>
              <div className="w-[60px] h-[60px] p-1.5 rounded bg-white shadow-s3">
                <img src={nft.coverUrl} className="w-full h-full"/>
              </div>
            </div>
            <button
              className="w-full py-2.5 mb-1 rounded"
              style={{
                color: itemStatus.color,
                backgroundColor: itemStatus.bgColor,
              }}
              onClick={() => handleClaimNFT(nft)}
              //disabled={itemStatus.disabled}
            >
              {itemStatus.label}
            </button>
            <p className="text-xs text-c-9">{itemStatus.desc}</p>
          </div>
        );
      })}

      {group.pointList?.map((point) => {
        const itemStatus = credentialStatus.find(
          (v) => v.value === point.claimedType
        );
        const incentiveMethodItem = incentiveMethodList.find(
          (v) => v.value === point.methodType
        ) || incentiveMethodList[0];
        return (
          <div key={point.pointId}>
            <div className="flex items-center gap-x-0.5 mb-2">
              <img src={pointIcon} className="w-4 h-4" />
              <span className="text-c-6 text-sm">point</span>
            </div>
            <div className="flex flex-col gap-y-1.5 text-c-9 text-sm mb-2.5">
              <p>{point.number} points</p>
              <div className="flex items-center gap-x-0.5 lowercase">
                <img src={incentiveMethodItem?.icon} className="w-3 h-4" />
                {incentiveMethodItem?.title}
              </div>
            </div>
            <button
              className="w-full py-2.5 mb-1"
              style={{
                color: itemStatus.color,
                backgroundColor: itemStatus.bgColor,
              }}
              onClick={() => handleClaim(point)}
              disabled={itemStatus.disabled}
            >
              {itemStatus.label}
            </button>
            <p className="text-xs text-c-9">{itemStatus.desc}</p>
          </div>
        );
      })}
    </div>
  );
}
