import React, { useMemo, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Form, Input, InputNumber, Divider } from "antd";
import AppConfigProvider from "@/theme/AppConfigProvider";
import { CheckOutlined, InfoCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { getAllocatPlan, updateAllocationPlan } from "@/api/incentive";
import { useCurrentProjectId, useCurrentProject, useProjectAudience } from "@tbook/hooks";
import { useResponsive } from "ahooks";
import starIcon from "@tbook/share/images/icon/star.svg";
import { conf } from "@tbook/utils";
import Chart from "../tokenTable/allocationPie/chart";
import clsx from "clsx";
import { useAsyncEffect } from "ahooks";
import minusIconp from "@tbook/share/images/icon/minus-gray.svg";
import minusIcon from "@tbook/share/images/icon/minus-red.svg";
import Select from "@/components/select";
import { Spin } from "antd";
import { round } from "lodash";
import dayjs from "dayjs";
import { Back } from "@tbook/ui";

const { getDividePercent, minZeroValidator, maxValidator, formatDollar, dateFormat } = conf;

const formItemCol = { labelCol: { span: 8 }, wrapperCol: { span: 16 } };

function Allocation() {
  const [form] = Form.useForm();
  const userStore = useSelector((state) => state.user);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [addedAudience, setAddedAudience] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const navigate = useNavigate();
  const projectId = useCurrentProjectId();
  const project = useCurrentProject();
  const projectAudience = useProjectAudience();
  const { pc } = useResponsive();
  const [currentPlan, setCurrentPlan] = useState(1);
  const [planLoading, setPlanLoading] = useState(null);
  const planList = Form.useWatch("planList", form);
  const [versions, setVersions] = useState([]);
  const [versionLoading, setVersionLoading] = useState(false);

  const options = [...projectAudience, ...addedAudience];
  const tokenTotalAmount = project?.tokenInfo?.tokenTotalAmount || 100000000;
  // console.log("project->", project);
  const versionId = useMemo(() => {
    const us = new URLSearchParams(location.search);
    return us.get("tpl");
  }, [location.href]);

  const fetchAndSet = async () => {
    if (projectId) {
      setPlanLoading(true);
      const info = await getAllocatPlan(projectId);
      setPlanLoading(false);
      try {
        info.planList = JSON.parse(info.planList);
      } catch {
        info.planList = [{ planType: 2 }];
      }

      info.planList =
        info.planList.length > 0
          ? info.planList?.map((v) => ({ ...v, percentage: round(v.percentage, 10) }))
          : [{ planType: 2 }];
      form.setFieldsValue(info);
      setVersions([{ createDate: info.date, versionId: 1, versionName: "Version01" }]);
    }
  };

  useAsyncEffect(fetchAndSet, [projectId]);

  // useAsyncEffect(async () => {
  //   if (projectId & pc) {
  //     setVersionLoading(true);
  //     // 当有url的时候是查看历史记录否则是最新的
  //     // let list = [];
  //     let list = mockList;
  //     let currentVersion = null;
  //     if (Array.isArray(list) && list.length > 0) {
  //       if (versionId) {
  //         currentVersion = list?.find((v) => v.versionId === versionId) || list[list.length - 1];
  //       } else {
  //         currentVersion = list[0];
  //       }
  //     } else {
  //       currentVersion = { versionName: "Version01", createDate: dayjs().format(dateFormat), versionId: "1" };
  //       list = [currentVersion];
  //     }
  //     setVersions(list);
  //     setCurrentPlan(currentVersion.versionId);
  //     setVersionLoading(false);
  //   }
  // }, [projectId, versionId,versions,  pc]);

  const pieData = useMemo(() => {
    if (Array.isArray(planList)) {
      return planList.map((v, idx) => {
        return {
          id: idx,
          label: v.planName,
          percentage: v.percentage || 0,
          tokenNum: v.tokenNum || 0,
        };
      });
    } else {
      return [];
    }
  }, [planList]);

  function handleUpdateAllocationPlan() {
    form
      .validateFields()
      .then(async (values) => {
        setConfirmLoading(true);
        values.incentivePlanAdminId = userStore?.user?.userId;
        values.projectId = projectId;
        console.log(values);
        values.planList = JSON.stringify(values.planList);
        values.date = "";
        const res = await updateAllocationPlan(projectId, values);
        console.log(res);
      })
      .catch((err) => {
        console.log(err, "error");
      })
      .finally(() => {
        setConfirmLoading(false);
      });
  }

  return (
    <div className="w-full text-[#1E293B]">
      {!pc && <Back link="/tokenTable" />}
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
                <Chart data={pieData} width={275} height={275} totalToken={tokenTotalAmount} />
              </div>
            </div>
          )}

          {pc && (
            <div className="absolute top-0 right-[-348px] w-[348px] space-y-4 text-white">
              {versions.map((v, idx) => (
                <div
                  className={clsx(
                    currentPlan === v.versionId ? "text-black bg-[#26E3C2] rounded-r" : "ml-6 bg-b-1 rounded",
                    "flex items-center justify-between px-4 py-3 font-medium",
                    currentPlan !== v.versionId && "cursor-pointer"
                  )}
                  key={v.versionId}
                  onClick={() => {
                    if (currentPlan !== v.versionId) {
                      setCurrentPlan(v.versionId);
                    }
                  }}
                >
                  <p className={clsx("text-c14", idx === 0 && currentPlan !== v.versionId && "text-colorful1")}>
                    {v.versionName}
                  </p>
                  <p className={clsx("text-c4", idx === 0 && currentPlan !== v.versionId && "text-colorful1")}>
                    {v.createDate}
                  </p>
                </div>
              ))}
            </div>
          )}
          {planLoading === null ? null : planLoading ? (
            <div className="flex justify-center">
              <Spin />
            </div>
          ) : (
            <div className="overflow-hidden rounded-tr-none dark:bg-cw1 dark:lg:shadow-d3 rounded-xl">
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
                      disabled
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
                      return (
                        <>
                          <div className="flex justify-between font-medium text-c1">
                            <p>Plans</p>
                            <p>{fields.length} Plans</p>
                          </div>

                          {fields.map(({ key, name, ...restField }, idx) => {
                            const planType = form.getFieldValue(["planList", name, "planType"]);
                            return (
                              <div key={key} className="lg:flex">
                                {/* const formItemCol = { labelCol: { span: 8 }, wrapperCol: { span: 16 } }; */}
                                <div
                                  className="flex items-center flex-none h-10"
                                  style={pc ? { width: "33.33%" } : null}
                                >
                                  <img
                                    src={pc ? minusIconp : minusIcon}
                                    className="w-4 mr-3 cursor-pointer"
                                    onClick={() => {
                                      remove(name);
                                    }}
                                  />
                                  <p>{`${idx + 1}`.padStart(2, "0")}</p>
                                  {planType === 1 && <img className="w-4 ml-1.5" src={starIcon} />}
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
                                    name={[name, "percentage"]}
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
                                          ["planList", name, "percentage"],
                                          getDividePercent(val, Number(tokenTotalAmount), 10)
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
                          onClick={handleUpdateAllocationPlan}
                          type="primary"
                          className="w-[64vw] lg:w-[120px]"
                          loading={confirmLoading}
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  </AppConfigProvider>
                </Form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Allocation;
