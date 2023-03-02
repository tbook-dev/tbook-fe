import { useResponsive } from "ahooks";
import { SwapOutlined } from "@ant-design/icons";
import useCurrentProjectId from "@/hooks/useCurrentProjectId";
import React, { useState } from "react";
import { Drawer, theme } from "antd";
import { Divider, Dropdown, Space } from "antd";
import { useAsyncEffect } from "ahooks";
import { getIncentiveList } from "@/api/incentive";
import { useParams, useNavigate } from "react-router-dom";
import clsx from "clsx";
import switchIcon from '@/images/icon/switch-plan.png';

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
      value: () => <span className="border border-white rounded py-0.5 px-2 lg:px-4 lg:py-px">{targetAudince}</span>,
    },
    {
      title: "Available Amount",
      value: availableAmount + " Token",
    },
  ];

  return (
    <div className="bg-white rounded-lg dark:bg-black lg:pt-4 lg:pb-[18px] shadow-d3">
      <div className="relative flex items-center justify-between h-10 overflow-hidden border-b lg:h-10 lg:pr-4 border-b-1">
        <h2 className="flex items-center h-10 pl-4 lg:pl-6 text-c3 lg:text-cwh2 dark:text-white">Plan</h2>

        {pc ? (
          <Dropdown
            arrow={{ pointAtCenter: true }}
            trigger="click"
            placement="bottomRight"
            open={isOpen}
            onOpenChange={(v) => setOpen(v)}
            menu={{
              items: tipList?.map((v) => ({
                label: v.incentivePlanName,
                value: v.incentivePlanId,
                key: v.incentivePlanId,
                disabled: v.incentivePlanId == tipId,
              })),
              onClick: (evt) => {
                setOpen(false);
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
            <span
              onClick={() => {
                setOpen(true);
              }}
              className={clsx(
                "z-10 rounded-xl lg:h-12 lg:w-12 flex items-center justify-center cursor-pointer",
                isOpen && "lg:bg-[rgba(124,162,255,0.12)]"
              )}
            >
              <img src={switchIcon} className="w-9"/>
            </span>
          </Dropdown>
        ) : (
          <span
            onClick={() => setOpen(!isOpen)}
            className="absolute lg:bg-[rgba(124,162,255,0.12)] rounded-xl bottom-0 top-0  lg:top-2 lg:bottom-2 lg:h-12 lg:w-12 flex items-center justify-center cursor-pointer right-2.5 lg:right-2"
          >
            <img src={switchIcon} className="w-9"/>
          </span>
        )}
      </div>

      <div className="divide-y">
        {conf.map((v) => {
          return (
            <div
              key={v.title}
              className="flex items-center h-10 px-4 border-b-1 lg:px-6 lg:py-2 text-c1"
            >
              <span className="flex-[10] text-b-8">{v.title}</span>
              <span className="flex-[14] text-white flex justify-end lg:justify-between">
                {typeof v.value === 'function' ? <v.value />: v.value}
              </span>
            </div>
          );
        })}
      </div>
      {!pc && isOpen && (
        <Drawer
          headerStyle={{ display: "flex" }}
          placement="bottom"
          title={<div className="flex items-center justify-center font-medium text-c6">Switch to another incentive plan</div>}
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
                    "text-c6 h-10 flex items-center justify-center -mx-6",
                    item.disabled ? "text-black bg-cw1" : "text-[#666]"
                  )}
                  onClick={() => {
                    if (item.disabled) return;
                    setOpen(false);
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
