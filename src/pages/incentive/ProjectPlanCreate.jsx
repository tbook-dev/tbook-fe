import React, { useCallback, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Button,
  Space,
  Form,
  Input,
  Select,
  InputNumber,
  Statistic,
  Divider,
} from "antd";
import { CheckOutlined, DeleteOutlined } from "@ant-design/icons";
import { targetMap, chains } from "../../utils/const";
import { useSelector, useDispatch } from "react-redux";
import { createProject, createTIP } from "../../api/incentive";
import useCurrentProjectId from "@/hooks/useCurrentProjectId";
import useCurrentProject from "@/hooks/useCurrentProject";
import { fetchUserInfo, setCurrentProjectId } from "@/store/user";

import _ from "lodash";

function ProjectPlanCreate() {
  const [form] = Form.useForm();
  const [formProject] = Form.useForm();
  const [step, setStep] = useState(1);
  const [confirmLoading1, setConfirmLoading1] = useState(false);
  const [confirmLoading2, setConfirmLoading2] = useState(false);
  const userStore = useSelector((state) => state.user);
  const projectId = useCurrentProjectId();
  const project = useCurrentProject();
  const totalValue = Form.useWatch("totalTokenNum", form);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [customizeOptions, setCustomizeOptions] = useState(null);
  const inputRef = useRef(null);
  const preOptions = Object.entries(targetMap).map(([value, desc]) => ({
    label: desc,
    value: value,
  }));
  const options = customizeOptions
    ? [...preOptions, customizeOptions]
    : preOptions;

  const formatPercent = useCallback(() => {
    const res =
      _.divide(
        totalValue || 0,
        project?.tokenInfo?.tokenTotalAmount || Number.MAX_SAFE_INTEGER
      ) * 100;

    const r2 = _.round(res, 4);

    return r2;
  }, [project, totalValue]);

  async function handleCreateProject(values) {
    setConfirmLoading1(true);
    const projectInfo = await createProject(values);
    dispatch(setCurrentProjectId(projectInfo.projectId));
    dispatch(fetchUserInfo());
    setConfirmLoading1(false);
    setStep(2);
    formProject.setFieldValue("totalToken", projectInfo.tokenTotalAmount);
  }

  async function handleCreatePlan() {
    setConfirmLoading2(true);
    try {
      const values = await form.validateFields();
      values.incentivePlanAdminId = userStore?.user?.userId;
      values.projectId = projectId;
      if (values.target === "7") {
        values.customized_target_name = customizeOptions.label;
      }
      const tipRes = await createTIP(values);
      setConfirmLoading2(false);
      navigate(`/incentive/${tipRes.incentivePlanId}`);
    } catch (error) {
      setConfirmLoading2(false);
    }
  }

  return (
    <div className="lg:relative lg:flex">
      <div className="px-4 py-8 sm:px-6 lg:px-16 lg:grow lg:pr-8 xl:pr-16">
        <div className="lg:max-w-[500px]">
          <div className="mb-6 lg:mb-0">
            <header className="mb-6">
              <h1 className="mb-2 text-2xl font-bold md:text-3xl text-slate-800">
                New Token Incentive Plan
              </h1>
            </header>
            <div>
              <div className="mb-3 text-2xl font-bold text-[#1E293B]">
                Project
              </div>
              <Form
                form={formProject}
                layout="vertical"
                requiredMark={false}
                disabled={step === 2}
                onFinish={handleCreateProject}
                initialValues={{ chain: "Ethereum" }}
              >
                <Form.Item
                  label="Choose your preferred network or later"
                  name="chain"
                >
                  <Select>
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
                </Form.Item>
                <Form.Item
                  label="Project Name"
                  name="projectName"
                  rules={[
                    {
                      required: true,
                      message: "Please input the Total Token!",
                    },
                  ]}
                >
                  <Input placeholder="input your project name here" />
                </Form.Item>
                {step === 2 && (
                  <Form.Item
                    label="Total Token"
                    name="totalToken"
                    tooltip="This is the total of virtual tokens only used to anchor ratio before TGE to facilitate calculation and granting. It will be converted into the actual number of tokens after TGE."
                  >
                    <Input disabled />
                  </Form.Item>
                )}
                {step === 1 && (
                  <div className="flex justify-end">
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={confirmLoading1}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </Form>
            </div>
            <div>
              <div className="mb-3 text-2xl font-bold text-[#1E293B]">Plan</div>
              <Form
                form={form}
                layout="vertical"
                requiredMark={false}
                disabled={step === 1}
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
                  <Input placeholder="the name for your incentive plan, like GoPlusCommunityGrowth..." />
                </Form.Item>
                <Form.Item label="Token Options Pool Size">
                  <Space>
                    <Form.Item
                      name="totalTokenNum"
                      noStyle
                      rules={[
                        {
                          required: true,
                          message: "Please input the Token Options Pool Size!",
                        },
                      ]}
                    >
                      <InputNumber
                        placeholder="0"
                        min={0}
                        max={project?.tokenInfo?.surplusTokenNum}
                      />
                    </Form.Item>
                    {step === 2 && (
                      <div className="text-[#94A3B8] text-xs">
                        （{formatPercent()}% Total Token)
                      </div>
                    )}
                  </Space>

                  {step === 2 && (
                    <div className="text-[#94A3B8] text-xs mt-1 flex">
                      There are
                      <Statistic
                        value={project?.tokenInfo?.surplusTokenNum}
                        valueStyle={{
                          color: "#94A3B8",
                          fontSize: "12px",
                        }}
                      />
                      virtual tokens available
                    </div>
                  )}
                </Form.Item>
                <Form.Item
                  label="Target Audiende"
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
                    placeholder="mark a label for you incentive plan"
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
                                    const val = inputRef.current?.input?.value;

                                    val &&
                                      setCustomizeOptions({
                                        label: val,
                                        value: "7",
                                      });
                                    form.setFieldValue("target", "7");
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
                          {option.value == "7" && (
                            <Button
                              onClick={(evt) => {
                                evt.stopPropagation();
                                setCustomizeOptions(null);
                              }}
                              type="text"
                              className="mr-2"
                            >
                              <DeleteOutlined />
                            </Button>
                          )}
                        </div>
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                {step === 2 && (
                  <Form.Item
                    label="Plan Administrator"
                    name="incentivePlanAdminId"
                  >
                    <div className="w-[143px] flex items-center	flex-col">
                      <img
                        src={userStore?.user?.avatar}
                        className="w-[50px] h-[50px] block bg-white rounded-full"
                      />
                      <h3 className="text-sm font-semibold ">
                        {userStore?.user?.name}
                      </h3>
                      <p className="w-[82px] text-[#94A3B8] truncate text-ellipsis overflow-hidden">
                        {userStore?.user?.mainWallet}
                      </p>
                    </div>
                  </Form.Item>
                )}
              </Form>
            </div>
          </div>
        </div>

        <div className="max-w-[600px] pt-12">
          <hr className="my-6 border-t border-slate-200" />
          <div className="flex justify-around">
            <Link to="/incentive">
              <Button>Cancel</Button>
            </Link>

            {step === 2 && (
              <Button
                onClick={handleCreatePlan}
                type="primary"
                className="bg-[#6366F1]"
                loading={confirmLoading2}
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectPlanCreate;
