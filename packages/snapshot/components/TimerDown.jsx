import { Statistic } from "antd";
import countdonwSvg from "../images/countdown.svg";
const { Countdown } = Statistic;

export default function TimerDown({ state, value }) {
  return (
    <div className="text-[#FF5151] text-xs w-max flex items-center gap-x-1 px-1 rounded-[20px] bg-[rgb(255,81,81)]/[0.04]">
      <img src={countdonwSvg} className="w-3 h-3 object-center" />
      {state === "closed" ? (
        "closed"
      ) : (
        <Countdown
          valueStyle={{
            color: "#FF5151",
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
