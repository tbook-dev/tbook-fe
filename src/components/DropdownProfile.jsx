import React, { useState, useEffect } from "react";
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
import arrowIcon from "@/images/icon/arrow.svg";
import useCurrentProjectId from "@/hooks/useCurrentProjectId";
import useProjects from "@/hooks/useProjects";
import useCurrentProject from "@/hooks/useCurrentProject";
import { useResponsive } from "ahooks";
import { logout } from "@/utils/web3";
import { PlusOutlined } from "@ant-design/icons";

function DropdownProfile() {
  const userStore = useSelector((state) => state.user.user);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [expanded, setExpaned] = useState(false);
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

  async function handleLogout() {
    await logout();
    window.location.href = `${location.origin}/incentive`;
  }

  const Content = () => (
    <div className="-mx-6 lg:-mx-3 lg:w-[330px]">
      <div className="relative flex items-center justify-center w-full px-6 pb-2.5 shadow-c9">
        <div className="flex h-full">
          <NetWork />
          <span className="text-[18px] lg:leading-[20px] text-[#333]">
            {ensName || shortAddress(userStore?.mainWallet)}
          </span>
        </div>

        <div className="absolute top-[-3px] flex items-center justify-end right-6">
          <div
            onClick={handleLogout}
            className="cursor-pointer w-6 h-6 bg-[#ECF1FF] rounded-lg flex items-center justify-center"
          >
            <img src={closeIcon} />
          </div>
        </div>
      </div>

      <div className="text-[18px] leading-[24px] text-center pt-[30px] pb-2.5">
        <p className="text-[#333]">Switch to another project</p>
        <div
          className="flex items-center justify-center font-medium text-[#333] cursor-pointer"
          onClick={(evt) => {
            evt?.stopPropagation();
            setExpaned(!expanded);
          }}
        >
          {currentProject?.projectName}
          <img
            className={clsx(
              "w-3 h-3 ml-1 fill-current shrink-0",
              expanded && "rotate-180"
            )}
            src={arrowIcon}
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

          <Link to="/create/project" onClick={() => setDropdownOpen(false)}>
            <div className="px-3 text-center py-2 mt-4 mb-3 bg-[#f2f2f2] mx-2.5 rounded-lg text-[#999] hover:text-[#333] text-[16px] leading-[24px]">
              <PlusOutlined style={{ color: "#0049FF", marginRight: 8 }} />
              Incentivize a new project
            </div>
          </Link>
        </>
      )}
    </div>
  );
  const Avator = () => (
    <div
      className="flex items-center cursor-pointer"
      onClick={() => {
        setDropdownOpen(true);
        setExpaned(false);
      }}
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
          // open
          content={<Content />}
          placement="bottomRight"
          onOpenChange={(v) => setDropdownOpen(v)}
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
              height: expanded ? "405px" : "35vh",
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
