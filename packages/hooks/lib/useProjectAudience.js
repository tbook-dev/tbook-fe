import useCurrentProject from "./useCurrentProject";

// 值从1开始；
export default function () {
  // console.log('id', id)
  const { targetList = [], customizedTargetList = [] } = useCurrentProject();
  const options = [...targetList, ...customizedTargetList].map(
    (label, idx) => ({
      label,
      value: idx + 1,
    })
  );

  return options;
}
