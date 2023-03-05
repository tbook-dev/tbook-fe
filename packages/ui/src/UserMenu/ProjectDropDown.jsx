import React, { useState } from "react";
import { Popover } from "antd";
import clsx from "clsx";
import { useProjects , useCurrentProject } from "@tbook/hooks";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { setCurrentProjectId } from "@/store/user";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


export default function ({ children }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const projects = useProjects();
  const currentProject = useCurrentProject();
  const navigate = useNavigate();

  const hanldeChangeProject = function (projectId) {
    if (currentProject.projectId === projectId) return;
    dispatch(setCurrentProjectId(projectId));
    setOpen(false);
    navigate('/')
  };

  const Content = () => (
    <div className="-mx-6 lg:-mx-3">
      <div className="pb-5 pt-3 w-[306px]">
        <h2 className="px-6 pt-3 pb-6 font-medium text-center text-c7">Switch to another project</h2>
        <div className="max-h-[400px] overflow-y-auto">
          {projects.map((project) => {
            return (
              <div
                key={project.projectId}
                className={clsx(
                  project.projectId === currentProject.projectId
                    ? "bg-cw1  text-black"
                    : "text-c-9",
                  "px-6 flex items-center h-10 text-c6 font-medium cursor-pointer dark:hover:text-black dark:hover:bg-cw1 dark:hover:opacity-60"
                )}
                onClick={() => {
                  hanldeChangeProject(project.projectId);
                }}
              >
                {project.projectName}
              </div>
            );
          })}
        </div>

        <Link to="/create/project" onClick={() => setOpen(false)}>
          <div className="flex items-center justify-center px-6 font-medium lg:h-10 text-c2 text-c-9">
            <PlusOutlined style={{ color: "#69D0E5", marginRight: 8 }} />
            New Project
          </div>
        </Link>
      </div>
    </div>
  );

  return (
    <Popover
      open={open}
      trigger="click"
      content={<Content />}
      placement="bottomRight"
      onOpenChange={(v) => {
        setOpen(v);
      }}
    >
      {children(setOpen, open)}
    </Popover>
  );
}
