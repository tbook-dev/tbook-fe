import React, { useCallback, useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Button,
  Form,
  Input,
  Select,
  InputNumber,
  Divider,
} from "antd";
import {
  CheckOutlined,
  //  DeleteOutlined
} from "@ant-design/icons";
import { targetMap, formatDollar } from "@/utils/const";
import { useSelector } from "react-redux";
import { createTIP } from "../../api/incentive";
import useCurrentProjectId from "@/hooks/useCurrentProjectId";
import useCurrentProject from "@/hooks/useCurrentProject";
import _ from "lodash";
import { useResponsive } from "ahooks";
import AvatarWallet from "./avatarWallet";

import planIcon from "@/images/incentive/plan.svg";
import cardbgpc from "@/images/incentive/cardbgpc.png";
import cardbg from "@/images/incentive/headers/plan.png";

const formItemCol = { labelCol: { span: 10 }, wrapperCol: { span: 14 } };

function PlanCreate() {
  const [form] = Form.useForm();
  const userStore = useSelector((state) => state.user);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const navigate = useNavigate();
  const projectId = useCurrentProjectId();
  const project = useCurrentProject();
  const [customizeOptions, setCustomizeOptions] = useState(null);
  const inputRef = useRef(null);
  const { pc } = useResponsive();
  const preOptions = Object.entries(targetMap).map(([value, desc]) => ({
    label: desc,
    value: value,
  }));
  const options = customizeOptions
    ? [...preOptions, customizeOptions]
    : preOptions;

  useEffect(() => {
    if (userStore?.user?.userId) {
      if (userStore?.projects?.length === 0) {
        navigate(`/create`, { replace: true });
      }
    }
  }, [userStore?.user?.userId]);



  function handleCreate() {
    setConfirmLoading(true);
    form
      .validateFields()
      .then((values) => {
        values.incentivePlanAdminId = userStore?.user?.userId;
        values.projectId = projectId;
        if (values.target === "7") {
          values.customized_target_name = customizeOptions.label;
        }

        createTIP(values).then((res) => {
          setConfirmLoading(false);
          navigate(`/incentive/${res.incentivePlanId}`);
        });
      })
      .catch((err) => {
        console.log(err, "error");
      });
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

          <div className="overflow-hidden bg-white rounded-xl">
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
                        message: "Please input the Token Options Pool Size!",
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
                    {formatDollar(project?.tokenInfo?.surplusTokenNum)} virtual
                    tokens available
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
                      onClick={handleCreate}
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
              onClick={handleCreate}
              type="primary"
              className="bg-[#6366F1] w-[64vw]"
              loading={confirmLoading}
            >
              Create
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlanCreate;
