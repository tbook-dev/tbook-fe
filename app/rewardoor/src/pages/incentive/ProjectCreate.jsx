import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import AppConfigProvider from "@/theme/LightProvider";
import { useDispatch } from "react-redux";
import { createProject } from "@/api/incentive";
import { user } from "@tbook/store";
import { useCurrentProject } from "@tbook/hooks";
import _ from "lodash";
import { useResponsive } from "ahooks";
import { Icon } from "@tbook/ui";
import planIcon from "@tbook/share/images/incentive/plan.svg";
import { useNetwork } from "wagmi";
import Banner from "../component/banner";
import { conf } from "@tbook/utils";
import { Back } from "@tbook/ui";

const { defaultErrorMsg, chains } = conf;
const { setAuthUser, setUser, setProjects, setCurrentProjectId, getUserInfo } = user;
const { NetWork } = Icon;

const formItemCol = { labelCol: { span: 10 }, wrapperCol: { span: 14 } };

function PlanCreate() {
  const [formProject] = Form.useForm();
  const dispatch = useDispatch();
  const { chain } = useNetwork();

  const [projectLoading, setProjectLoading] = useState(false);

  const navigate = useNavigate();
  const project = useCurrentProject();
  // const projects = useProjects();
  // const [customizeOptions, setCustomizeOptions] = useState(null);
  const { pc } = useResponsive();
  const mainNetwork = project?.chain || chain?.name || "Ethereum";
  // console.log("mainNetwork", mainNetwork, chain);

  async function hanleCreateProject(values) {
    setProjectLoading(true);
    // 应该获取当前链，暂时不处理
    values.chain = mainNetwork;

    const projectInfo = await createProject(values);
    if (projectInfo.success) {
      dispatch(setCurrentProjectId(projectInfo?.entity?.projectId));
      //   fetchUserInfo(false);
      setProjectLoading(false);
      getUserInfo()
        .then((response) => {
          // console.log("response", response);
          dispatch(setAuthUser(true));
          dispatch(setUser(response?.user || {}));
          dispatch(setProjects(response?.projects || []));
          navigate("/");
        })
        .catch((err) => {
          dispatch(setAuthUser(false));
          console.log(err, "xxx");
        });
    } else {
      setProjectLoading(false);
      message.error(projectInfo.message || defaultErrorMsg);
    }
  }

  return (
    <div className="w-full text-[#1E293B]">
      {!pc && <Back />}
      <div className="pt-3 lg:pt-12">
        <Banner
          img={planIcon}
          title="New Incentive Plan"
          description={"Label your project name to start incentive plan"}
          className="lg:w-[640px] mx-auto mb-6 lg:mb-12"
        />

        <div className="mb-6  lg:w-[600px] mx-4 lg:mx-auto lg:mb-0">
          <div className="px-3 pt-4 pb-8 lg:bg-white lg:shadow-c5 bg-cw1 dark:lg:shadow-d3 rounded-xl lg:px-4 lg:py-6">
            <Form
              {...(pc ? formItemCol : null)}
              form={formProject}
              labelAlign="left"
              colon={false}
              layout={pc ? "horizontal" : "vertical"}
              requiredMark={false}
              onFinish={hanleCreateProject}
            >
              <Form.Item label="Network">
                {chains.map((v) => {
                  // 目前应该监听网络环境
                  if (mainNetwork !== v.name) return null;
                  return (
                    <div
                      className="flex items-center justify-center h-10 rounded-md bg-b-1 lg:bg-transparent lg:justify-start"
                      key={v.evmChainId}
                    >
                      <NetWork id={v.evmChainId} className="mr-1" />
                      <span className="text-black text-c9">{v.name}</span>
                    </div>
                  );
                })}
              </Form.Item>

              <Form.Item
                label="Project Name"
                name="projectName"
                rules={[
                  {
                    required: true,
                    message: "Please input the project name!",
                  },
                ]}
              >
                <Input placeholder="Editable" />
              </Form.Item>

              <div className="flex justify-center pt-2">
                <AppConfigProvider>
                  <Button className="!hidden lg:!block w-[120px] mx-auto" onClick={() => navigate(-1)}>
                    cancel
                  </Button>
                  <Button
                    loading={projectLoading}
                    type="primary"
                    htmlType="submit"
                    className="w-[64vw] lg:w-[120px] mx-auto"
                  >
                    Next
                  </Button>
                </AppConfigProvider>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlanCreate;
