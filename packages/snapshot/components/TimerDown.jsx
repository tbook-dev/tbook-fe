import { Statistic } from "antd";
import countdonwSvg from "../images/countdown.svg";
import clsx from "clsx";
const { Countdown } = Statistic;

export default function TimerDown({ state, value }) {
  return (
    <div
      className={clsx(
        "w-max flex items-center gap-x-1 px-1 rounded-[20px]",
        state === "pending" ? "#FEF8E7" : " bg-[rgb(255,81,81)]/[0.04]"
      )}
    >
      <img src={countdonwSvg} className="w-3 h-3 object-center" />
      {state === "closed" ? (
        "closed"
      ) : (
        <Countdown
          valueStyle={{
            color: state === "pending" ? "#F8B917" : "#FF5151",
            fontSize: "12px",
            lineHeight: "20px",
          }}
          format="D[d] H[h] m[m] s[s]"
          value={value * 1000}
        />
      )}
    </div>
  );
}
