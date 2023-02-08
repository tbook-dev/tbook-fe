import { grantStatusList, grantType } from "@/utils/const";
import React from "react";
import clsx from "clsx";

const getFilterOpitons = (plans) => {
  return [
    {
      group: "Status",
      list: grantStatusList.map((v) => ({
        label: v.label,
        value: v.value,
        disabled: false,
      })),
    },
    {
      group: "Plan",
      list: [
        {
          label: "all",
          value: null,
          disabled: false,
        },
      ].concat(
        plans?.map((v) => ({
          label: v.incentivePlanName,
          value: v.incentivePlanId,
          disabled: false,
        }))
      ),
    },
    {
      group: "Vesting Type",
      list: grantType.map((v) => ({
        label: v.label,
        value: v.value,
        disabled: v.disabled,
      })),
    },
    {
      group: "Grant Type",
      list: [
        {
          label: "Token option",
          value: "Token option",
          disabled: false,
        },
        {
          label: "Token lockup",
          value: "Token lockup",
          disabled: true,
        },
      ],
    },
  ];
};

export default React.memo(function ({ tipList, filters, dispatch, swiper }) {
  return (
    <div>
      {getFilterOpitons(tipList).map((conf) => {
        return (
          <div key={conf.group}>
            <h3 className="text-[#606368] text-[16px] mb-3">{conf.group}</h3>
            <div className="grid grid-cols-3 gap-x-2.5 gap-y-2 mb-6">
              {conf.list.map((v, idx, arr) => {
                return (
                  <div
                    key={v.value}
                    className={clsx(
                      "w-[108px] text-xs h-[28px] leading-[28px] text-center truncate px-2 rounded-2xl",
                      filters[conf.group] === v.value
                        ? "bg-[#0049FF] text-white"
                        : v.disabled
                        ? "bg-[#F0F0F0] text-[#B8B8B8]"
                        : "bg-[#F0F0F0] text-[#606368]"
                    )}
                    onClick={() => {
                      if (v.disabled) return;

                      dispatch({ type: conf.group, payload: v.value });

                      if (conf.group === "Plan") {
                        // swiper
                        if (idx === 0) {
                          // all
                          swiper.slideTo(arr.length - 1);
                        } else {
                          swiper.slideTo(idx - 1);
                        }
                      }
                    }}
                  >
                    {v.label}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
});
