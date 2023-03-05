import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Drawer } from "antd";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { user } from "@tbook/store";
import switchIcon from "@tbook/share/images/icon/switch-plan.png";
import { useCurrentProjectId, useProjects ,useCurrentProject } from "@tbook/hooks";
import { PlusOutlined } from "@ant-design/icons";
import Avator from "./Avator";
import Info from "./Info";
import { useNavigate } from "react-router-dom";

const { setCurrentProjectId } = user;
export default function ({ open, setOpen }) {
  const [expanded, setExpaned] = useState(false);
  const dispatch = useDispatch();
  const currentProjectId = useCurrentProjectId();
  const projects = useProjects();
  const currentProject = useCurrentProject();
  const navigate = useNavigate();
  const [menuStep, setStep] = useState(0);

  const hanldeChangeProject = function (project) {
    if (currentProjectId === project.projectId) return;
    dispatch(setCurrentProjectId(project.projectId));
    setOpen(false);
    setStep(0);
    navigate("/");
  };

  const InitMenu = () => (
    <div className="mx-6 my-6">
      <Info />

      <div className="text-c9 text-center pt-[30px] pb-2.5">
        <p className="mb-2 text-black">Switch to another project</p>
        <div
          className="flex items-center justify-center font-medium text-[#333] cursor-pointer"
          onClick={(evt) => {
            evt?.stopPropagation();
            setExpaned(true);
            setStep(1);
          }}
        >
          <span className="font-medium text-black">{currentProject?.projectName}</span>
          <img className={clsx("w-9 h-9 ml-1", expanded && "rotate-180")} src={switchIcon} />
        </div>
      </div>
    </div>
  );

  const SwitchProject = () => (
    <>
      <h2 className="text-black text-c7 h-[86px] leading-[86px] text-center">Switch to another project</h2>
      <div className="max-h-[160px] text-[16px] leading-[24px] text-center overflow-y-auto">
        {projects.map((project) => {
          const isSelected = project.projectId === currentProjectId;
          return (
            <div
              key={project.projectId}
              onClick={() => hanldeChangeProject(project)}
              className={clsx(
                "px-6 h-10 flex items-center justify-center",
                isSelected
                  ? "text-black bg-cw1 font-medium cursor-not-allowed"
                  : "text-[#666] bg-white cursor-pointer"
              )}
            >
              {project.projectName}
            </div>
          );
        })}
      </div>

      <Link to="/create/project" onClick={() => setOpen(false)}>
        <div className="px-3 py-2 mt-4 mb-3 text-center text-c7 text-[#666]">
          <PlusOutlined style={{ color: "#69D0E5", marginRight: 8 }} />
          Incentivize a new project
        </div>
      </Link>
    </>
  );

  const Content = () => (
    <div className="-mx-6 -my-6">
      {menuStep === 0 && <InitMenu />}
      {menuStep === 1 && <SwitchProject />}
    </div>
  );

  return (
    <>
      <Avator
        id={1}
        setOpen={() => {
          setOpen(true);
          setExpaned(false);
          setStep(0);
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
        onClose={() => {
          setOpen(false);
        }}
      >
        <Content />
      </Drawer>
    </>
  );
}
