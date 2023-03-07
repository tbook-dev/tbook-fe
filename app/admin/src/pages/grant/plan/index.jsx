import { useResponsive } from "ahooks";
import { useCurrentProjectId } from "@tbook/hooks";
import React, { useState } from "react";
import { Drawer } from "antd";
import { Popover } from "antd";
import { useAsyncEffect } from "ahooks";
import { getIncentiveList } from "@/api/incentive";
import { useParams, useNavigate } from "react-router-dom";
import clsx from "clsx";
import switchIcon from "@tbook/share/images/icon/switch-plan.png";
import { Spin } from "antd";

export default function ({ loading, planName, targetAudince, availableAmount }) {
  const { pc } = useResponsive();
  const projectId = useCurrentProjectId();
  const [isOpen, setOpen] = useState(false);
  const [tipList, setTipList] = useState([]);
  const { tipId } = useParams();
  const navigate = useNavigate();
  useAsyncEffect(async () => {
    if (!projectId) return;
    const list = await getIncentiveList(projectId);
    setTipList(list);
  }, [projectId]);

  const conf = [
    {
      title: "Plan Name",
      value: planName,
    },
    {
      title: "Target Audience",
      value: () => (
        <span className="max-w-full truncate border border-white rounded py-0.5 px-2 lg:px-4 lg:py-px">
          {targetAudince}
        </span>
      ),
    },
    {
      title: "Available Amount",
      value: availableAmount + " Token",
    },
  ];

  const Content = () => (
    <div className="-mx-6 lg:-mx-3">
      <div className="pb-5 pt-3 w-[320px]">
        <h2 className="px-6 pt-3 pb-6 font-medium text-center text-c7">Switch to another incentive plan</h2>
        <div className="max-h-[400px] overflow-y-auto">
          {tipList?.map((tip) => {
            return (
              <div
                key={tip.incentivePlanId}
                className={clsx(
                  tipId == tip.incentivePlanId ? "bg-cw1  text-black" : "text-c-9",
                  "px-6 flex items-center h-10 text-c6 font-medium cursor-pointer dark:hover:text-black dark:hover:bg-cw1 dark:hover:opacity-60"
                )}
                onClick={() => {
                  setOpen(false);
                  navigate(`/incentive/grant/${tip.incentivePlanId}/create`);
                }}
              >
                {tip.incentivePlanName}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className="overflow-hidden bg-white rounded-lg dark:bg-black shadow-d3">
      <Spin spinning={loading}>
        <div className="lg:pt-4 lg:pb-[18px]">
          <div className="relative flex items-center justify-between h-10 overflow-hidden border-b lg:h-10 lg:pr-4 border-b-1">
            <h2 className="flex items-center h-10 pl-4 lg:pl-6 text-c3 lg:text-cwh2 dark:text-white">Plan</h2>

            {pc ? (
              <Popover
                trigger="click"
                open={isOpen}
                onOpenChange={(v) => setOpen(v)}
                placement="bottomRight"
                content={<Content />}
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
                  <img src={switchIcon} className="w-9" />
                </span>
              </Popover>
            ) : (
              <span
                onClick={() => setOpen(!isOpen)}
                className="absolute lg:bg-[rgba(124,162,255,0.12)] rounded-xl bottom-0 top-0  lg:top-2 lg:bottom-2 lg:h-12 lg:w-12 flex items-center justify-center cursor-pointer right-2.5 lg:right-2"
              >
                <img src={switchIcon} className="w-9" />
              </span>
            )}
          </div>

          <div className="divide-y">
            {conf.map((v) => {
              return (
                <div key={v.title} className="flex items-center h-10 px-4 border-b-1 lg:px-6 lg:py-2 text-c1">
                  <span className="w-[41%] text-b-8">{v.title}</span>
                  <span className="w-[59%] text-white flex justify-end lg:justify-between">
                    {typeof v.value === "function" ? <v.value /> : v.value}
                  </span>
                </div>
              );
            })}
          </div>
          {!pc && isOpen && (
            <Drawer
              headerStyle={{ display: "flex" }}
              placement="bottom"
              title={
                <div className="flex items-center justify-center font-medium text-c6">
                  Switch to another incentive plan
                </div>
              }
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
      </Spin>
    </div>
  );
}
