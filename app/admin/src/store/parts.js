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
  return {
    ...filters,
    [action.type]: isNegate ? (preVal === curlVal ? null : curlVal) : curlVal,
  };
}

export const initialFilters = {
  Status: null,
  Plan: null,
  "Vesting Type": null,
  "Grant Type": null,
};
