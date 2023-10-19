import { useParams } from "react-router-dom";
import { incentiveMethodList, rewardMap } from "@/utils/conf";
import pointIcon from "@/images/icon/point.svg";
import nftIcon from "@/images/icon/nft.svg";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { conf as tbookConf } from "@tbook/utils";
import clsx from "clsx";
import { useState, useCallback } from "react";
import WinnerListModal from "./winnerListModal";
import useReward from "@/hooks/queries/useReward";

const { formatDollar } = tbookConf;
export default function Reward() {
  const { id } = useParams();
  const { data: reward } = useReward(id);
  const [winnerListData, setWinnerListData] = useState(null);
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [per, setPer] = useState(1);
  const closeModal = useCallback(() => {
    setOpen(false);
    setWinnerListData(null);
  }, []);
  const setModalData = useCallback((data) => {
    setWinnerListData(data);
    setOpen(true);
  }, []);

  return (
    <div className="w-[520px] space-y-4 mb-20">
      {reward?.nfts?.map((v) => {
        const nft = v.nft;
        const isDone = v.status === 3;
        const itemStatus = isDone ? rewardMap.done : rewardMap.ongoing;
        const incentiveMethodItem =
          incentiveMethodList.find((v) => v.value === nft.methodType) ||
          incentiveMethodList[0];
        const winners = v.winnerList?.filter(
          (v) => v.claimType === 3 || v.claimType === 4
        );
        const claimNum = v.winnerList?.filter((v) => v.claimType === 4).length;
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
              </div>

              <div
                className="space-y-3 pt-3 hover:opacity-70 cursor-pointer"
                onClick={() => {
                  setModalData(v.winnerList);
                  setModalType("nft");
                  setPer(1);
                }}
              >
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
                <div className={clsx("text-white", "text-sm")}>
                  {formatDollar(claimNum)} nft{claimNum > 1 ? "s" : ""} claimed
                  by participants
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {reward?.points?.map((v) => {
        const point = v.point;
        const isDone = v.status === 3;
        const itemStatus = isDone ? rewardMap.done : rewardMap.ongoing;
        const incentiveMethodItem =
          incentiveMethodList.find((v) => v.value === point.methodType) ||
          incentiveMethodList[0];
        const winners = v.winnerList?.filter(
          (v) => v.claimType === 3 || v.claimType === 4
        );
        const claimNum = v.winnerList?.filter((v) => v.claimType === 4).length;

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

              <div
                className="space-y-3 pt-3 hover:opacity-70 cursor-pointer"
                onClick={() => {
                  setModalData(v.winnerList);
                  setModalType("point");
                  setPer(point.number);
                }}
              >
                <div className="text-t-1 text-sm font-medium">
                  {formatDollar(winners.length)} winners
                </div>
                <div className="flex -space-x-3">
                  {winners.slice(0, 6).map((v, idx) => {
                    return (
                      <div
                        key={idx}
                        className="w-6 h-6 rounded-full overflow-hidden border-0.5 border-[#161616]"
                      >
                        <img
                          src={v?.user?.avatar}
                          className="w-full h-full object-contain object-center"
                        />
                      </div>
                    );
                  })}
                </div>
                <div className={clsx("text-white", "text-sm")}>
                  {formatDollar(claimNum * point.number)} point
                  {claimNum * point.number > 1 ? "s" : ""} claimed by
                  participants
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <WinnerListModal
        data={winnerListData}
        open={open}
        closeModal={closeModal}
        modalType={modalType}
        per={per}
      />
    </div>
  );
}
