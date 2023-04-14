export function filterReducer(filters, action) {
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
    case "clearAll": {
      newKeyValues = initialFilters;
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
