import { getCampaignDetail } from "@/api/incentive";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { incentiveMethodList, rewardMap } from "@/utils/conf";
import pointIcon from "@/images/icon/point.svg";
import nftIcon from "@/images/icon/nft.svg";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { conf as tbookConf } from "@tbook/utils";
import clsx from "clsx";
import { useState, useCallback } from "react";
import WhiteListModal from "./whiteListModal";
import mockAvatorIcon from "@/images/icon/mockAvator.svg";
import useReward from "@/hooks/queries/useReward";

const { formatDollar } = tbookConf;
export default function Reward() {
  const { id } = useParams();
  const { data: reward } = useReward(id);
  const [whiteListData, setWhiteListData] = useState(null);
  const [open, setOpen] = useState(false);
  const { data: pageInfo = {} } = useQuery(
    ["campaignDetail", id],
    () => getCampaignDetail(id),
    {
      staleTime: Infinity,
    }
  );
  console.log({ reward });
  const closeModal = useCallback(() => {
    setOpen(false);
    setWhiteListData(null);
  }, []);
  const setModalData = useCallback((data) => {
    setWhiteListData(data);
    setOpen(true);
  }, []);

  return (
    <div className="w-[520px] space-y-4 mb-20">
      {reward?.nfts?.map((v, idx) => {
        const nft = v.nft;
        const isDone = idx % 2 === 0;
        const itemStatus = isDone ? rewardMap.done : rewardMap.ongoing;
        const incentiveMethodItem =
          incentiveMethodList.find((v) => v.value === nft.methodType) ||
          incentiveMethodList[0];
        const whiteList = [
          {
            address: "0xe15135ed7fc000788fdbcef9b3efc1d7e194f763",
          },
        ];
        const hasToUpdateWhiteList = whiteList.length > 0;
        const winners = v.winnerList;
        const claimNum = winners.length;
        return (
          <div key={v.nft.nftId} className="bg-[#161616] rounded-xl">
            <div className="flex items-center gap-x-1 mb-2 px-5 py-4 border-b border-[#1f1f1f]">
              <img src={nftIcon} className="w-6 h-6" />
              <span className="text-white text-lg font-medium">nft</span>
            </div>
            <div className="px-5 py-6">
              <div className="space-y-6 pb-6 border-b border-[#1f1f1f]">
                <h2>{nft.name}</h2>
                <div className="w-16 h-16 bg-[#272727] p-2 rounded-lg border border-[rgb(50,50,50)] shadow-[0px_0px_12px_0px_rgba(0,0,0,0.08)]">
                  <img
                    src={nft.picUrl}
                    className="w-full h-full object-contain object-center"
                  />
                </div>
                <div className="flex items-center gap-x-1 lowercase text-base">
                  <img
                    src={incentiveMethodItem?.icon}
                    className="w-6 h-6 object-contain object-center"
                  />
                  {incentiveMethodItem?.title}
                  <Tooltip title={incentiveMethodItem.desc}>
                    <span className="text-c-6 hover:text-white ml-1 cursor-pointer">
                      <InfoCircleOutlined />
                    </span>
                  </Tooltip>
                </div>
                <button
                  className="py-1 px-2 text-xs rounded-xl bg-[rgb(28,33,27)] block"
                  style={{
                    color: itemStatus.color,
                  }}
                >
                  {itemStatus.btn}
                </button>

                {hasToUpdateWhiteList && (
                  <div>
                    <button
                      className="text-white text-sm font-medium py-1.5 px-3 bg-[#3A82F7] hover:opacity-80 block rounded-md mb-3"
                      onClick={() => {
                        setModalData(winners);
                      }}
                    >
                      Update the whitelist
                    </button>
                    <p className="text-xs text-t-3">{itemStatus.text}</p>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div className="text-t-1 text-sm font-medium">
                  {formatDollar(winners.length)} winners
                </div>
                <div className="flex -space-x-3">
                  {winners.map((v, idx) => {
                      return (
                        <div
                          key={idx}
                          className="w-6 h-6 overflow-hidden rounded-full border-0.5 border-[#161616]"
                        >
                          <img
                            src={v?.user?.avatar}
                            className="w-full h-full object-contain object-center"
                          />
                        </div>
                      );
                    })}
                </div>
                <div
                  className={clsx(
                    whiteList.length === 0 ? "text-white" : "text-c-3",
                    "text-sm"
                  )}
                >
                  {formatDollar(claimNum)} nft claimed by participants
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {reward?.points?.map((v, idx) => {
        const point = v.point;
        const isDone = idx % 2 === 0;
        const itemStatus = isDone ? rewardMap.done : rewardMap.ongoing;
        const incentiveMethodItem =
          incentiveMethodList.find((v) => v.value === point.methodType) ||
          incentiveMethodList[0];
        const whiteList = [
          {
            address: "0xe15135ed7fc000788fdbcef9b3efc1d7e194f763",
          },
        ];
        const winners = [
          {
            address: "0xe15135ed7fc000788fdbcef9b3efc1d7e194f763",
          },
          {
            address: "0xe15135ed7fc000788fdbcef9b3efc1d7e194f763",
          },
        ];
        const claimNum = 10000;
        return (
          <div key={point.pointId} className="bg-[#161616] rounded-xl">
            <div className="flex items-center gap-x-1 mb-2 px-5 py-4 border-b border-[#1f1f1f]">
              <img src={pointIcon} className="w-6 h-6" />
              <span className="text-white text-lg font-medium">points</span>
            </div>
            <div className="px-5 py-6">
              <div className="space-y-6 pb-6 border-b border-[#1f1f1f]">
                <div className="flex items-center gap-x-1 lowercase text-base">
                  <img
                    src={incentiveMethodItem?.icon}
                    className="w-6 h-6 object-contain object-center"
                  />
                  {incentiveMethodItem?.title}
                  <Tooltip title={incentiveMethodItem.desc}>
                    <span className="text-c-6 hover:text-white ml-1 cursor-pointer">
                      <InfoCircleOutlined />
                    </span>
                  </Tooltip>
                </div>
                <button
                  className="py-1 px-2 text-xs rounded-xl bg-[rgb(28,33,27)] block"
                  style={{
                    color: itemStatus.color,
                  }}
                >
                  {itemStatus.btn}
                </button>
              </div>

              <div className="space-y-3">
                <div className="text-t-1 text-sm font-medium">
                  {formatDollar(winners.length)} winners
                </div>
                <div className="flex -space-x-3">
                  {new Array(30)
                    .fill(0)
                    .slice(0, 6)
                    .map((_, idx) => {
                      return (
                        <div
                          key={idx}
                          className="w-6 h-6 rounded-full overflow-hidden border-0.5 border-[#161616]"
                        >
                          <img
                            src={mockAvatorIcon}
                            className="w-full h-full object-contain object-center"
                          />
                        </div>
                      );
                    })}
                </div>
                <div
                  className={clsx(
                    whiteList.length === 0 ? "text-white" : "text-c-3",
                    "text-sm"
                  )}
                >
                  {formatDollar(claimNum)} nft claimed by participants
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <WhiteListModal
        data={whiteListData}
        open={open}
        closeModal={closeModal}
      />
    </div>
  );
}
