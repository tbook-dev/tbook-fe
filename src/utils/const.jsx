import React from "react";
import clsx from "clsx";
import _ from "lodash";
import Ethereum from "../components/icon/Ethereum";
import BSC from "../components/icon/BSC";
import dateIcon from "@/images/icon/date.svg";
import dayjs from "dayjs";

/**
 * 激励目标target
 * 0：default/unknown
 * 1：employee
 * 2：Adviser
 * 3：Developers
 * 4：Business development team
 * 5：investor
 * 6：Community growth
 * 7：customize
 * **/

export const targetMap = {
  //    0: 'default/unknown',
  1: "Employee",
  2: "Adviser",
  3: "Developers",
  4: "Business development team",
  5: "Investor",
  6: "Community growth",
  // 7: "customize",
};

/**
 * byDate,周期类型
 * byMilestone，里程碑
 */
export const grantType = [
  //    0: 'default/unknown',
  {
    name: "By Duration",
    value: 1,
    label: "Duration",
    disabled: false,
    icon: dateIcon,
  },
  {
    name: "By Milestone",
    value: 2,
    label: "Milestone",
    disabled: true,
  },
];

export const dateFormat = "YYYY-MM-DD";

// grant状态：0-default/unknown，1-draft草稿，2-signing签约中，3-effective生效，4-completed完成，5-suspended暂停，6-terminated终止
export const grantStatusList = [
  // {
  //   value: 0,
  //   label: "default/unknown",
  //   render: () => null,
  // },
  {
    value: 1,
    label: "draft",
    render: (v = "", ...props) => (
      <div
        className={clsx(
          "w-[75px] text-sm	text-[#7D7D7D] bg-[#FBFAFA] py-1 rounded-2xl text-center border border-[#7D7D7D]",
          v
        )}
        {...props}
      >
        draft
      </div>
    ),
    text: "draft",
    color: "#7D7D7D",
  },
  {
    value: 2,
    label: "signing",
    isPersonalProperty: true,
    render: (v = "", ...props) => (
      <div
        className={clsx(
          "w-[75px] text-sm	text-[#D97706] bg-[#FEF3C7] py-1 rounded-2xl text-center",
          v
        )}
        {...props}
      >
        signing
      </div>
    ),
    text: "signing",
    color: "#D97706",
  },
  {
    value: 3,
    label: "effective",
    isPersonalProperty: true,
    render: (v = "", ...props) => (
      <div
        className={clsx(
          "w-[75px] text-sm	text-[#35AE86] bg-[#D1FAE5] py-1 rounded-2xl text-center",
          v
        )}
        {...props}
      >
        effective
      </div>
    ),
    text: "effective",
    color: "#35AE86",
  },
  {
    value: 4,
    label: "completed",
    isPersonalProperty: true,
    render: (v = "", ...props) => (
      <div
        className={clsx(
          "w-[75px] text-sm	text-[#6366F1] bg-[#DADBFF] py-1 rounded-2xl text-center",
          v
        )}
        {...props}
      >
        completed
      </div>
    ),
    text: "completed",
    color: "#6366F1",
  },
  {
    value: 5,
    label: "suspended",
    render: (v = "", ...props) => (
      <div
        className={clsx(
          "w-[75px] text-sm	text-[#D91F06] bg-[#FEC7C7] py-1 rounded-2xl text-center",
          v
        )}
        {...props}
      >
        suspended
      </div>
    ),
    text: "suspended",
    color: "#D91F06",
  },
  {
    value: 6,
    label: "terminated",
    render: (v = "", ...props) => (
      <div
        className={clsx(
          "w-[75px] text-sm	text-[#000000] bg-[#606060] py-1 rounded-2xl text-center",
          v
        )}
        {...props}
      >
        terminated
      </div>
    ),
    text: "terminated",
    color: "#000000",
  },
];

export const personalPropertyList = [
  {
    value: 2,
    label: "signing",
    colorCls: "text-[#D97706] border-[#F59E0B]",
    selectedCls: "bg-[#FEF3C7]",
    textColor: "#F59E0B",
  },
  {
    value: 3,
    label: "effective",
    colorCls: "text-[#35AE86] border-[#34D399]",
    selectedCls: "bg-[#D1FAE5]",
  },
  {
    value: 4,
    label: "completed",
    colorCls: "text-[#6366F1] border-[#6366F1]",
    selectedCls: "bg-[#DADBFF]",
  },
];

export const roleList = [
  { code: 1, desc: "Owner" },
  { code: 2, desc: "Administrator" },
  // {
  //   code: 3,
  //   desc: "Viewer",
  // },
  { code: 4, desc: "Grantee" },
];

export const getRoleNumber = (code, list) => {
  return list.filter((v) => v.role === code).length;
};

export const emptyProjectPrompt = `加入一个项目`;

export const inviteList = [
  {
    label: "By Link",
    value: 1,
    disabled: true,
  },
  {
    label: "By Address",
    value: 2,
    disabled: false,
  },
];

export const getDividePercent = (dividend, divisor) => {
  const r1 = _.divide(dividend || 0, divisor || Number.MAX_SAFE_INTEGER) * 100;
  const r2 = _.round(r1, 4);

  return r2;
};

export const periodMap = {
  1: "Day",
  2: "Week",
  3: "Month",
  4: "Year",
};

export const formatDollar = (v = "") => {
  return `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const shortAddress = (address) => {
  return (
    `${address}`.slice(0, 6) +
    "..." +
    `${address}`.slice(`${address}`.length - 4)
  );
};

export const chains = [
  {
    name: "Ethereum",
    fullName: "Ethereum MainNet",
    evm: true,
    evmChainId: 1,
    render: Ethereum,
  },
  {
    name: "BSC",
    fullName: "Binance Smart Chain",
    evm: true,
    evmChainId: 56,
    render: BSC,
  },
];

export function getTargeAudince(target, customized_target_name) {
  return target === 7 ? customized_target_name : targetMap[target];
}

export function minZeroValidator(label) {
  return function (_, value) {
    // console.log('value', value)
    if (value === "" || value === undefined) {
      return Promise.reject(new Error(`Please input the ${label}!`));
    }
    if (value > 0) {
      return Promise.resolve();
    }
    return Promise.reject(new Error(`${label} must be greater than zero!`));
  };
}


export function maxValidator(max, label){
  return function(_, value){
    if(value > max){
      return Promise.reject(new Error(`${label} must be less than ${max}!`));
    }
    return Promise.resolve();
  }
}

export function getLastVested(list=[]) {
  const vestedList = list
    .filter((m) => m.isVested)
    .sort((a, b) => {
      return dayjs(a.date, dateFormat).isAfter(dayjs(b.date)) ? 1 : -1;
    });
  return vestedList.pop();
}

export const tokenTypeList = [
  {
    label: "Token Option",
    value: 1,
    disabled: false,
  },
  {
    label: "Token",
    value: 2,
    disabled: true,
  },
]

export const timeLengthList = [
  {
    label: "day",
    value: 1,
  },
  {
    label: "week",
    value: 2,
  },
  {
    label: "month",
    value: 3,
  },
  {
    label: "year",
    value: 4,
  }
]