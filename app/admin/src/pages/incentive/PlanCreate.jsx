import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Form, Input, Select, Tooltip, InputNumber, Divider, message } from "antd";
import AppConfigProvider from "@/theme/AppConfigProvider";
import { CheckOutlined, InfoCircleOutlined, FormOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { createTIP, createProject } from "@/api/incentive";
import { user } from "@tbook/store";
import { useCurrentProjectId, useCurrentProject, useProjectAudience } from "@tbook/hooks";
import _ from "lodash";
import { useResponsive } from "ahooks";
import AvatarWallet from "./avatarWallet";
import { Icon } from "@tbook/ui";
import planIcon from "@tbook/share/images/incentive/plan.svg";
import { useParams } from "react-router-dom";
import { useNetwork } from "wagmi";
import Banner from "../component/banner";
import { conf } from "@tbook/utils";

const { defaultErrorMsg, chains, formatDollar } = conf;
const { fetchUserInfo, setCurrentProjectId } = user;
const { NetWork } = Icon;

const formItemCol = { labelCol: { span: 10 }, wrapperCol: { span: 14 } };

function PlanCreate() {
  const [form] = Form.useForm();
  const [formProject] = Form.useForm();
  const dispatch = useDispatch();
  const { chain } = useNetwork();

  const userStore = useSelector((state) => state.user);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [projectLoading, setProjectLoading] = useState(false);
  const [firstCreated, setFirstCreated] = useState(false);
  const [selectOpen, setSelectOpen] = useState(false);
  const [addedAudience, setAddedAudience] = useState([]);

  const navigate = useNavigate();
  const projectId = useCurrentProjectId();
  const project = useCurrentProject();
  // const projects = useProjects();
  // const [customizeOptions, setCustomizeOptions] = useState(null);
  const projectAudience = useProjectAudience();
  const [inputVal, setInputVal] = useState("");
  const { pc } = useResponsive();
  const mainNetwork = project?.chain || chain?.name || "Ethereum";
  // console.log("mainNetwork", mainNetwork, chain);

  const { pageType } = useParams();

  const options = [...projectAudience, ...addedAudience];

  // console.log("project->", project);

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
      <div className="pt-3 lg:pt-12">
        <Banner
          img={planIcon}
          title="New Incentive Plan"
          description={
            pageType === "project" && !firstCreated
              ? "Label your project name to start incentive plan"
              : "A few steps to complete your plan"
          }
          className="lg:w-[640px] mx-auto mb-6 lg:mb-12"
        />

        <div className="mb-6  lg:w-[600px] mx-4 lg:mx-auto lg:mb-0">
          {pageType === "project" && !firstCreated ? (
            <div className="px-3 pt-4 pb-8 lg:bg-white lg:shadow-c5 dark:bg-cw1 dark:lg:shadow-d3 rounded-xl lg:px-4 lg:py-6">
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
          ) : (
            <>
              {firstCreated && (
                <div className="mb-6 rounded-md lg:py-4 lg:mb-12 lg:rounded-lg dark:bg-black shadow-d3">
                  <div className="flex items-center h-10 px-6 border-b border-b-1 text-c1">
                    <span className="flex-[10] text-b-8">Project Name</span>
                    <span className="flex-[14] text-white flex justify-end lg:justify-between">
                      <span className="mr-2">
                        {chains.map((v) => {
                          // 目前应该监听网络环境
                          if (project?.chain !== v.name) return null;
                          return (
                            <div className="flex items-center" key={v.evmChainId}>
                              <NetWork id={v.evmChainId} className="mr-1" />
                              {project?.projectName}
                            </div>
                          );
                        })}
                      </span>
                      <FormOutlined className="cursor-pointer" />
                    </span>
                  </div>
                  <div className="flex items-center h-10 px-6 text-c1">
                    <span className="flex-[10] text-b-8">Total Token</span>
                    <span className="flex-[14] text-white flex justify-end lg:justify-between">
                      <span className="mr-2">{formatDollar(project?.tokenTotalAmount)} Token</span>
                      <Tooltip title="This is the total of virtual tokens only used to anchor ratio before TGE to facilitate calculation and granting. It will be converted into the actual number of tokens after TGE.">
                        <InfoCircleOutlined className="cursor-pointer" />
                      </Tooltip>
                    </span>
                  </div>
                </div>
              )}

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
                      label="Plan Name"
                      name="incentivePlanName"
                      rules={[
                        {
                          required: true,
                          message: "Please input the Plan Name!",
                        },
                      ]}
                    >
                      <Input placeholder="the name for your incentive plan, like GoPlus..." />
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
                        open={selectOpen}
                        onDropdownVisibleChange={(visible) => setSelectOpen(visible)}
                        dropdownRender={(menu) => {
                          return (
                            <>
                              {menu}
                              <Divider style={{ margin: "8px 0" }} />
                              <div className="flex items-center px-2 pb-1">
                                <Input
                                  placeholder="Editable..."
                                  maxLength={30}
                                  value={inputVal}
                                  onChange={(evt) => setInputVal(evt.target.value)}
                                  style={{ marginRight: 8 }}
                                />
                                <Button
                                  type="text"
                                  onClick={async () => {
                                    setInputVal("");
                                    const val = options.length + 1;
                                    setAddedAudience([...addedAudience, { label: inputVal, value: val }]);
                                    form.setFieldValue("target", val);
                                    setSelectOpen(false);
                                  }}
                                  icon={<CheckOutlined />}
                                />
                              </div>
                            </>
                          );
                        }}
                      >
                        {options.map((option) => (
                          <Select.Option label={option.label} value={option.value} key={option.value}>
                            <div className="flex justify-between">
                              <span>{option.label}</span>
                            </div>
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>

                    <Form.Item
                      label="Token Options Pool Size"
                      name="totalTokenNum"
                      tooltip={{
                        title: ` There are ${formatDollar(
                          project?.tokenInfo?.surplusTokenNum
                        )} virtual tokens available`,
                        icon: <InfoCircleOutlined />,
                      }}
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

                    <Form.Item label="Plan Administrator" name="incentivePlanAdminId">
                      <AvatarWallet
                        avatar={userStore?.user?.avatar}
                        name={userStore?.user?.name}
                        mainWallet={userStore?.user?.mainWallet}
                      />
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
              {/* <div className="flex justify-center py-5 lg:hidden">
                <Button
                  onClick={handleCreatePlan}
                  type="primary"
                  className="bg-[#6366F1] w-[64vw]"
                  loading={confirmLoading}
                >
                  Create
                </Button>
              </div> */}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default PlanCreate;
