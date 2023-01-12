import { useSelector } from "react-redux";

export default function () {
  return useSelector((state) => {
    const userProjects = state.user.projects;
    const currentProjectId = state.user.currentProjectId;
    return (
      userProjects.find((project) => project.projectId === currentProjectId) ||
      {}
    );
  });
}
