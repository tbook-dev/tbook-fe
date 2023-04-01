import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Form, Input, Tooltip, InputNumber, Divider, message } from "antd";
import AppConfigProvider from "@/theme/AppConfigProvider";
import { CheckOutlined, InfoCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { createTIP, getAllocatPlan } from "@/api/incentive";
import { user } from "@tbook/store";
import { useCurrentProjectId, useCurrentProject, useProjectAudience } from "@tbook/hooks";
import _ from "lodash";
import { useResponsive } from "ahooks";
import { Icon } from "@tbook/ui";
import starIcon from "@tbook/share/images/icon/star.svg";
import { useParams } from "react-router-dom";
import { useNetwork } from "wagmi";
import Banner from "../component/banner";
import { conf } from "@tbook/utils";
import Chart from "../tokenTable/allocationPie/chart";
const { defaultErrorMsg, getDividePercent, minZeroValidator, formatDollar } = conf;
const { fetchUserInfo, setCurrentProjectId } = user;
const { NetWork } = Icon;
import clsx from "clsx";
import { useAsyncEffect } from "ahooks";
import minusIconp from "@tbook/share/images/icon/minus-gray.svg";
import minusIcon from "@tbook/share/images/icon/minus-red.svg";
const formItemCol = { labelCol: { span: 8 }, wrapperCol: { span: 16 } };
import Select from "@/components/select";
const data = [
  {
    id: "c",
    label: "c",
    value: 2182,
    color: "hsl(78, 70%, 50%)",
  },
  {
    id: "make",
    label: "make",
    value: 108,
    color: "hsl(31, 70%, 50%)",
  },
  {
    id: "php",
    label: "php",
    value: 428,
    color: "hsl(154, 70%, 50%)",
  },
  {
    id: "python",
    label: "python",
    value: 58,
    color: "hsl(82, 70%, 50%)",
  },
  {
    id: "css",
    label: "css",
    value: 300,
    color: "hsl(322, 70%, 50%)",
  },
  {
    id: "css1",
    label: "css",
    value: 300,
    color: "hsl(322, 70%, 50%)",
  },
  {
    id: "css2",
    label: "css",
    value: 300,
    color: "hsl(322, 70%, 50%)",
  },
  {
    id: "css3",
    label: "css",
    value: 300,
    color: "hsl(322, 70%, 50%)",
  },
];

const list = [
  {
    versionName: "Version02",
    createDate: "01/03/2022",
    versionId: "1",
  },
  {
    versionName: "Version02",
    createDate: "01/03/2022",
    versionId: "2",
  },
  {
    versionName: "Version02",
    createDate: "01/03/2022",
    versionId: "3",
  },
];
function Allocation() {
  const [form] = Form.useForm();
  const [formProject] = Form.useForm();
  const dispatch = useDispatch();
  const { chain } = useNetwork();

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
  const mainNetwork = project?.chain || chain?.name || "Ethereum";
  // console.log("mainNetwork", mainNetwork, chain);
  const [currentPlan, setCurrentPlan] = useState("1");
  const { pageType } = useParams();

  const [allcatInfo, setAllcatInfo] = useState({});

  const options = [...projectAudience, ...addedAudience];
  const tokenTotalAmount = project?.tokenInfo?.tokenTotalAmount || 100000000;
  // console.log("project->", project);
  useAsyncEffect(async () => {
    if (projectId) {
      const info = await getAllocatPlan(projectId);
      form.setFieldValue(info);
    }
  }, [projectId]);

  function handleCreatePlan() {
    form
      .validateFields()
      .then((values) => {
        setConfirmLoading(true);

        values.incentivePlanAdminId = userStore?.user?.userId;
        values.projectId = projectId;
        console.log(values);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  return (
    <div className="w-full text-[#1E293B]">
      <div className="pt-3 lg:pt-12 ">
        <div className="mb-6  lg:w-[600px] mx-4 lg:mx-auto lg:mb-10">
          <div className="flex flex-col justify-center flex-auto ml-[52px] lg:ml-0 lg:text-c">
            <h1 className="mb-1 font-bold text-c11 lg:text-cwh3 dark:text-white">Token Allocation Plan</h1>
            <h2 className="text-c2 lg:text-cwh2 dark:text-b-8">Edit and define your Token Allocation Plan.</h2>
          </div>
        </div>

        <div className="mb-6 relative lg:w-[600px] mx-4 lg:mx-auto lg:mb-0">
          {pc && (
            <div className="absolute py-6 w-[324px] rounded-lg top-0 left-[-350px]  text-white shadow-d11">
              <h3 className="px-6 mb-4 font-medium text-c13">Token Distribution</h3>
              <div className="flex justify-center">
                <Chart data={data} width={275} height={275} />
              </div>
            </div>
          )}

          {pc && (
            <div className="absolute top-0 right-[-348px] w-[348px] space-y-4 text-white">
              {list.map((v) => (
                <div
                  className={clsx(
                    currentPlan === v.versionId ? "text-black bg-[#26E3C2] rounded-r" : "ml-6 bg-b-1 rounded",
                    "flex items-center justify-between px-4 py-3 font-medium"
                  )}
                  key={v.versionId}
                >
                  <p className="text-c14">{v.versionName}</p>
                  <p className="text-c4">{v.createDate}</p>
                </div>
              ))}
            </div>
          )}

          <div className="overflow-hidden dark:bg-cw1 dark:lg:shadow-d3 rounded-xl lg:rounded-tr-none">
            <div className="relative px-3 py-4 lg:pb-0 lg:pt-6 lg:px-4">
              <Form
                {...(pc ? formItemCol : null)}
                form={form}
                labelAlign="left"
                colon={false}
                layout={pc ? "horizontal" : "vertical"}
                requiredMark={false}
                initialValues={{
                  planList: [{ planType: 2 }],
                }}
              >
                <Form.Item
                  label="Project Name"
                  name="projectName"
                  rules={[
                    {
                      required: true,
                      message: "Please input the Project Name!",
                    },
                  ]}
                >
                  <Input placeholder="Edit your project name." />
                </Form.Item>

                <Form.Item
                  label="Latest Valuation"
                  name="latestValuation"
                  rules={[
                    {
                      validator: minZeroValidator("Latest Valuation"),
                    },
                  ]}
                >
                  <Input placeholder="Not set yet" type="number" suffix="USD" min={0} />
                </Form.Item>

                <Form.Item
                  label="Max Token Supply"
                  name="maxTokenSupply"
                  tooltip={{
                    title: ` There are ${formatDollar(tokenTotalAmount)} virtual tokens available`,
                    icon: <InfoCircleOutlined />,
                  }}
                  rules={[
                    {
                      validator: minZeroValidator("Max Token Supply"),
                    },
                  ]}
                >
                  <InputNumber
                    min={0}
                    max={tokenTotalAmount}
                    style={{ width: "100%" }}
                    placeholder="Edit the token amount you would like to supply."
                  />
                </Form.Item>

                <Form.List
                  name="planList"
                  rules={[
                    {
                      validator: async (x, plans) => {
                        if (!plans || plans.length < 1) {
                          return Promise.reject(new Error("At least 1 Plan"));
                        }
                      },
                    },
                  ]}
                >
                  {(fields, { add, remove }, { errors }) => {
                    console.log({ fields });
                    return (
                      <>
                        <div className="flex justify-between font-medium text-c1">
                          <p>Plans</p>
                          <p>{fields.length} Plans</p>
                        </div>

                        {fields.map(({ key, name, ...restField }, idx) => {
                          const planType = form.getFieldValue(["planList", name, "planType"]);
                          console.log({ planType });
                          return (
                            <div key={key} className="lg:flex">
                              {/* const formItemCol = { labelCol: { span: 8 }, wrapperCol: { span: 16 } }; */}
                              <div className="flex items-center flex-none h-10" style={pc ? { width: "33.33%" } : null}>
                                <img
                                  src={pc ? minusIconp : minusIcon}
                                  className="w-4 mr-3 cursor-pointer"
                                  onClick={() => {
                                    remove(name);
                                  }}
                                />
                                <p>{`${idx + 1}`.padStart(2, "0")}</p>
                                {planType === 2 && <img className="w-4 ml-1.5" src={starIcon} />}
                              </div>

                              <div
                                className={clsx("flex-none grid grid-cols-2 gap-x-2")}
                                style={pc ? { width: "66.67%" } : null}
                              >
                                <Form.Item
                                  {...restField}
                                  name={[name, "planName"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Missing!",
                                    },
                                  ]}
                                >
                                  <Input style={{ width: pc ? 185 : "100%" }} placeholder="Plan name" />
                                </Form.Item>

                                <Form.Item
                                  {...restField}
                                  name={[name, "target"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Missing!",
                                    },
                                  ]}
                                >
                                  <Select
                                    style={{ width: pc ? 185 : "100%" }}
                                    allowClear
                                    optionLabelProp="label"
                                    placeholder="Employee"
                                    dropdownRender={(setSelectOpen) => (menu) => {
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
                                                form.setFieldValue(["planList", name, "target"], val);
                                                setSelectOpen(false);
                                              }}
                                              icon={<CheckOutlined />}
                                            />
                                          </div>
                                        </>
                                      );
                                    }}
                                    options={options}
                                  ></Select>
                                </Form.Item>

                                <Form.Item
                                  {...restField}
                                  name={[name, "tokenNumPercent"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Missing!",
                                    },
                                  ]}
                                >
                                  <Input
                                    style={{ width: pc ? 185 : "100%" }}
                                    step={1}
                                    precision={0}
                                    min={1}
                                    max={100}
                                    placeholder="Proportion"
                                    type="number"
                                    suffix="%"
                                    onChange={(evt) => {
                                      const val = Number(evt.target.value);
                                      form.setFieldValue(
                                        ["planList", name, "tokenNum"],
                                        (tokenTotalAmount * val) / 100
                                      );
                                    }}
                                  />
                                </Form.Item>
                                <Form.Item
                                  {...restField}
                                  name={[name, "tokenNum"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Missing!",
                                    },
                                  ]}
                                >
                                  <InputNumber
                                    onChange={(val) => {
                                      form.setFieldValue(
                                        ["planList", name, "tokenNumPercent"],
                                        getDividePercent(val, Number(tokenTotalAmount), 2)
                                      );
                                    }}
                                    style={{ width: pc ? 185 : "100%" }}
                                    step={1}
                                    precision={0}
                                    min={1}
                                    placeholder="Token Amount"
                                  />
                                </Form.Item>
                              </div>
                            </div>
                          );
                        })}
                        <p style={{ color: "#dc4446", marginBottom: 12 }}>{errors}</p>

                        <div className="mb-4">
                          <Button
                            onClick={() => {
                              add();
                              const plans = form.getFieldValue("planList");
                              form.setFieldValue(["planList", plans.length - 1, "planType"], 2);
                            }}
                            block
                            className="!flex items-center justify-center"
                          >
                            <PlusOutlined /> New Plan
                          </Button>
                        </div>
                      </>
                    );
                  }}
                </Form.List>

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

export default Allocation;
