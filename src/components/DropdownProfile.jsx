import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Popover, Drawer } from "antd";
import { useAccount, useEnsName } from "wagmi";
import { shortAddress } from "@/utils/const";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { setCurrentProjectId } from "@/store/user";
import NetWork from "./icon/NetWork";
import closeIcon from "@/images/icon/close.svg";
import useCurrentProjectId from "@/hooks/useCurrentProjectId";
import useProjects from "@/hooks/useProjects";
import useCurrentProject from "@/hooks/useCurrentProject";
import { useResponsive } from "ahooks";

function DropdownProfile({ align }) {
  const userStore = useSelector((state) => state.user.user);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const currentProjectId = useCurrentProjectId();

  const { address } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const projects = useProjects();
  const currentProject = useCurrentProject();
  const { pc } = useResponsive();

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  const hanldeChangeProject = function (project) {
    if (currentProjectId === project.projectId) return;
    dispatch(setCurrentProjectId(project.projectId));
    setDropdownOpen(false);
  };

  const Content = () => (
    <div className="-mx-6 lg:-mx-3">
      <div className="relative flex items-center justify-between lg:justify-end w-full px-6 pb-2.5 lg:border-b">
        <div className="flex">
          <NetWork />
          <span className="ml-1.5 mr-12 block text-[18px] lg:leading-[20px] text-[#333]">
            {ensName || shortAddress(userStore?.mainWallet)}
          </span>
        </div>

        <div
          onClick={() => setDropdownOpen(false)}
          className="cursor-pointer w-6 h-6 bg-[#ECF1FF] rounded-lg flex items-center justify-center"
        >
          <img src={closeIcon} />
        </div>
      </div>
      <div className="text-[18px] leading-[24px] text-center pt-[30px] pb-2.5">
        <p className="text-[#333]">Switch to another project</p>
        <p className="flex items-center justify-center text-[#0049FF]">
          {currentProject?.projectName}
          <svg
            className="w-3 h-3 ml-1 fill-current shrink-0 text-[#0049FF]"
            viewBox="0 0 12 12"
          >
            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
          </svg>
        </p>
      </div>
      <div className="divide-y max-h-[160px] text-center overflow-y-auto">
        {projects.map((project) => {
          const isSelected = project.projectId === currentProjectId;
          return (
            <div
              key={project.projectId}
              onClick={() => hanldeChangeProject(project)}
              className={clsx(
                "px-6 py-2",
                isSelected
                  ? "text-[#0049FF] bg-[#ECF1FF] cursor-not-allowed"
                  : "hover:font-semibold text-[#999] bg-white cursor-pointer"
              )}
            >
              <div className="flex items-center justify-center mr-2 lg:justify-start">
                {project.projectName}
              </div>
            </div>
          );
        })}
      </div>

      <Link to="/incentive/create" onClick={() => setDropdownOpen(false)}>
        <div className="px-3 border-t text-center py-2 text-[#999] text-[16px] leading-[24px]">
          New Incentive plan for a new project
        </div>
      </Link>
    </div>
  );
  const Avator = () => (
    <div
      className="flex items-center cursor-pointer"
      onClick={() => setDropdownOpen(true)}
    >
      <div
        className={clsx(
          "w-9 h-9 lg:w-8 lg:h-8 rounded-full  flex justify-center items-center mr-2 shadow-c9",
          dropdownOpen ? "bg-[#0049FF]" : "bg-[#e6e6e6]"
        )}
      >
        <img src={userStore?.avatar} className="lg:w-5 w-[25px]" />
      </div>
      <span
        className={clsx(
          "hidden lg:block text-[14px] leading-[22px]",
          clsx(dropdownOpen ? "text-[#0049FF]" : "text-[#333]")
        )}
      >
        {ensName || shortAddress(userStore?.mainWallet)}
      </span>
    </div>
  );
  return (
    <div className="relative inline-flex">
      <span className="text-[14px] leading-[32px] mr-4 text-[#666]">
        {currentProject?.projectName}
      </span>

      {pc ? (
        <Popover
          open={dropdownOpen}
          content={<Content />}
          placement="bottomRight"
        >
          <Avator />
        </Popover>
      ) : (
        <>
          <Avator />
          <Drawer
            placement="bottom"
            closable={false}
            open={dropdownOpen}
            contentWrapperStyle={{
              height: "50vh",
              borderRadius: "24px 24px 0px 0px",
              overflow: "hidden",
            }}
            onClose={() => setDropdownOpen(false)}
          >
            <Content />
          </Drawer>
        </>
      )}
    </div>
  );
}

export default DropdownProfile;
