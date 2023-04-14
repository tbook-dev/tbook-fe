export function filterReducer(filters, action) {
  const preVal = filters[action.type];
  const curlVal = action.payload.value;
  const isNegate = action.payload.isNegate || false;
  // console.log({preVal, curlVal})
  // if (action.type === "Plan") {
  //   if (preVal === curlVal) {
  //     // 点自己
  //     if (preVal === null) {
  //       return filters;
  //     } else {
  //       return { ...filters, [action.type]: null };
  //     }
  //   } else {
  //     // 点别的
  //     return { ...filters, [action.type]: curlVal };
  //   }
  // }
  // console.log({preVal, curlVal})
  let newKeyValues = {};
  switch (action.type) {
    case "sortBy": {
      newKeyValues.sortBy = action.payload.value;
      break;
    }
  }

  // return {
  //   ...filters,
  //   [action.type]: isNegate ? (preVal === curlVal ? null : curlVal) : curlVal,
  // };
  // console.log({ filters });
  return { ...filters, ...newKeyValues };
}

// 筛选框变成多选的
export const initialFilters = {
  status: [
    {
      label: "Token lockup",
      value: "Token lockup",
      disabled: true,
      key: "grantType",
    },
  ],
  plan: [
    {
      value: 22718960009,
      label: "name",
      key: "plan",
      disable: false,
    },
  ],
  vestingType: [],
  grantType: [],
  sortBy: 1,
};
