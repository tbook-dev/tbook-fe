import React from "react";
import clsx from "clsx";
import { conf } from "@tbook/utils";
const { grantStatusList, grantType } = conf;
import MobleFilter from "./mobleFilter";
import WebFilter from "./webFilter";
import { useResponsive } from "ahooks";

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

export default React.memo(function ({ tipList, open, setOpen }) {
  const { pc } = useResponsive();
  const filterOpitons = getFilterOpitons(tipList);

  return pc ? <WebFilter filterOpitons={filterOpitons} /> : <MobleFilter filterOpitons={filterOpitons} />;
});
