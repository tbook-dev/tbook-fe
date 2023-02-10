import { useResponsive } from "ahooks";
import { SwapOutlined } from "@ant-design/icons";
import cardbgpc from "@/images/incentive/headers/grant-planpc.png";
import cardbg from "@/images/incentive/headers/grant-plan.png";
import Title from "@/pages/component/Title";
import usePrjects from "@/hooks/useProjects";
import { useState } from "react";
import { Drawer } from "antd";

export default function ({ planName, targetAudince, availableAmount }) {
  const { pc } = useResponsive();
  const projects = usePrjects();
  const [isOpen, setOpen] = useState(false);

  console.log("projects-->", projects);
  const conf = [
    {
      title: "Plan Name",
      value: planName,
    },
    {
      title: "Target Audience",
      value: targetAudince,
    },
    {
      title: "Available Amount",
      value: availableAmount + " Token",
    },
  ];

  return (
    <div className="overflow-hidden bg-white rounded-xl shadow-c5">
      <div className="h-10 lg:h-[67px] relative flex items-center overflow-hidden">
        <div>
          <img
            src={pc ? cardbgpc : cardbg}
            className="absolute top-0 left-0 w-full"
          />
          <span className="absolute lg:bg-[rgba(124,162,255,0.12)] rounded-xl bottom-0 top-0  lg:top-2 lg:bottom-2 lg:h-12 lg:w-12 flex items-center justify-center cursor-pointer right-2.5 lg:right-2">
            <SwapOutlined style={{ color: pc ? "#0049FF" : "#7CA2FF" }} />
          </span>
        </div>

        <Title text="Plan" className="relative z-10 px-4" />
      </div>
      <div className="divide-y">
        {conf.map((v) => {
          return (
            <div
              key={v.title}
              className="flex px-4 py-2 text-[14px] leading-[18px] lg:leading-[22px]"
            >
              <span className="flex-[10] text-[#666]">{v.title}</span>
              <span className="flex-[14] flex justify-end lg:justify-between">
                {v.value}
              </span>
            </div>
          );
        })}
      </div>
      {pc ? <div></div> : <Drawer>x</Drawer>}
    </div>
  );
}
