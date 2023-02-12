import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Button,
  Form,
  Input,
  Select,
  Tooltip,
  InputNumber,
  Divider,
} from "antd";
import {
  CheckOutlined,
  InfoCircleOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { targetMap, chains, formatDollar } from "@/utils/const";
import { useSelector, useDispatch } from "react-redux";
import { createTIP, createProject } from "@/api/incentive";
import { fetchUserInfo, setCurrentProjectId } from "@/store/user";
import useCurrentProjectId from "@/hooks/useCurrentProjectId";
import useCurrentProject from "@/hooks/useCurrentProject";
import _ from "lodash";
import { useResponsive } from "ahooks";
import AvatarWallet from "./avatarWallet";
import useProjects from "@/hooks/useProjects";

import planIcon from "@/images/incentive/plan.svg";
import cardbgpc from "@/images/incentive/headers/planpc.png";
import cardbg from "@/images/incentive/headers/plan.png";

const formItemCol = { labelCol: { span: 10 }, wrapperCol: { span: 14 } };

function PlanCreate() {
  const [form] = Form.useForm();
  const [formProject] = Form.useForm();
  const dispatch = useDispatch();

  const userStore = useSelector((state) => state.user);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [projectLoading, setProjectLoading] = useState(false);
  const [firstCreated, setFirstCreated] = useState(false);

  const navigate = useNavigate();
  const projectId = useCurrentProjectId();
  const project = useCurrentProject();
  const projects = useProjects();
  const [customizeOptions, setCustomizeOptions] = useState(null);
  const inputRef = useRef(null);
  const { pc } = useResponsive();
  const mainNetwork = project?.chain;

  const preOptions = Object.entries(targetMap).map(([value, desc]) => ({
    label: desc,
    value: value,
  }));
  const options = customizeOptions
    ? [...preOptions, customizeOptions]
    : preOptions;

  console.log("project->", project);

  function handleCreatePlan() {
    form
      .validateFields()
      .then((values) => {
        setConfirmLoading(true);

        values.incentivePlanAdminId = userStore?.user?.userId;
        values.projectId = projectId;
        if (values.target === "7") {
          values.customized_target_name = customizeOptions.label;
        }

        createTIP(values).then((res) => {
          setConfirmLoading(false);
          navigate(`/incentive`);
        });
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function hanleCreateProject(values) {
    setProjectLoading(true);
    // 应该获取当前链，暂时不处理
    values.chain = mainNetwork;
    const projectInfo = await createProject(values);
    dispatch(setCurrentProjectId(projectInfo.projectId));
    dispatch(fetchUserInfo());
    setProjectLoading(false);
    setFirstCreated(true);
  }

  return (
    <div className="w-full lg:w-[600px] mx-auto text-[#1E293B]">
      <div className="pt-3 lg:pt-6">
        <div className="mb-6 lg:mb-0">
          <header className="mb-6">
            <img src={planIcon} className="hidden w-24 h-24 mx-auto lg:block" />
            <h1 className="mb-6 lg:mb-10 text-[28px] leading-[32px] text-center lg:text-[56px] lg:leading-[64px]">
              New Incentive Plan
            </h1>
          </header>

          {projects.length === 0 ? (
            <div className="lg:bg-white lg:shadow-c5 rounded-xl lg:px-4 lg:py-6">
              <div className="text-[#333] mb-3 text-[14px] leading-[24px] lg:mb-2 lg:text-[24px] lg:leading-[32px]">
                Label your project name to start incentive plan
              </div>

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
                      <div className="flex items-center" key={v.evmChainId}>
                        {React.createElement(v.render, {
                          className: "mr-1",
                        })}
                        <span className="text-[#333]">{v.name}</span>
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
                  <Button
                    loading={projectLoading}
                    type="primary"
                    htmlType="submit"
                    className="w-[64vw] lg:w-[132px] mx-auto"
                  >
                    Next
                  </Button>
                </div>
              </Form>
            </div>
          ) : (
            <>
              {firstCreated && (
                <div className="mb-6">
                  <h2 className="hidden mb-2 text-2xl text-[#333] lg:block">
                    Project
                  </h2>
                  <div className="bg-white divide-y rounded-xl shadow-c5">
                    <h2 className="block px-4 py-2 lg:hidden text-[20px] leading-[24px] text-[#333]">
                      Project
                    </h2>
                    <div className="flex px-4 py-2 text-[14px] leading-[18px] lg:leading-[22px]">
                      <span className="flex-[10] text-[#666]">
                        Project Name
                      </span>
                      <span className="flex-[14] flex justify-end lg:justify-between">
                        <span className="mr-2">
                          {chains.map((v) => {
                            // 目前应该监听网络环境
                            if (project?.chain !== v.name) return null;
                            return (
                              <div
                                className="flex items-center"
                                key={v.evmChainId}
                              >
                                {React.createElement(v.render, {
                                  className: "mr-1",
                                })}
                                <span className="text-[#333]">
                                  {project?.projectName}
                                </span>
                              </div>
                            );
                          })}
                        </span>
                        <FormOutlined className="cursor-pointer" />
                      </span>
                    </div>
                    <div className="flex px-4 py-2 text-[14px] leading-[18px] lg:leading-[22px]">
                      <span className="flex-[10] text-[#666]">Total Token</span>
                      <span className="flex-[14] flex justify-end lg:justify-between">
                        <span className="mr-2">
                          {formatDollar(project?.tokenTotalAmount)} Token
                        </span>
                        <Tooltip title="This is the total of virtual tokens only used to anchor ratio before TGE to facilitate calculation and granting. It will be converted into the actual number of tokens after TGE.">
                          <InfoCircleOutlined className="cursor-pointer" />
                        </Tooltip>
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="overflow-hidden bg-white rounded-xl shadow-c5" id="plan">
                <div className="h-10 lg:h-[67px] relative overflow-hidden">
                  <img
                    src={pc ? cardbgpc : cardbg}
                    className="absolute top-0 left-0 w-full"
                  />
                </div>

                <div className="relative px-2 pt-2 pb-4 lg:pb-0 lg:pt-6 lg:px-4">
                  <Form
                    {...(pc ? formItemCol : null)}
                    form={form}
                    labelAlign="left"
                    colon={false}
                    layout={pc ? "horizontal" : "vertical"}
                    requiredMark={false}
                  >
                    <Form.Item
                      label="Plan Name"
                      name="incentivePlanName"
                      rules={[
                        {
                          required: true,
                          message: "Please input the Plan Name!",
                        },
                      ]}
                    >
                      <Input placeholder="Ethereum" />
                    </Form.Item>

                    <Form.Item
                      label="Label Your Target Audience"
                      name="target"
                      rules={[
                        {
                          required: true,
                          message: "Please select the Target Audiende!",
                        },
                      ]}
                    >
                      <Select
                        allowClear
                        optionLabelProp="label"
                        placeholder="Employee"
                        // options={preOptions}
                        dropdownRender={(menu) => {
                          return (
                            <>
                              {menu}
                              {!customizeOptions && (
                                <>
                                  <Divider style={{ margin: "8px 0" }} />
                                  <div className="flex items-center px-2 pb-1">
                                    <Input
                                      placeholder="Editable..."
                                      maxLength={30}
                                      ref={inputRef}
                                      style={{ marginRight: 8 }}
                                    />
                                    <Button
                                      type="text"
                                      onClick={async () => {
                                        const val =
                                          inputRef.current?.input?.value;

                                        val &&
                                          setCustomizeOptions({
                                            label: val,
                                            value: "7",
                                          });
                                      }}
                                      icon={<CheckOutlined />}
                                    />
                                  </div>
                                </>
                              )}
                            </>
                          );
                        }}
                      >
                        {options.map((option) => (
                          <Select.Option
                            label={option.label}
                            value={option.value}
                            key={option.value}
                          >
                            <div className="flex justify-between">
                              <span>{option.label}</span>
                            </div>
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>

                    <Form.Item label="Token Options Pool Size">
                      <Form.Item
                        name="totalTokenNum"
                        noStyle
                        rules={[
                          {
                            required: true,
                            message:
                              "Please input the Token Options Pool Size!",
                          },
                        ]}
                      >
                        <InputNumber
                          placeholder="Editable"
                          min={0}
                          max={project?.tokenInfo?.surplusTokenNum}
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                      <div className="text-[#94A3B8] text-xs mt-1 flex">
                        There are{" "}
                        {formatDollar(project?.tokenInfo?.surplusTokenNum)}{" "}
                        virtual tokens available
                      </div>
                    </Form.Item>

                    <Form.Item
                      label="Plan Administrator"
                      name="incentivePlanAdminId"
                    >
                      <AvatarWallet
                        avatar={userStore?.user?.avatar}
                        name={userStore?.user?.name}
                        mainWallet={userStore?.user?.mainWallet}
                      />
                    </Form.Item>

                    <div className="hidden pt-2 pb-6 lg:block">
                      <div className="flex justify-center">
                        <Link to="/incentive" className="hidden mr-10 lg:block">
                          <Button>Cancel</Button>
                        </Link>

                        <Button
                          onClick={handleCreatePlan}
                          type="primary"
                          className="bg-[#6366F1]"
                          loading={confirmLoading}
                        >
                          Create
                        </Button>
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
              <div className="flex justify-center py-5 lg:hidden">
                <Button
                  onClick={handleCreatePlan}
                  type="primary"
                  className="bg-[#6366F1] w-[64vw]"
                  loading={confirmLoading}
                >
                  Create
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default PlanCreate;
