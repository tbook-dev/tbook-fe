import clsx from "clsx";
import bgpc from "@/images/incentive/all-plan.png";
import { Button } from "antd";
import bg from "@/images/incentive/new-plan.png";
import { Link } from "react-router-dom";


export default function ({ pc }) {
  return (
    <div className="w-[70vw] h-[180px] py-2.5 px-0 lg:w-[220px] lg:h-[136px] lg:py-0 lg:px-0">
      <div
        className={clsx(
          "bg-cover shadow-c2 rounded-lg overflow-hidden relative",
          "h-full"
        )}
        style={{
          backgroundImage: `url(${pc ? bgpc : bg})`,
        }}
      >
        <div className="flex items-center justify-center h-full">
          <Link to="/create/plan">
            <Button type="primary">+ New Plan</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
