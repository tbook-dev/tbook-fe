import React, { useState } from "react";
import useCurrentProject from "@/hooks/useCurrentProject";
import { useResponsive } from "ahooks";
import ProjectDropDown from "./ProjectDropDown";
import H5Drawer from "./H5Drawer";
import WebDropDown from "./WebDropDown";
import clsx from "clsx";
import switchIcon from "@/images/icon/switch.svg";
import useProjects from "@/hooks/useProjects";
import { useSelector } from "react-redux";


export default function () {
  const currentProject = useCurrentProject();
  const { pc } = useResponsive();
  const [open, setOpen] = useState(false);
  const projects = useProjects();
  const showLessNav = useSelector((state) => state.user.showLessNav);

  return (
    <div className="relative inline-flex">
      {Array.isArray(projects) &&
        projects.length > 0 &&
        (showLessNav ? null : pc ? (
          <ProjectDropDown>
            {(setOpen, open) => (
              <div
                onClick={() => setOpen(true)}
                className={clsx(
                  "flex items-center cursor-pointer h-10 px-4 py-2 mr-4 rounded-lg dark:hover:bg-cw1 dark:hover:text-white hover:dark:shadow-d7 text-c1 dark:text-c-9 dark:shadow-d3",
                  open ? "bg-cw1 dark:text-white dark:shadow-d7" : ""
                )}
              >
                {currentProject?.projectName}
                <img src={switchIcon} className="ml-10" />
              </div>
            )}
          </ProjectDropDown>
        ) : (
          <div className="flex items-center h-10 px-4 py-2 rounded-lg text-c1 dark:text-c-9 lg:dark:shadow-d3">
            {currentProject?.projectName}
          </div>
        ))}
      {pc ? (
        <WebDropDown open={open} setOpen={setOpen} />
      ) : (
        <H5Drawer open={open} setOpen={setOpen} />
      )}
    </div>
  );
}
