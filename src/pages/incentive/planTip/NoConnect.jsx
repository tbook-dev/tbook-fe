import { Button } from "antd";
import planIcon from "@/images/incentive/plan.svg";
import bg from "./noConnect.png";

export default function () {
  return (
    <div
      className="flex items-center justify-between rounded-2xl border bg-cover border-[#DADCE0] px-8 py-[38px]"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div>
          <p className="text-[24px] leading-[32px] text-[#333] mb-1">
            New Token Incentive Plan
          </p>
          <p className="text-[16px] leading-[24px] text-[#999]">
            Connect wallet to set up your incentive plan.
          </p>
      </div>

      <Button size="large">
        <span className="text-[#0049FF]">Connect Wallet</span>
      </Button>
    </div>
  );
}
