import clsx from "clsx";
import bgpc from "@/images/incentive/all-plan-ap.png";
import bg from "@/images/incentive/all-plan-m.png";
import { Button } from "antd";
import { Link } from "react-router-dom";

export default function ({ pc }) {
  return (
    <div
      className={clsx(
        "flex justify-center items-center bg-cover shadow-c2 border rounded-2xl overflow-hidden relative",
        "w-[80vw] h-[180px] flex flex-col lg:w-[264px] lg:h-[194px]"
      )}
      style={{
        backgroundImage: `url(${pc ? bgpc : bg})`,
      }}
    >
      <Link to="/create/plan">
        <Button type="primary">+ New Plan</Button>
      </Link>
    </div>
  );
}
