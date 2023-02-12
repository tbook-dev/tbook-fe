import { Button } from "antd";
import bg from "./noConnect.png";
import bgm from "@/images/incentive/all-plan-m.png";
import useSignIn from "@/hooks/useSignIn";

export default function ({ pc }) {
  const { loading, handleSignIn } = useSignIn();
  // console.log({ loading, handleSignIn})
  return pc ? (
    <div
      className="hidden lg:flex items-center justify-between rounded-2xl border bg-cover border-[#DADCE0] px-8 py-[38px]"
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

      <Button size="large"  loading={loading} onClick={handleSignIn}>
        <span className="text-[#0049FF]">Connect Wallet</span>
      </Button>
    </div>
  ) : (
    <div
      className="h-[180px] bg-cover shadow-c2 rounded-2xl flex justify-center items-center"
      style={{
        backgroundImage: `url(${bgm})`,
      }}
    >
      <Button size="large" type="primary" loading={loading} onClick={handleSignIn}>
        Connect Wallet
      </Button>
    </div>
  );
}
