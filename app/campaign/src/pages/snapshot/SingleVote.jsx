import { useProposal, useUserVotes } from "@tbook/snapshot/api";
import dayjs from "dayjs";
import { useState } from "react";
import Radio from "./Radio";
import clsx from "clsx";
import { useAccount } from "wagmi";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setSnapshotCastModal,
  setSnapshotData,
  setConnectWalletModal,
} from "@/store/global";
import useUserInfo from "@/hooks/useUserInfoQuery";

export default function SingleVote({ snapshotId }) {
  const { data } = useProposal(snapshotId);
  const [voted, setVoted] = useState(null);
  const { address } = useAccount();
  const { data: votes } = useUserVotes(snapshotId, address);
  const { userLogined } = useUserInfo();
  const dispath = useDispatch();
  const handleVote = () => {
    if (userLogined) {
      dispath(setSnapshotCastModal(true));
      dispath(
        setSnapshotData({
          choice: voted,
          choiceText: data?.choices?.[voted - 1],
        })
      );
    } else {
      dispath(setConnectWalletModal(true));
    }
  };
  useEffect(() => {
    if (!votes) return;
    const vote = votes?.find((v) => v.voter === address);
    setVoted(vote?.choice ?? null);
  }, [votes]);

  return (
    <div className="space-y-6">
      {data?.state === "pending" && (
        <div className="text-[#A1A1A2] text-sm">
          This voting will start at
          {dayjs(data?.start * 1000).format("MMM D, YYYY h:mm A")}
        </div>
      )}

      <div className="space-y-2">
        {data?.choices.map((v, idx) => {
          return (
            <div
              key={idx}
              onClick={() => {
                setVoted(v === voted ? null : idx + 1);
              }}
              className={clsx(
                "flex items-center justify-between",
                "px-4 py-3 border rounded-lg text-sm font-medium h-[46px] bg-white",
                {
                  "border-[#F8F8F8] text-[#A1A1A2]": data?.state === "pending",
                  "border-[rgba(0,110,233)]/[0.20] text-[#006EE9] cursor-pointer select-none":
                    data?.state === "active",
                }
              )}
            >
              {v}
              {data?.state === "pending" ? (
                <Radio disabled />
              ) : (
                <Radio checked={idx + 1 === voted} />
              )}
            </div>
          );
        })}
      </div>
      <button
        disabled={!(data?.state === "active" && voted !== null)}
        onClick={handleVote}
        className={clsx(
          "w-full text-xl font-medium h-12 rounded-lg",
          data?.state === "active" && voted !== null
            ? "bg-[#006EE9] text-white"
            : "bg-[#F7F7F7] text-[#C1C2C3]"
        )}
      >
        Vote
      </button>
    </div>
  );
}
