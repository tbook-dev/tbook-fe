import { Modal, Popover, message } from "antd";
import pointIcon from "@/images/icon/point-modal.svg";
import multiplyIcon from "@/images/icon/multiply.svg";
import noticeSvg from "@/images/icon/notice.svg";
import { credentialStatus, incentiveMethodList } from "@/utils/conf";
import TimeDown from "./timeDown";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useResponsive } from "ahooks";
import {
  claimCampaign,
  getNftClaimInfo,
  updateClaimed,
  getNFTSupportedChains,
} from "@/api/incentive";
import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { useAccount, useSwitchNetwork } from "wagmi";
import {
  getNetwork,
  prepareWriteContract,
  writeContract,
  waitForTransaction,
} from "@wagmi/core";
import abi from "@/abi/st";
import WithClaim from "./withClaim";
import useUserInfoQuery from "@/hooks/useUserInfoQuery";
import { useDispatch } from "react-redux";
import { setConnectWalletModal } from "@/store/global";
import { formatImpact } from "@tbook/utils/lib/conf";
import clsx from "clsx";

const moduleConf = {
  typeTitleEnum: {
    nft: "NFT",
    point: "points",
  },
};
export default function ViewReward({ data, open, onCancel }) {
  const { pc } = useResponsive();

  const [loading, updateLoading] = useState(false);
  const itemStatus = credentialStatus.find((v) => v.value === data.claimedType);
  const incentiveMethodItem = incentiveMethodList.find(
    (v) => v.value === data.methodType
  );
  const dispath = useDispatch();
  const queryClient = useQueryClient();
  const { campaignId } = useParams();
  const { address, isConnected, ...others } = useAccount();
  const { switchNetworkAsync, data: currentChain } = useSwitchNetwork();
  const [supportChains, setSupportChains] = useState([]);
  const { wallectConnected } = useUserInfoQuery();
  useEffect(() => {
    const getData = async () => {
      const contractChains = await getNFTSupportedChains();
      setSupportChains(contractChains);
    };
    getData();
  }, []);

  const handleClaim = async (data) => {
    updateLoading(true);
    try {
      console.log("handleClaimPoint");
      await claimCampaign(data.groupId);
    } catch (error) {
      console.log(error);
    }
    await queryClient.refetchQueries(["campaignDetail", campaignId, true]);
    updateLoading(false);
  };
  const canUseWallect = useMemo(() => {
    return isConnected && wallectConnected;
  }, [isConnected, wallectConnected]);

  const connectWallect = useCallback(() => {
    dispath(setConnectWalletModal(true));
  }, []);

  const handleClaimNFT = async (nft) => {
    try {
      updateLoading(true);
      const info = await getNftClaimInfo(nft.nftId, nft.groupId);

      if (getNetwork().chain?.id != nft.chainId) {
        await switchNetworkAsync(nft.chainId);
      }
      if (nft.chainId != getNetwork().chain?.id) {
        message.error("wrong network, please switch in your wallet");
        return;
      }
      const currentInfo = supportChains.find((c) => c.chainId == nft.chainId);

      const config = await prepareWriteContract({
        address: currentInfo.stationContractAddress,
        abi: abi,
        functionName: "claim",
        args: [
          info.cid,
          info.nftAddress,
          info.dummyId,
          info.powah,
          info.account,
          info.sign,
        ],
      });
      const r = await writeContract(config);

      const data = await waitForTransaction({ hash: r.hash });
      console.log("transaction log: ", data);
      await updateClaimed(
        nft.nftId,
        nft.groupId,
        data.transactionHash,
        info.dummyId
      );
      await queryClient.refetchQueries(["campaignDetail", campaignId]);
      updateLoading(false);
    } catch (error) {
      if (
        error.shortMessage &&
        error.shortMessage.indexOf("Already minted") >= 0
      ) {
        message.error("Claim failed: Already minted");
      } else {
        message.error("Claim failed");
      }
      console.log(error);
      updateLoading(false);
    }
    // await queryClient.refetchQueries(['campaignDetail', campaignId])
  };
  const ponitVal = `${formatImpact(data.number)}`;
  const ponitValLen = ponitVal.length;
  // console.log({ponitValLen})
  return (
    <Modal
      open={open && data}
      onCancel={onCancel}
      title={null}
      footer={null}
      closeIcon={pc}
      centered
    >
      <div className="flex flex-col items-center">
        <h2 className="text-base font-medium mb-0.5 text-[#C0ABD9]">
          {moduleConf.typeTitleEnum[data.type]}
        </h2>
        {data.type === "nft" ? (
          <div className="space-y-4 text-center mb-5">
            <h1 className="text-lg font-medium">{data.name}</h1>
            <img
              src={data.picUrl}
              className="w-40 h-40 mx-auto rounded-lg object-center object-contain"
            />
          </div>
        ) : (
          <div className="pt-4 flex items-center justify-center gap-x-4 w-full">
            <span
              className={clsx("lg:text-[60px] font-bold font-zen-dot", {
                "text-[34px]": ponitValLen >= 4,
                "text-[44px]": ponitValLen <= 3,
              })}
            >
              {ponitVal}
            </span>
            <img src={multiplyIcon} className="w-8 h-8" alt="multiply icon" />
            <img
              src={pointIcon}
              className="w-[120px] h-[120px] object-center object-contain"
              alt="point icon"
            />
          </div>
        )}
      </div>
      <div className="-mx-6 h-px bg-[#8148C6]" />

      <div className="pt-5 flex flex-col items-center text-center">
        {itemStatus.showTips && (
          <div className="flex items-center justify-center gap-x-1 text-sm lowercase mb-2">
            <img
              src={incentiveMethodItem?.icon}
              className="w-3 h-4"
              alt="nft"
            />
            {incentiveMethodItem?.title}
            <Popover
              content={
                <div className="max-w-[calc(100vw_-_60px)] lg:max-w-[400px]">
                  {incentiveMethodItem?.pop}
                </div>
              }
              trigger="click"
              placement="top"
            >
              <img
                src={noticeSvg}
                className="w-3 h-3 cursor-pointer"
                alt="notice"
              />
            </Popover>
          </div>
        )}
        {itemStatus.showTimeClock && (
          <TimeDown showTimeClock={itemStatus.showTimeClock} />
        )}
        <WithClaim
          handleFn={async () => {
            if (data.type === "nft") {
              if (canUseWallect) {
                await handleClaimNFT(data);
              } else {
                connectWallect();
              }
            } else {
              await handleClaim(data);
            }
          }}
          type={data.type}
          item={itemStatus}
          loading={loading}
        />
      </div>
    </Modal>
  );
}
