import { useSelector } from "react-redux";
import useProjects from "./useProjects";
import { saveCurrentProjectId } from "@/api/ls";

export default function () {
  const id = useSelector((state) => state.user.currentProjectId);
  // console.log('id', id)
  const projects = useProjects();
  const isExisted = !!projects.find((v) => v.projectId === id);
//   console.log(isExisted, projects[projects.length - 1]?.projectId);
  if (!isExisted) {
    // 如果不存在，就取最后创建的一个project
    const pid = projects[projects.length - 1]?.projectId;
    pid &&  saveCurrentProjectId(pid);
    return pid;
  }
  return id;
}
