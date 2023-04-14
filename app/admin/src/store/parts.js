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
  console.log({ action });
  let newKeyValues = {};
  switch (action.type) {
    case "sortBy": {
      newKeyValues.sortBy = action.payload.value;
      break;
    }
    case "plan": {
      newKeyValues.plan = action.payload.value;
      break;
    }
    case "status": {
      newKeyValues.status = action.payload.value;
      break;
    }
    case "vestingType": {
      newKeyValues.vestingType = action.payload.value;
      break;
    }
    case "grantType": {
      newKeyValues.grantType = action.payload.value;
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
  status: [],
  plan: [],
  vestingType: [],
  grantType: [],
  sortBy: 1,
};
