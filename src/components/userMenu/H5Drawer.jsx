import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Drawer } from "antd";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { setCurrentProjectId } from "@/store/user";
import switchIcon from "@/images/icon/pop-switch.svg";
import useCurrentProjectId from "@/hooks/useCurrentProjectId";
import useProjects from "@/hooks/useProjects";
import useCurrentProject from "@/hooks/useCurrentProject";
import { PlusOutlined } from "@ant-design/icons";
import Avator from "./Avator";
import Info from "./Info";
import { useNavigate } from "react-router-dom";

export default function ({ open, setOpen }) {
  const [expanded, setExpaned] = useState(false);
  const dispatch = useDispatch();
  const currentProjectId = useCurrentProjectId();
  const projects = useProjects();
  const currentProject = useCurrentProject();
  const navigate = useNavigate();

  const hanldeChangeProject = function (project) {
    if (currentProjectId === project.projectId) return;
    dispatch(setCurrentProjectId(project.projectId));
    setOpen(false);
    navigate('/')
  };

  const Content = () => (
    <div className="lg:-mx-3 lg:w-[330px]">
      <Info />

      <div className="text-c9 text-center pt-[30px] pb-2.5">
        <p className="mb-2 text-black">Switch to another project</p>
        <div
          className="flex items-center justify-center font-medium text-[#333] cursor-pointer"
          onClick={(evt) => {
            evt?.stopPropagation();
            setExpaned(!expanded);
          }}
        >
          <span className="text-colorful1">{currentProject?.projectName}</span>
          <img
            className={clsx(
              "w-5 h-5 ml-1",
              expanded && "rotate-180"
            )}
            src={switchIcon}
          />
        </div>
      </div>

      {expanded && (
        <>
          <div className="max-h-[160px] text-[16px] leading-[24px] text-center overflow-y-auto">
            {projects.map((project) => {
              const isSelected = project.projectId === currentProjectId;
              return (
                <div
                  key={project.projectId}
                  onClick={() => hanldeChangeProject(project)}
                  className={clsx(
                    "px-6 py-2",
                    isSelected
                      ? "text-[#333] bg-[#f2f2f2] font-medium cursor-not-allowed"
                      : "hover:text-[#333] text-[#999] bg-white cursor-pointer"
                  )}
                >
                  <div className="flex items-center justify-center mr-2">
                    {project.projectName}
                  </div>
                </div>
              );
            })}
          </div>

          <Link to="/create/project" onClick={() => setOpen(false)}>
            <div className="px-3 text-center py-2 mt-4 mb-3 bg-[#f2f2f2] mx-2.5 rounded-lg text-[#999] hover:text-[#333] text-[16px] leading-[24px]">
              <PlusOutlined style={{ color: "#0049FF", marginRight: 8 }} />
              Incentivize a new project
            </div>
          </Link>
        </>
      )}
    </div>
  );

  return (
    <>
      <Avator
        id={1}
        setOpen={() => {
          setOpen(true);
          setExpaned(false);
        }}
        open={open}
      />
      <Drawer
        placement="bottom"
        closable={false}
        open={open}
        contentWrapperStyle={{
          height: expanded ? "405px" : "35vh",
          borderRadius: "24px 24px 0px 0px",
          overflow: "hidden",
        }}
        onClose={() => setOpen(false)}
      >
        <Content />
      </Drawer>
    </>
  );
}
