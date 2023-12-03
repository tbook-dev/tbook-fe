import { useProposal } from "./api";
import clsx from "clsx";
import { useMemo } from "react";
import TimerDown from "./components/TimerDown";
import BigNumber from "bignumber.js";
import { colorSchema } from "./conf";

export default function SigleVote({ id }) {
  const { data } = useProposal(id);
  const choices = useMemo(() => {
    // const sum =
    return Array.isArray(data?.choices)
      ? data.choices.map((v, idx) => {
          return {
            choiceDesc: v,
            percent:
              data.scores_total === 0
                ? 0
                : BigNumber(data.scores[idx])
                    .div(data.scores_total)
                    .times(100)
                    .toFixed(1),
            voteNum: BigNumber(data.scores[idx]).toFixed(6),
          };
        })
      : [];
  }, [data]);

  return (
    data && (
      <div className="block mt-4 border border-[rgb(19,21,23)]/[0.06] p-3 rounded-xl space-y-8">
        <div className="space-y-3">
          {data.state === "active" && (
            <TimerDown state="active" value={data.end} />
          )}

          <h2 className="text-base font-medium">{data.title}</h2>
        </div>

        <div className={clsx("grid", "grid-cols-2 gap-2")}>
          {choices.slice(0, 4).map((v, idx) => {
            return (
              <div
                key={idx}
                className="grid grid-cols-2 px-4 py-1.5 rounded-lg bg-[#FBFBFB]"
              >
                <div
                  className="text-sm font-medium"
                  style={{ color: colorSchema[idx] }}
                >
                  {v.choiceDesc}
                </div>
                <div className="text-right">
                  <h3
                    className="text-sm font-medium"
                    style={{ color: colorSchema[idx] }}
                  >
                    {v.percent}%
                  </h3>
                </div>
                <p className="text-xs text-[#A1A1A2] col-span-2 text-right">
                  {v.voteNum} vote
                </p>
              </div>
            );
          })}
          {choices.length === 3 && (
            <div
              key="view"
              className="flex items-center justify-center text-sm font-medium gap-x-1 rounded-lg bg-[#FBFBFB]"
              style={{ color: colorSchema.view }}
            >
              View all
              <svg
                width="6"
                height="8"
                viewBox="0 0 6 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.530029 7.06L3.58336 4L0.530029 0.94L1.47003 0L5.47003 4L1.47003 8L0.530029 7.06Z"
                  fill="#717374"
                />
              </svg>
            </div>
          )}
        </div>
        <div className="text-[#006EE9] text-sm rounded bg-[rgba(58,130,247)]/[0.10] px-4 py-1.5 w-max flex items-center gap-x-1">
          Vote Now
          <svg
            width="5"
            height="8"
            viewBox="0 0 5 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 7.06L3.05333 4L0 0.94L0.94 0L4.94 4L0.94 8L0 7.06Z"
              fill="#006EE9"
            />
          </svg>
        </div>
      </div>
    )
  );
}
