import React from "react";
import { conf } from "@tbook/utils";
const { grantStatusList, grantType, sortList } = conf;
import MobleFilter from "./mobleFilter";
import WebFilter from "./webFilter";
import { useResponsive } from "ahooks";

const getFilterOpitons = (plans, pc) => {
  const options = [
    {
      group: "Status",
      key: "status",
      list: grantStatusList.map((v) => ({
        label: v.text,
        value: v.value,
        disabled: false,
        key: "status",
      })),
    },
    {
      group: "Plan",
      key: "plan",
      list: plans?.map((v) => ({
        label: v.incentivePlanName,
        value: v.incentivePlanId,
        disabled: false,
        key: "plan",
      })),
    },
    {
      group: "Vesting Type",
      key: "vestingType",
      list: grantType.map((v) => ({
        label: v.label,
        value: v.value,
        disabled: v.disabled,
        key: "vestingType",
      })),
    },
    {
      group: "Grant Type",
      key: "grantType",
      list: [
        {
          label: "Token option",
          value: "Token option",
          disabled: false,
          key: "grantType",
        },
        {
          label: "Token lockup",
          value: "Token lockup",
          disabled: true,
          key: "grantType",
        },
      ],
    },
  ];

  return pc
    ? options
    : [
        {
          group: "Sort By",
          key: "sortBy",
          list: sortList.map((v) => ({ ...v, key: "sortBy" })),
        },
        ...options,
      ];
};

export default React.memo(function ({ tipList, open, setOpen, filters, dispatch }) {
  const { pc } = useResponsive();
  const filterOpitons = getFilterOpitons(tipList, pc);

  return pc ? (
    <WebFilter open={open} setOpen={setOpen} filterOpitons={filterOpitons} filters={filters} dispatch={dispatch} />
  ) : (
    <MobleFilter open={open} setOpen={setOpen} filterOpitons={filterOpitons} filters={filters} dispatch={dispatch} />
  );
});
