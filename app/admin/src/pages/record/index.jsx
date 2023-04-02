import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Form, Input, Select, DatePicker, InputNumber, Divider, message } from "antd";
import AppConfigProvider from "@/theme/AppConfigProvider";
import { useSelector, useDispatch } from "react-redux";
import { createTIP, createProject } from "@/api/incentive";
import { user } from "@tbook/store";
import { useCurrentProjectId, useCurrentProject, useProjectAudience } from "@tbook/hooks";
import _ from "lodash";
import { useResponsive } from "ahooks";
import { useNetwork } from "wagmi";
import { conf } from "@tbook/utils";
import { Back } from "@tbook/ui";

const { defaultErrorMsg, minZeroValidator, maxValidator, getDividePercent } = conf;
const { fetchUserInfo, setCurrentProjectId } = user;

const formItemCol = { labelCol: { span: 10 }, wrapperCol: { span: 14 } };

function Record() {
  const [form] = Form.useForm();
  const [formProject] = Form.useForm();
  const dispatch = useDispatch();
  const { chain } = useNetwork();

  const userStore = useSelector((state) => state.user);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [projectLoading, setProjectLoading] = useState(false);
  const [addedAudience, setAddedAudience] = useState([]);

  const navigate = useNavigate();
  const projectId = useCurrentProjectId();
  const project = useCurrentProject();
  // const projects = useProjects();
  // const [customizeOptions, setCustomizeOptions] = useState(null);
  const projectAudience = useProjectAudience();
  const { pc } = useResponsive();
  const mainNetwork = project?.chain || chain?.name || "Ethereum";
  // console.log("mainNetwork", mainNetwork, chain);

  const tokenTotalAmount = project?.tokenInfo?.tokenTotalAmount || 100000000;

  const options = [...projectAudience, ...addedAudience];

  function handleCreatePlan() {
    form
      .validateFields()
      .then((values) => {
        setConfirmLoading(true);

        values.incentivePlanAdminId = userStore?.user?.userId;
        values.projectId = projectId;

        if (addedAudience.length === 0) {
          values.labelList = "";
        } else {
          values.labelList = JSON.stringify(addedAudience.map((v) => v.label));
        }
        // console.log(values)
        // console.log(JSON.stringify(values))
        // return;
        createTIP(values).then((tip) => {
          setConfirmLoading(false);
          dispatch(fetchUserInfo(false));
          navigate(`/?tipId=${tip.incentivePlanId}`);
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
    if (projectInfo.success) {
      dispatch(setCurrentProjectId(projectInfo?.entity?.projectId));
      dispatch(fetchUserInfo(false));
      setProjectLoading(false);
      setFirstCreated(true);
    } else {
      setProjectLoading(false);
      message.error(projectInfo.message || defaultErrorMsg);
    }
  }

  return (
    <div className="w-full text-[#1E293B]">
      {!pc && <Back link="/tokenTable" />}
      <div className="pt-3 lg:pt-12">
        <div className="mb-6  lg:w-[600px] mx-4 lg:mx-auto lg:mb-10">
          <div className="flex flex-col justify-center flex-auto ml-[52px] lg:ml-0 lg:text-c">
            <h1 className="mb-1 font-bold text-c11 lg:text-cwh3 dark:text-white">New Grant Record</h1>
            <h2 className="text-c2 lg:text-cwh2 dark:text-b-8">Edit and manage the grant records.</h2>
          </div>
        </div>

        <div className="mb-6  lg:w-[600px] mx-4 lg:mx-auto lg:mb-0">
          <div className="overflow-hidden dark:bg-cw1 dark:lg:shadow-d3 rounded-xl ">
            <div className="relative px-3 py-4 lg:pb-0 lg:pt-6 lg:px-4">
              <Form
                {...(pc ? formItemCol : null)}
                form={form}
                labelAlign="left"
                colon={false}
                layout={pc ? "horizontal" : "vertical"}
                requiredMark={false}
              >
                <Form.Item
                  label="Holder Name"
                  name="holderName"
                  rules={[
                    {
                      required: true,
                      message: "Please input the Holder Name!",
                    },
                  ]}
                >
                  <Input placeholder="New Holder" />
                </Form.Item>

                <Form.Item
                  label="Token Allocation"
                  name="target"
                  rules={[
                    {
                      required: true,
                      message: "Please select the Target Audiende!",
                    },
                  ]}
                >
                  <Select allowClear optionLabelProp="label" placeholder="Employee" options={options} />
                </Form.Item>

                <Form.Item label="Grant Proportion">
                  <div className="grid grid-cols-2 gap-x-2">
                    <Form.Item
                      name="percentage"
                      rules={[
                        {
                          validator: minZeroValidator("percentage"),
                        },
                        {
                          validator: maxValidator(100, "percentage"),
                        },
                      ]}
                    >
                      <Input
                        step={1}
                        precision={0}
                        min={1}
                        max={100}
                        placeholder="Proportion"
                        type="number"
                        suffix="%"
                        onChange={(evt) => {
                          const val = Number(evt.target.value);
                          form.setFieldValue("tokenNum", (tokenTotalAmount * val) / 100);
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      name="tokenNum"
                      rules={[
                        {
                          required: true,
                          message: "Missing!",
                        },
                      ]}
                    >
                      <InputNumber
                        onChange={(val) => {
                          form.setFieldValue("percentage", getDividePercent(val, Number(tokenTotalAmount), 4));
                        }}
                        style={{ width: "100%" }}
                        step={1}
                        precision={0}
                        min={1}
                        placeholder="Token Amount"
                      />
                    </Form.Item>
                  </div>
                </Form.Item>
                <Form.Item
                  label="Investment"
                  name="tokenValue"
                  rules={[
                    {
                      validator: minZeroValidator("nvestment"),
                    },
                  ]}
                >
                  <Input placeholder="Not set yet" type="number" suffix="USD" min={0} />
                </Form.Item>
                <Form.Item
                  label="Grant Date"
                  name="grantDate"
                  rules={[
                    {
                      required: true,
                      message: "Please input the Grant Date!",
                    },
                  ]}
                >
                  <DatePicker className="w-full" />
                </Form.Item>

                <AppConfigProvider>
                  <div className="pt-3 lg:pb-6 lg:pt-2">
                    <div className="flex justify-center">
                      <Link to="/" className="hidden mr-10 lg:block">
                        <Button className="w-[120px]">Cancel</Button>
                      </Link>

                      <Button
                        onClick={handleCreatePlan}
                        type="primary"
                        className="w-[64vw] lg:w-[120px]"
                        loading={confirmLoading}
                      >
                        Create
                      </Button>
                    </div>
                  </div>
                </AppConfigProvider>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Record;
