import { Modal } from "antd";
import { useResponsive } from "ahooks";
import { useSelector } from "react-redux";
import BigNumber from "bignumber.js";
import { setSnapshotCastModal, setSnapshotData } from "@/store/global";
import { useVp, useProposal } from "@tbook/snapshot/api";
import { useDispatch } from "react-redux";
import { formatDollar } from "@tbook/utils/lib/conf";
import Arrow2Icon from "@/images/icon/arrow2.svg";
import errorIcon from "@/images/icon/error.svg";
import { useAccount } from "wagmi";
import { useParams } from "react-router-dom";

const moduleConf = {
  title: "Cast your vote",
  desc: [
    "Please check your voting information.",
    "In the meantime, please be patient while we check your voting power.",
  ],
  ethscan: "https://etherscan.io/block",
  noVotingPower: (v) =>
    `You can’t vote for this proposal. It seems you don't have any voting power at block ${formatDollar(
      v
    )}.`,
  votingPowerLink: "https://github.com/snapshot-labs/snapshot/discussions/767",
  votingPowerText: "Learn more",
  button: "Confirm",
};
export default function CastModal() {
  const { pc } = useResponsive();
  const dispath = useDispatch();
  const { snapshotId } = useParams();
  const { address } = useAccount();
  const { showSnapshotCastModal, snapshotData } = useSelector((s) => s.global);
  const { data } = useProposal(snapshotId);
  const op = {
    address,
    network: data?.network,
    strategies: data?.strategies,
    snapshot: data?.snapshot,
    space: data?.space?.id,
  };
  const { data: vp } = useVp(op);
  const hasPower = BigNumber(vp?.vp).gt(0);
  
  const handleCance = () => {
    dispath(setSnapshotCastModal(false));
    dispath(setSnapshotData(null));
  };

  return (
    <Modal
      title={moduleConf.title}
      footer={null}
      centered
      open={showSnapshotCastModal}
      closable={pc ? true : false}
      onCancel={handleCance}
    >
      <div className="-mx-6 text-[#131517]">
        <div className="mx-6">
          {moduleConf.desc.map((v, idx) => {
            return (
              <p key={idx} className="text-xs">
                {v}
              </p>
            );
          })}
        </div>

        <div className="my-3 h-px bg-[rgb(19,21,23)]/[0.08]" />

        <div className="mx-6 space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-[#717374]">Choice</span>
            <span className="text-[#131517] font-medium">
              {snapshotData?.choiceText}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#717374]">Snapshot</span>
            <a
              href={`${moduleConf.ethscan}/${data?.snapshot}`}
              target="_blank"
              className="text-[#131517] font-medium flex items-center"
            >
              {formatDollar(data?.snapshot)}
              <img src={Arrow2Icon} alt="block link" />
            </a>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#717374]">Your voting power</span>
            {hasPower ? (
              <span className="text-[#131517] font-medium">
                {formatDollar(BigNumber(vp?.vp).toFixed(6), 6)} vote
              </span>
            ) : (
              <span className="text-[#131517] font-medium flex items-center gap-x-1">
                <img
                  src={errorIcon}
                  className="w-4 h-4"
                  alt="no voting power"
                />
                0 vote
              </span>
            )}
          </div>
          {hasPower ? (
            <button className="h-8 w-full rounded-lg bg-[#006EE9] text-white text-sm font-medium">
              {moduleConf.button}
            </button>
          ) : (
            <div className="flex items-start gap-x-2">
              <img
                src={errorIcon}
                alt="no voting power"
                className="w-4 h-4 mt-1"
              />
              <div className="text-xs">
                <p className="text-black">
                  {moduleConf.noVotingPower(data?.snapshot)}
                </p>
                <a
                  href={moduleConf.votingPowerLink}
                  className="text-[#A1A1A2] underline hover:underline"
                >
                  {moduleConf.votingPowerText}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
