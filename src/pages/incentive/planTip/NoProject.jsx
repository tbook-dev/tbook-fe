import { Button } from "antd";
import bg from "./noProject.png";
import bgm from "@/images/incentive/all-plan-m.png";
import { Link } from "react-router-dom";

export default function ({ pc }) {
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

      <Link to="/create/project">
        <Button size="large" type="primary">
          + New Plan
        </Button>
      </Link>
    </div>
  ) : (
    <div
      className="h-[180px] bg-cover shadow-c2 rounded-2xl flex justify-center items-center"
      style={{
        backgroundImage: `url(${bgm})`,
      }}
    >
      <Link to="/create/project">
        <Button size="large" type="primary">
          + New Plan
        </Button>
      </Link>
    </div>
  );
}
