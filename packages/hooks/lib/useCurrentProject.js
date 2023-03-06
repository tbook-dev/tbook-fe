import { useSelector } from "react-redux";
import useCurrentProjectId from "./useCurrentProjectId";

export default function () {
  const currentProjectId = useCurrentProjectId();
  return useSelector((state) => {
    const userProjects = state.user.projects;
    return (
      userProjects.find((project) => project.projectId === currentProjectId) ||
      {}
    );
  });
}
