import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Input, Select } from "antd";
import { CheckCircleFilled, RightCircleOutlined } from "@ant-design/icons";
import { createProject } from "@/api/incentive";
import { fetchUserInfo, setCurrentProjectId } from "@/store/user";
import { useDispatch } from "react-redux";
import clsx from "clsx";
import Statistic from "@/components/local/Statistic";
import { chains } from "../utils/const";
import { useHover } from "ahooks";

const { Search } = Input;

function CreateProject() {
  const cardRef = useRef(null);
  const isHoveringCard = useHover(cardRef);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [newProjectInfo, setNewProjectInfo] = useState(null);
  const [chianVal, setChainVal] = useState("Ethereum");

  async function handleCreateProject(value) {
    const formatVal = value.trim();
    if (!formatVal) return;
    try {
      setLoading(true);
      const projectInfo = await createProject({
        projectName: value,
        chain: chianVal,
      });
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
              <div className="flex items-center w-full mb-8">
                <h2 className="text-[36px] font-bold text-[#1E293B]  mr-4">
                  Project registed!
                </h2>
                <CheckCircleFilled
                  style={{ color: "#6366F1", fontSize: "24px" }}
                />
              </div>
              <div className="w-full">
                <div className="flex justify-between items-center text-base  mb-[20px]">
                  <span className="text-[#94A3B8]">Project Name</span>
                  <span className="text-[#1E293B] font-semibold">
                    {newProjectInfo?.projectName}
                  </span>
                </div>
                <div className="flex justify-between items-center text-base  mb-[20px]">
                  <span className="text-[#94A3B8]">Main Network</span>
                  <span className="text-[#1E293B] font-semibold flex items-center">
                    {React.createElement(
                      chains.find((chian) => chian.name === chianVal).render,
                      {
                        className: "mr-2",
                      }
                    )}
                    {chains.find((chian) => chian.name === chianVal).fullName}
                  </span>
                </div>
                <div className="flex items-center justify-between text-base">
                  <span className="text-[#94A3B8]">Total Token</span>
                  <span className="text-[#1E293B] font-semibold">
                    <Statistic
                      value={newProjectInfo?.latestValuation}
                      style={{ fontSize: 16 }}
                    />
                  </span>
                </div>
                <div className="flex justify-end mt-6">
                  <Link to="/incentive/create">
                    <div
                      className="inline-block rounded-[34px] bg-[#6366F1] hover:opacity-90 font-bold text-white py-4 px-5"
                      type="primary"
                    >
                      <span className="mr-4">START INCENTIVE</span>
                      <RightCircleOutlined />
                    </div>
                  </Link>
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
              <div className="flex w-full">
                <div className="w-[220px] mr-2">
                  <Select
                    style={{ width: "100%" }}
                    size="large"
                    value={chianVal}
                    // optionLabelProp="label"
                    onSelect={(v) => {
                      setChainVal(v);
                    }}
                  >
                    {chains.map((v) => (
                      <Select.Option key={v.name} value={v.name} label={v.name}>
                        <div className="flex items-center">
                          {React.createElement(v.render, {
                            className: "mr-2",
                          })}
                          {v.fullName}
                        </div>
                      </Select.Option>
                    ))}
                  </Select>
                </div>
                <div className="flex-auto">
                  <Search
                    placeholder="Project name..."
                    allowClear
                    enterButton="SUBMIT"
                    size="large"
                    style={{ width: "100%" }}
                    onSearch={handleCreateProject}
                    loading={loading}
                  />
                </div>
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
  );
}

export default CreateProject;
