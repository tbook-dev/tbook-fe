import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Form, Input, Select, InputNumber, Divider } from "antd";
import AppConfigProvider from "@/theme/LightProvider";
import { CheckOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { createTIP } from "@/api/incentive";
import { user } from "@tbook/store";
import { useCurrentProjectId, useCurrentProject, useProjectAudience } from "@tbook/hooks";
import _ from "lodash";
import { useResponsive } from "ahooks";
import AvatarWallet from "./avatarWallet";
import planIcon from "@tbook/share/images/incentive/plan.svg";
import Banner from "../component/banner";
import { conf } from "@tbook/utils";
import { Back } from "@tbook/ui";

const { formatDollar } = conf;
const { fetchUserInfo } = user;

const formItemCol = { labelCol: { span: 10 }, wrapperCol: { span: 14 } };

function PlanCreate() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const userStore = useSelector((state) => state.user);
  const [confirmLoading, setConfirmLoading] = useState(false);
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
  // console.log("mainNetwork", mainNetwork, chain);

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

  return (
    <div className="w-full text-[#1E293B]">
      {!pc && <Back />}
      <div className="pt-3 lg:pt-12">
        <Banner
          img={planIcon}
          title="New Incentive Plan"
          description={"A few steps to complete your plan"}
          className="lg:w-[640px] mx-auto mb-6 lg:mb-12"
        />

        <div className="mb-6  lg:w-[600px] mx-4 lg:mx-auto lg:mb-0">
          <div className="overflow-hidden bg-cw1 dark:lg:shadow-d3 rounded-xl ">
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
                    title: ` There are ${formatDollar(project?.tokenInfo?.surplusTokenNum)} virtual tokens available`,
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
                    step={1}
                    precision={0}
                    max={project?.tokenInfo?.surplusTokenNum}
                    style={{ width: "100%" }}
                    type="number"
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
        </div>
      </div>
    </div>
  );
}

export default PlanCreate;
