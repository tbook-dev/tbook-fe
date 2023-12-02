import { useProposal } from "@tbook/snapshot/api";
import dayjs from "dayjs";
import { useState } from "react";

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
          return <div key={idx}>{v}</div>;
        })}
      </div>
    </div>
  );
}
