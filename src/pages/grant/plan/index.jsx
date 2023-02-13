import { useResponsive } from "ahooks";
import { SwapOutlined } from "@ant-design/icons";
import cardbgpc from "@/images/incentive/headers/grant-planpc.png";
import cardbg from "@/images/incentive/headers/grant-plan.png";
import Title from "@/pages/component/Title";
import useCurrentProjectId from "@/hooks/useCurrentProjectId";
import React, { useState } from "react";
import { Drawer, theme } from "antd";
import { Divider, Dropdown, Space } from "antd";
import { useAsyncEffect } from "ahooks";
import { getIncentiveList } from "@/api/incentive";
import { useParams, useNavigate } from "react-router-dom";
import clsx from "clsx";

const { useToken } = theme;

export default function ({ planName, targetAudince, availableAmount }) {
  const { pc } = useResponsive();
  const projectId = useCurrentProjectId();
  const [isOpen, setOpen] = useState(false);
  const [tipList, setTipList] = useState([]);
  const { tipId } = useParams();
  const navigate = useNavigate();
  const { token } = useToken();

  useAsyncEffect(async () => {
    if (!projectId) return;
    const list = await getIncentiveList(projectId);
    setTipList(list);
  }, [projectId]);

  const contentStyle = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };
  const menuStyle = {
    boxShadow: "none",
  };
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
    <div className="bg-white rounded-lg shadow-c5">
      <div className="h-10 relative rounded-lg  lg:h-[67px] lg:pr-4 flex justify-between items-center overflow-hidden">
        <Title text="Plan" className="relative z-10 px-4" color="text-white"/>

        <img
          src={pc ? cardbgpc : cardbg}
          className="absolute top-0 left-0 w-full"
        />

        {pc ? (
          <Dropdown
            arrow={{ pointAtCenter: true }}
            trigger="click"
            placement="bottomRight"
            menu={{
              items: tipList?.map((v) => ({
                label: v.incentivePlanName,
                value: v.incentivePlanId,
                key: v.incentivePlanId,
                disabled: v.incentivePlanId == tipId,
              })),
              onClick: (evt) => {
                navigate(`/incentive/grant/${evt.key}/create`);
              },
            }}
            dropdownRender={(menu) => (
              <div
                style={{ ...contentStyle, height: "175px", overflow: "scroll" }}
              >
                <Space style={{ padding: 8 }}>
                  <p className="text-[#333]">
                    Switch to another incentive plan
                  </p>
                </Space>
                <Divider style={{ margin: 0 }} />
                {React.cloneElement(menu, { style: menuStyle })}
              </div>
            )}
          >
            <span className=" lg:bg-[rgba(124,162,255,0.12)] z-10 rounded-xl lg:h-12 lg:w-12 flex items-center justify-center cursor-pointer">
              <SwapOutlined style={{ color: pc ? "#0049FF" : "#7CA2FF" }} />
            </span>
          </Dropdown>
        ) : (
          <span
            onClick={() => setOpen(!isOpen)}
            className="absolute lg:bg-[rgba(124,162,255,0.12)] rounded-xl bottom-0 top-0  lg:top-2 lg:bottom-2 lg:h-12 lg:w-12 flex items-center justify-center cursor-pointer right-2.5 lg:right-2"
          >
            <SwapOutlined style={{ color: pc ? "#0049FF" : "#7CA2FF" }} />
          </span>
        )}
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
      {!pc && isOpen && (
        <Drawer
          headerStyle={{ display: "flex" }}
          placement="bottom"
          title="Switch to another incentive plan"
          // closable={false}
          contentWrapperStyle={{
            height: "50vh",
            borderRadius: "24px 24px 0px 0px",
            overflow: "scroll",
          }}
          open={isOpen}
          onClose={() => setOpen(false)}
        >
          {tipList
            ?.map((v) => ({
              label: v.incentivePlanName,
              value: v.incentivePlanId,
              key: v.incentivePlanId,
              disabled: v.incentivePlanId == tipId,
            }))
            .map((item) => {
              return (
                <div
                  key={item.key}
                  className={clsx(
                    "text-[16px] leading-[16px] py-3 text-center -mx-6",
                    item.disabled ? "text-[#fff] bg-[#0049FF]" : "text-[#999]"
                  )}
                  onClick={()=>{
                    if(item.disabled) return;
                    navigate(`/incentive/grant/${item.key}/create`);
                  }}
                >
                  {item.label}
                </div>
              );
            })}
        </Drawer>
      )}
    </div>
  );
}
