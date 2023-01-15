import React from "react";
import clsx from "clsx";

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
  1: "employee",
  2: "Adviser",
  3: "Developers",
  4: "Business development team",
  5: "investor",
  6: "Community growth",
  7: "customize",
};

/**
 * byDate,周期类型
 * byMilestone，里程碑
 */
export const grantType = [
  //    0: 'default/unknown',
  {
    name: "By Date",
    value: 1,
    disabled: false,
  },
  {
    name: "By Milestone",
    value: 2,
    disabled: true,
  },
];

export const dateFormat = "YYYY-MM-DD";

// grant状态：0-default/unknown，1-draft草稿，2-signing签约中，3-effective生效，4-completed完成，5-suspended暂停，6-terminated终止
export const grantStatusList = [
  {
    value: 0,
    label: "default/unknown",
    render: () => null,
  },
  {
    value: 1,
    label: "draft",
    render: (v = "",...props) => (
      <div
        className={clsx(
          "w-[105px] text-sm	text-[#7D7D7D] bg-[#FBFAFA] py-1 rounded-2xl text-center border border-[#7D7D7D]",
          v
        )}
        {...props}
      >
        draft
      </div>
    ),
  },
  {
    value: 2,
    label: "signing",
    isPersonalProperty: true,
    render: (v = "", ...props) => (
      <div
        className={clsx(
          "w-[105px] text-sm	text-[#D97706] bg-[#FEF3C7] py-1 rounded-2xl text-center",
          v
        )}
        {...props}
      >
        signing
      </div>
    ),
  },
  {
    value: 3,
    label: "effective",
    isPersonalProperty: true,
    render: (v = "", ...props) => (
      <div
        className={clsx(
          "w-[105px] text-sm	text-[#35AE86] bg-[#D1FAE5] py-1 rounded-2xl text-center",
          v
        )}
        {...props}
      >
        effective
      </div>
    ),
  },
  {
    value: 4,
    label: "completed",
    isPersonalProperty: true,
    render: (v = "", ...props) => (
      <div
        className={clsx(
          "w-[105px] text-sm	text-[#6366F1] bg-[#DADBFF] py-1 rounded-2xl text-center",
          v
        )}
        {...props}
      >
        completed
      </div>
    ),
  },
  {
    value: 5,
    label: "suspended",
    render: (v = "", ...props) => (
      <div
        className={clsx(
          "w-[105px] text-sm	text-[#D91F06] bg-[#FEC7C7] py-1 rounded-2xl text-center",
          v
        )}
        {...props}
      >
        suspended
      </div>
    ),
  },
  {
    value: 6,
    label: "terminated",
    render: (v = "", ...props) => (
      <div
        className={clsx(
          "w-[105px] text-sm	text-[#000000] bg-[#606060] py-1 rounded-2xl text-center",
          v
        )}
        {...props}
      >
        terminated
      </div>
    ),
  },
];

export const personalPropertyList = [
  {
    value: 2,
    label: "signing",
    colorCls: "text-[#D97706] border-[#F59E0B]",
    selectedCls: "bg-[#FEF3C7]",
    textColor: '#F59E0B'
  },
  {
    value: 3,
    label: "effective",
    colorCls: "text-[#35AE86] border-[#34D399]",
    selectedCls: "bg-[#D1FAE5]"
  },
  {
    value: 4,
    label: "completed",
    colorCls: "text-[#6366F1] border-[#6366F1]",
    selectedCls: "bg-[#DADBFF]"
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
