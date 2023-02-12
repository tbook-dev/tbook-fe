import { Link } from "react-router-dom";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import planIcon from "@/images/incentive/plan.svg";
import bg from "./noConnect.png";

export default function () {
  return (
    <div
      className="flex items-center justify-between rounded-2xl border bg-cover border-[#DADCE0] pt-7 pb-5 px-4"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="flex items-center">
        <img className="mr-4 w-14" src={planIcon} />
        <div className="flex-auto">
          <p className="text-2xl leading-[32px] mb-1">
            New Token Incentive Plan
          </p>
          <p className="text-base">
            Connect wallet to set up your incentive plan.
          </p>
        </div>
      </div>

      <Link to="/create/plan">
        <Button type="primary" shape="round" ghost size="large">
          <span>
            <PlusOutlined />
            <span className="ml-2 font-roboto">New Plan</span>
          </span>
        </Button>
      </Link>
    </div>
  );
}
