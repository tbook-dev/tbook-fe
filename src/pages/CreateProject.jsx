import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input } from "antd";
import { createProject } from "@/api/incentive";
import { fetchUserInfo, setCurrentProjectId } from "@/store/user";
import { useDispatch } from "react-redux";
import clsx from "clsx";
import Statistic from "@/components/local/Statistic";

import LayoutV2 from "./incentive/LayoutV2";
import { useHover } from "ahooks";
const { Search } = Input;

function CreateProject() {
  const cardRef = useRef(null);
  const isHoveringCard = useHover(cardRef);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [newProjectInfo, setNewProjectInfo] = useState(null);

  // const navigate = useNavigate();

  async function handleCreateProject(value) {
    const formatVal = value.trim();
    if (!formatVal) return;
    try {
      setLoading(true);
      const projectInfo = await createProject({ projectName: value });
      dispatch(setCurrentProjectId(projectInfo.projectId));
      dispatch(fetchUserInfo());
      setNewProjectInfo(projectInfo);
      // navigate("/incentive/create");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <LayoutV2>
      <main className="px-12 bg-white pb-9">
        <div className="pt-[115px] pb-[164px]">
          <h1 className="text-[#4F46E5] font-semibold text-[48px] mb-8 leading-[56px]">
            TBOOK is the blockchain incentive layer
          </h1>
          <h2 className="text-[#94A3B8] text-[24px] leading-[20px]">
            a comprehensive Token Incentive Platform for web3 projects.
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-x-12">
          <div className="border rounded-3xl h-[460px] px-12 py-20 flex flex-col justify-between">
            {newProjectInfo ? (
              <>
                <div className="w-full">
                  <h2 className="text-[36px] font-bold text-[#1E293B] mb-8">
                    Project registed!
                  </h2>
                  <Link to="/incentive/create">
                    <Button type="primary">START INCENTIVE {"  ->"}</Button>
                  </Link>
                </div>
                <div className="w-full">
                  <div className="flex justify-between items-center text-base  mb-[20px]">
                    <span className="text-[#94A3B8]">Project Name</span>
                    <span className="text-[#1E293B] font-semibold">
                      {newProjectInfo.projectName}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-base">
                    <span className="text-[#94A3B8]">Total Token</span>
                    <span className="text-[#1E293B] font-semibold">
                      <Statistic
                        value={newProjectInfo.latestValuation}
                        style={{ fontSize: 16 }}
                      />
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="w-full">
                  <h2 className="text-[36px] font-bold text-[#1E293B] mb-8">
                    Create a Project
                  </h2>
                  <p className="text-[18px] text-[#94A3B8]">
                    Fill in your project details and kickstart incentive plan on
                    TBOOK.
                  </p>
                </div>
                <div className="w-full">
                  <Search
                    placeholder="Project name..."
                    allowClear
                    enterButton="SUBMIT"
                    size="large"
                    onSearch={handleCreateProject}
                    loading={loading}
                  />
                </div>
              </>
            )}
          </div>
          <div
            className="border rounded-3xl h-[460px]  px-12 py-20"
            ref={cardRef}
          >
            {/* isHoveringCard */}
            <div className="relative h-full">
              <div
                className={clsx([
                  "absolute whitespace-nowrap transition-all",
                  isHoveringCard
                    ? "top-0	left-0"
                    : "top-1/2	left-1/2 translate-y-[-50%] translate-x-[-50%]",
                ])}
              >
                <h2 className="text-[36px] font-bold text-[#1E293B] mb-8">
                  Join an Existing Project
                </h2>
                <p className="text-[18px] text-[#94A3B8]">
                  Fill in the invitation code to join an existing project.
                </p>
              </div>
              {isHoveringCard && (
                <div className="absolute bottom-0 left-0 w-full">
                  <Search
                    placeholder="Invitation code..."
                    allowClear
                    enterButton="JOIN"
                    size="large"
                    disabled
                    // loading={loading}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </LayoutV2>
  );
}

export default CreateProject;
