import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "antd";
import { createProject } from "@/api/incentive";
import { fetchUserInfo, setCurrentProjectId } from "@/store/user";
import { useDispatch } from "react-redux";

import LayoutV2 from "./incentive/LayoutV2";
import { useHover } from "ahooks";
const { Search } = Input;

function CreateProject() {
  const cardRef = useRef(null);
  const isHoveringCard = useHover(cardRef);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();


  const navigate = useNavigate();

  async function handleCreateProject(value) {
    const formatVal = value.trim();
    if (!formatVal) return;
    try {
      setLoading(true);
      const projectInfo = await createProject({ projectName: value });
      dispatch(setCurrentProjectId(projectInfo.projectId));
      dispatch(fetchUserInfo());
      navigate("/incentive/create");
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
          <div className="border rounded-3xl h-[460px] pl-[48px] pr-[60px] flex flex-col justify-between items-center">
            <div className="mt-[78px]">
              <h2 className="text-[36px] font-bold mb-8">Create a Project</h2>
              <p>
                Fill in your project details and kickstart incentive plan on
                TBOOK.
              </p>
            </div>
            <div className="pb-[80px] w-full">
              <Search
                placeholder="Project name..."
                allowClear
                enterButton="SUBMIT"
                size="large"
                onSearch={handleCreateProject}
                loading={loading}
              />
            </div>
          </div>
          <div className="border rounded-3xl h-[460px]" ref={cardRef}>
            {isHoveringCard ? <div>1</div> : <div>2</div>}
          </div>
        </div>
      </main>
    </LayoutV2>
  );
}

export default CreateProject;
