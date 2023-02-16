import useProjects from "./useProjects";
import { targetMap } from "@/utils/const";

// targetMap 值最大开始, 初始值为7；
export default function () {
  // console.log('id', id)
  const projects = useProjects();
  const preOptions = Object.entries(targetMap).map(([value, desc]) => ({
    label: desc,
    value: value,
  }));

  const coustom = (projects?.targetList || []).map((v, idx) => {
    return { label: v, value: `${7 + idx}` };
  });

  return [...preOptions, ...coustom];
}
