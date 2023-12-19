import _ from "lodash";
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
    name: "Cliff Vesting",
    value: 1,
    label: "Cliff Vesting",
    disabled: false,
  },
  {
    name: "Periods",
    value: 2,
    label: "Periods",
    disabled: false,
  },
  {
    name: "Milestone",
    value: 3,
    label: "Milestone",
    disabled: true,
  },
];

export const findGrantType = (value) => {
  return grantType.find((v) => v.value == value)?.name;
};

export const vestingOccursOptions = [
  {
    name: "On the same day as the Start Date",
    value: 0,
  },
  {
    name: "On the previous day as the Start date",
    value: 1,
  },
  {
    name: "On the next day as the Start date",
    value: 2,
  },
];

export const dateFormat = "YYYY-MM-DD";
export const timeFormat = "YYYY-MM-DD HH:mm:ss";
// grant状态：0-default/unknown，1-draft草稿，2-signing签约中，3-effective生效，4-completed完成，5-suspended暂停，6-terminated终止
// 0,1,已经取消 completed也属于effective了
//
export const grantStatusList = [
  // {
  //   value: 1,
  //   text: "draft",
  //   color: "#7D7D7D",
  // },
  {
    value: 2,
    text: "Signing",
    darkColor: "#FFB300",
  },
  {
    value: 3,
    text: "Effective",
    darkColor: "#6AB3F7",
  },
  // {
  //   value: 4,
  //   text: "completed",
  //   color: "#6366F1",
  // },
  {
    value: 5,
    text: "Suspend",
    darkColor: "#45A0F5",
  },
  {
    value: 6,
    text: "Terminate",
    darkColor: "#666666",
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

export const getDividePercent = (dividend, divisor, len = 4) => {
  const r1 = _.divide(dividend || 0, divisor || Number.MAX_SAFE_INTEGER) * 100;
  const r2 = _.round(r1, len);

  return r2;
};

export const periodMap = {
  1: "Day",
  2: "Week",
  3: "Month",
  4: "Year",
};

// export const formatDollar = (v = "") => {
//   return `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// };
export const formatDollar = (value, maximumSignificantDigits = 3) => {
  const v = Number(value);
  if (Number.isNaN(v)) {
    return value;
  } else {
    return Intl.NumberFormat("en-US", {
      // style: 'currency',
      // currency: 'USD',
      maximumSignificantDigits,
      notation: "standard",
    }).format(v);
  }
};

export const shortAddress = (address) => {
  return (
    `${address}`.slice(0, 7) +
    "..." +
    `${address}`.slice(`${address}`.length - 5)
  );
};

export const chains = [
  {
    name: "Ethereum",
    fullName: "Ethereum MainNet",
    evm: true,
    evmChainId: 1,
  },
  {
    name: "BSC",
    fullName: "Binance Smart Chain",
    evm: true,
    evmChainId: 56,
  },
];

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
export function moreZeroValidator(label) {
  return function (_, value) {
    // console.log('value', value)
    if (value === "" || value === undefined) {
      return Promise.reject(new Error(`Please input the ${label}!`));
    }
    if (value >= 0) {
      return Promise.resolve();
    }
    return Promise.reject(new Error(`${label} must not be less than zero!`));
  };
}

export function maxValidator(max, label) {
  return function (_, value) {
    if (value > max) {
      return Promise.reject(new Error(`${label} must be less than ${max}!`));
    }
    return Promise.resolve();
  };
}

export function emptyNotNegativeValidator(label) {
  return function (_, value) {
    if (value < 0) {
      return Promise.reject(new Error(`${label} cannot be less than 0!`));
    }
    return Promise.resolve();
  };
}

export function getLastVested(list = []) {
  const vestedList = list
    .slice()
    .filter((m) => m.isVested)
    .sort((a, b) => {
      return dayjs(a.date, dateFormat).isAfter(dayjs(b.date)) ? 1 : -1;
    });
  return vestedList.pop();
}

export const tokenTypeList = [
  {
    name: "Token Option",
    value: 1,
    disabled: false,
  },
  {
    name: "Token",
    value: 2,
    disabled: true,
  },
];

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
  },
];

export const findTimeType = (v) =>
  timeLengthList.find((t) => t.value === v)?.label;

export const defaultErrorMsg = "An error happens, plase try it later!";

export const appLink = "https://app.tbook.com";

export const myLink = "https://my.tbook.com";

// export const colors = [
//   "#7EDDFF",
//   "#67EBD4",
//   "#A4F8B3",
//   "#DFFFAD",
//   "#FFFB94",
//   "#FFE68A",
//   "#FFC076",
//   "#E78E63",
//   "#DB4A49",
//   "#B93A84",
//   "#623A92",
//   "#394496",
//   "#4D79B6",
//   "#6AB3F7",
// ];

export const colors = [
  "#DB4A49",
  "#6AB3F7",
  "#FFC076",
  "#67EBD4",
  "#A4F8B3",
  "#394496",
  "#623A92",
  "#4D79B6",
  "#B93A84",
  "#7EDDFF",
  "#FFE68A",
  "#E78E63",
];
export const colorsBg = [
  "#DB4A49",
  "#6AB3F7",
  "#FFD021",
  "#67EBD4",
  "#A4F8B3",
  "#394496",
  "#623A92",
  "#4D79B6",
  "#B93A84",
  "#7EDDFF",
  "#FFAC4B",
  "#E78E63",
];
export const hexToRgba = (c, r) => {
  let color = c.slice(1); // 去掉'#'号
  let rgba = [
    parseInt("0x" + color.slice(0, 2)),
    parseInt("0x" + color.slice(2, 4)),
    parseInt("0x" + color.slice(4, 6)),
    r,
  ];
  return "rgba(" + rgba.toString() + ")";
};

export const themeList = [
  { label: "System", value: "system" },
  { label: "Dark", value: "dark" },
  { label: "Light", value: "light" },
];

export const sortList = [
  {
    label: "Recently Granted", // 默认选中
    value: 1,
    disabled: false,
  },
  {
    label: "Token Amount",
    value: 2,
    disabled: false,
  },
  {
    label: "Vested Token Amount",
    value: 3,
    disabled: false,
  },
  {
    label: "Recently Vested",
    value: 4,
    disabled: false,
  },
];
// recently vested  应该是最近成熟的，按最近发生成熟排序
// recently granted 应该是按授予日期排序，不涉及到状态, grantDate

export const getLoad = (list) => {
  console.log(list);
  return !list.filter((v) => !v).length === list.length;
};

export const defaultMaxAmount = 100000000;
