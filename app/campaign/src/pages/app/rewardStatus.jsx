import timeSvg from "@/images/icon/time.svg";
import timeGraySvg from "@/images/icon/time-gray.svg";
import { Statistic } from "antd";
import useCampaignQuery from "@/hooks/useCampaignQuery";
import { useParams } from "react-router-dom";
const { Countdown } = Statistic;

export default function RewardStatus({ showTimeClock = false }) {
  const { campaignId } = useParams();
  const { data: page, campaignNotStart } = useCampaignQuery(campaignId);
  console.log({showTimeClock, campaignNotStart})
  return (!campaignNotStart && showTimeClock)? (
    <div className="flex items-center gap-x-1 px-2 py-1 rounded-2.5xl bg-[rgb(254,248,234)] w-max mb-3">
      <img
        src={timeSvg}
        className="w-4 h-4 object-center object-contain"
        alt="time"
      />
      <Countdown
        value={page?.campaign?.endAt}
        format="D[d] H[h] m[m] s[s]"
        valueStyle={{
          color: "#F8B917",
          fontSize: "14px",
          lineHeight: "20px",
        }}
      />
    </div>
  ) : (
    <div className="flex items-center gap-x-1 px-2 py-1 rounded-2.5xl bg-[rgb(241,241,241)] text-sm text-[rgb(148,177,207)] w-max mb-3">
      <img
        src={timeGraySvg}
        className="w-4 h-4 object-center object-contain"
        alt="time"
      />
      done
    </div>
  );
}
