import BigNumber from "bignumber.js";
import { colorSchema } from "@tbook/snapshot/conf";
import { useProposal } from "@tbook/snapshot/api";
import clsx from "clsx";
import { useMemo } from "react";
import { Progress } from "antd";
import { formatDollar } from "@tbook/utils/lib/conf";


export default function VoteResult({ snapshotId }) {
  const { data } = useProposal(snapshotId);
  const choices = useMemo(() => {
    // const sum =
    return Array.isArray(data?.choices)
      ? data.choices.map((v, idx) => {
          return {
            choiceDesc: v,
            percent: BigNumber(data.scores[idx])
              .div(data.scores_total)
              .times(100)
              .toFixed(1),
            voteNum: BigNumber(data.scores[idx]).toFixed(6),
          };
        })
      : [];
  }, [data]);
  const arriveQuorum = BigNumber(data?.scores_total).gte(data?.quorum);
  return (
    <div className="space-y-6">
      {data?.quorum > 0 && (
        <div className="space-y-3">
          <h2 className="flex items-center justify-between text-sm font-medium text-[#717374]">
            <span>Turnout/Quorum</span>
            <span
              className={clsx(
                arriveQuorum ? "text-[#65C467] flex items-center gap-x-1" : ""
              )}
            >
              {arriveQuorum && (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="14" height="14" rx="7" fill="#65C467" />
                  <path
                    d="M3 7.39917C3 7.39917 5.04854 9.07486 5.25202 10.5C5.25202 10.5 7.93818 6.10281 10.9228 5.70938C10.9228 5.70938 10.0138 5.04697 10.3123 4C10.3123 4 8.6572 4.16515 5.53692 9.00837L4.07453 6.52601L3 7.39917Z"
                    fill="white"
                  />
                </svg>
              )}
              {formatDollar(BigNumber(data?.scores_total).toFixed(6),6)}/{formatDollar(data?.quorum,6)}
            </span>
          </h2>
          <Progress
            percent={BigNumber(data?.scores_total)
              .div(data?.quorum)
              .times(100)
              .toFixed(2)}
            showInfo={false}
            strokeColor={arriveQuorum ? "#65C467" : "#717374"}
          />
        </div>
      )}

      <div className={clsx("grid", "grid-cols-2 gap-2")}>
        {choices.map((v, idx) => {
          return (
            <div
              key={idx}
              className="grid grid-cols-2 px-4 py-1.5 rounded-lg bg-[#FBFBFB]"
            >
              <div
                className="text-sm font-medium"
                style={{ color: colorSchema[idx % 4] }}
              >
                {v.choiceDesc}
              </div>
              <div className="text-right">
                <h3
                  className="text-sm font-medium"
                  style={{ color: colorSchema[idx % 4] }}
                >
                  {v.percent}%
                </h3>
              </div>
              <p className="text-xs text-[#A1A1A2] col-span-2 text-right">
                {formatDollar(v.voteNum, 6)} vote
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
