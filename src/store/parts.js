export function filterReducer(filters, action) {
  const preVal = filters[action.type];
  const curlVal = action.payload;

  if (action.type === "Plan") {
    if (preVal === curlVal) {
      // 点自己
      if (preVal === -1) {
        return filters;
      } else {
        return { ...filters, [action.type]: -1 };
      }
    } else {
      // 点别的
      return { ...filters, [action.type]: curlVal };
    }
  }

  return {
    ...filters,
    [action.type]: preVal === curlVal ? null : curlVal,
  };
}

export const initialFilters = {
  Status: null,
  Plan: -1,
  "Vesting Type": null,
  "Grant Type": null,
};
