import { useProposal } from "@tbook/snapshot/api";
import dayjs from "dayjs";
import { useState } from "react";
import Radio from "./Radio";
import clsx from "clsx";

export default function SingleVote({ snapshotId }) {
  const { data } = useProposal(snapshotId);
  const [voted, setVoted] = useState(null);
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
                setVoted(v === voted ? null : v);
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
                <Radio checked={v === voted} />
              )}
            </div>
          );
        })}
      </div>
      <button
        disabled={!(data?.state === "active" && voted !== null)}
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
