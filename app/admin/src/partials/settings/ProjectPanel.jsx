import React, { useState, useEffect } from "react";
import { Typography, message } from "antd";
import Image from "../../images/user-avatar-80.png";
import { updateProjectName, updateProjectValuation } from "../../api/incentive";
import useCurrentProject from "@/hooks/useCurrentProject";

const { Paragraph } = Typography;

function AccountPanel() {
  const [name, setName] = useState("");
  const [latestValuation, setLatestValuation] = useState("");
  const project = useCurrentProject();

  function reset() {
    setName(project?.projectName);
    setLatestValuation(project?.latestValuation);
  }

  function handleUpdateProject() {
    Promise.all([
      updateProjectName(project.projectId, {
        projectId: project.projectId,
        name: name,
      }),
      updateProjectValuation(project.projectId, {
        projectId: project.projectId,
        valuation: latestValuation,
      }),
    ]).then((res) => {
      message.success("updated!");
      console.log(res);
    });
  }

  useEffect(() => {
    setName(project?.projectName);
    setLatestValuation(project?.latestValuation);
  }, [project]);
  return (
    <div className="grow">
      {/* Panel body */}
      <div className="p-6 space-y-6">
        {/* Picture */}
        <section>
          <h2 className="mb-5 font-bold text-1xl text-slate-800">My Project</h2>
          <div className="flex items-center">
            <div className="mr-4">
              <img
                className="w-20 h-20 rounded-full"
                src={Image}
                width="80"
                height="80"
                alt="User upload"
              />
            </div>
            <button className="text-white bg-indigo-500 btn-sm hover:bg-indigo-600">
              Change
            </button>
          </div>
        </section>

        {/* Password */}
        <section>
          <div>
            <div className="flex flex-start items-center mb-[15px]">
              <div className="text-[#475569] text-xs w-[140px] mr-[100px]">
                Project Name
              </div>
              <div className="text-[#1E293B] text-base	font-semibold">
                <Paragraph
                  editable={{ text: name, onChange: setName }}
                  style={{ marginBottom: 0 }}
                >
                  {name}
                </Paragraph>
              </div>
            </div>
            <div className="flex flex-start items-center mb-[15px]">
              <div className="text-[#475569] text-xs w-[140px] mr-[100px]">
                Total Token Amount
              </div>
              <div className="text-[#1E293B] text-base	font-semibold">
                {project?.tokenTotalAmount}
              </div>
            </div>
            <div className="flex flex-start items-center mb-[15px]">
              <div className="text-[#475569] text-xs w-[140px] mr-[100px]">
                Latest Valuation
              </div>
              <div className="text-[#1E293B] text-base	font-semibold">
                <Paragraph
                  editable={{
                    text: latestValuation,
                    onChange: setLatestValuation,
                  }}
                  style={{ marginBottom: 0 }}
                >
                  {latestValuation}
                </Paragraph>
              </div>
            </div>
            <div className="flex items-center flex-start">
              <div className="text-[#475569] text-xs w-[140px] mr-[100px]">
                Token Contract Address
              </div>
              <div className="text-[#1E293B] text-base	font-semibold">
                {project?.tokenContractAddress || "not set"}
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* Panel footer */}
      <footer>
        <div className="flex flex-col px-6 py-5 border-t border-slate-200">
          <div className="flex self-end">
            <button
              onClick={reset}
              className="btn border-slate-200 hover:border-slate-300 text-slate-600"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdateProject}
              className="ml-3 text-white bg-indigo-500 btn hover:bg-indigo-600"
            >
              Save Changes
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AccountPanel;
