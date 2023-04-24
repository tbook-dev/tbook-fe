import React, { useMemo, useState, useCallback, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Form, Input, InputNumber, Divider } from "antd";
import AppConfigProvider from "@/theme/LightProvider";
import { CheckOutlined, InfoCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { getAllocatPlan, updateAllocationPlan, getTemplateDetail } from "@/api/incentive";
import { useCurrentProjectId, useCurrentProject, useProjectAudience } from "@tbook/hooks";
import { useResponsive } from "ahooks";
// import starIcon from "@tbook/share/images/icon/star.svg";
import { conf } from "@tbook/utils";
import Chart from "../tokenTable/allocationPie/chart";
import clsx from "clsx";
import { useAsyncEffect } from "ahooks";
import minusIconp from "@tbook/share/images/icon/minus.svg";
import Select from "@/components/select";
import { Spin } from "antd";
import { round } from "lodash";
import { Back } from "@tbook/ui";
import { sumBy } from "lodash";
import { message } from "antd";
import { user } from "@tbook/store";
import { useSearchParams } from "react-router-dom";
const { fetchUserInfo } = user;

const { getDividePercent, minZeroValidator, maxValidator, formatDollar, defaultErrorMsg, defaultMaxAmount } = conf;

const formItemCol = { labelCol: { span: 8 }, wrapperCol: { span: 16 } };

function Allocation() {
  const [form] = Form.useForm();
  const userStore = useSelector((state) => state.user);

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [addedAudience, setAddedAudience] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const projectId = useCurrentProjectId();
  const project = useCurrentProject();
  const projectAudience = useProjectAudience();
  const { pc } = useResponsive();
  const [planLoading, setPlanLoading] = useState(null);
  const planList = Form.useWatch("planList", form);
  const remotePlanList = useRef(null);
  const [searchParams] = useSearchParams();
  const tokenTotalAmount = project?.tokenInfo?.tokenTotalAmount || defaultMaxAmount;
  const [tempInfo, setTempInfo] = useState({});

  const isTemplateMode = useMemo(() => {
    return !!searchParams.get("id");
  }, [searchParams]);

  const options = [...projectAudience, ...addedAudience];

  const fetchPlanAndSet = async () => {
    if (projectId && !isTemplateMode) {
      setPlanLoading(true);
      const info = await getAllocatPlan(projectId);
      setPlanLoading(false);
      try {
        info.planList = JSON.parse(info.planList);
      } catch (err) {
        info.planList = [{ planType: 2 }];
      }

      info.planList =
        info.planList.length > 0
          ? info.planList?.map((v) => ({ ...v, percentage: round(v.percentage, 10) }))
          : [{ planType: 2 }];
      remotePlanList.current = info.planList;
      form.setFieldsValue(info);
    }
  };

  const fetchTplAndSet = async () => {
    if (isTemplateMode) {
      const templateId = searchParams.get("id");
      setPlanLoading(true);
      let res = {};
      try {
        res = await getTemplateDetail(templateId);
      } catch (error) {}
      setPlanLoading(false);
      const info = {};
      try {
        info.planList = JSON.parse(res.distributionDetail);
      } catch {
        info.planList = [{ planType: 2 }];
      }

      info.planList =
        info.planList.length > 0
          ? info.planList?.map((v) => ({
              planName: v.targetName,
              percentage: round(v.percentage, 10),
              tokenNum: round((tokenTotalAmount * v.percentage) / 100, 10),
            }))
          : [{ planType: 2 }];
      remotePlanList.current = info.planList;
      info.projectName = project.projectName;
      info.maxTokenSupply = tokenTotalAmount;
      form.setFieldsValue(info);
      let tags = [];
      try {
        tags = JSON.parse(res.tags);
      } catch (err) {}
      setTempInfo({ ...info, tags, name: res.name });
    }
  };

  useAsyncEffect(fetchPlanAndSet, [projectId]);
  useAsyncEffect(fetchTplAndSet, []);

  const pieData = useMemo(() => {
    if (Array.isArray(planList)) {
      const l = planList
        .map((v, idx) => {
          return {
            id: idx,
            name: v.planName,
            percentage: v.percentage || 0,
            value: v.tokenNum || 0,
          };
        })
        .sort((a, b) => b.value - a.value);
      const sum = l.reduce((sum, item) => sum + item.value, 0);
      const free = tokenTotalAmount - sum;
      return [
        ...l,
        {
          name: "Free",
          percentage: getDividePercent(free, tokenTotalAmount, 2),
          value: free,
          id: -1,
        },
      ];
    } else {
      return [];
    }
  }, [planList, tokenTotalAmount]);

  const getDeletePlanList = useCallback((remote, local) => {
    const localRemoteList = local.filter((v) => v.planId !== undefined);
    return remote.filter((remote) => !localRemoteList.find((local) => local.planId === remote.planId));
  }, []);

  function handleUpdateAllocationPlan() {
    form
      .validateFields()
      .then(async (values) => {
        setConfirmLoading(true);
        values.incentivePlanAdminId = userStore?.user?.userId;
        values.projectId = projectId;
        values.date = "";
        const deleteList = getDeletePlanList(remotePlanList.current, values.planList);
        values.planList = JSON.stringify(values.planList);
        values.deletedPlanIdList = JSON.stringify(
          deleteList.filter((v) => v.planId !== undefined).map((v) => v.planId)
        );
        values.labelList = addedAudience.length === 0 ? "" : JSON.stringify(addedAudience.map((v) => v.label));
        const res = await updateAllocationPlan(projectId, values);
        if (res.success) {
          dispatch(fetchUserInfo(false));
          navigate("/tokenTable");
        } else {
          message.error(res.message || defaultErrorMsg);
          setConfirmLoading(false);
        }
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
      <div className="pt-3 lg:py-12 ">
        <div className="mb-6  lg:w-[600px] mx-4 lg:mx-auto lg:mb-10">
          {isTemplateMode ? (
            <div>
              <h1 className="mb-2.5 font-bold text-c11 lg:text-cwh3 dark:text-white">{tempInfo.name}</h1>
              <div className="flex flex-wrap">
                {tempInfo?.tags?.map((v) => (
                  <div key={v} className="px-3 mb-2 mr-2 rounded dark:bg-b-1 dark:text-white bg-l-1 text-c5">
                    {v}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center flex-auto ml-[52px] lg:ml-0 lg:text-c">
              <h1 className="mb-1 font-bold text-c11 lg:text-cwh3 dark:text-white">Token Allocation Plan</h1>
              <h2 className="text-c2 lg:text-cwh2 dark:text-b-8">Edit and define your Token Allocation Plan.</h2>
            </div>
          )}
        </div>

        <div className="mb-6 relative lg:w-[600px] mx-4 lg:mx-auto lg:mb-0">
          {pc && planLoading === null
            ? null
            : !planLoading && (
                <div className="absolute py-6 w-[324px] rounded-lg top-0 left-[-350px] bg-[#f6fafe] dark:bg-transparent dark:text-white shadow-d11">
                  <h3 className="px-6 mb-4 font-medium text-c13">Token Distribution</h3>
                  <div className="flex justify-center">
                    <Chart data={pieData} width={275} height={275} totalToken={tokenTotalAmount} />
                  </div>
                </div>
              )}

          {planLoading === null ? null : planLoading ? (
            <div className="flex justify-center">
              <Spin />
            </div>
          ) : (
            <div className="overflow-hidden bg-cw1 dark:lg:shadow-d3 rounded-xl">
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
                    <Input
                      placeholder="Edit your project name."
                      disabled={remotePlanList.current.filter((v) => v.planId !== undefined)?.length > 0}
                    />
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
                          const tokenSum = sumBy(plans, "tokenNum");
                          if (tokenSum > tokenTotalAmount) {
                            return Promise.reject(new Error("Total Token exceed the max token supply"));
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
                                    src={minusIconp}
                                    className="w-4 mr-3 cursor-pointer"
                                    onClick={() => {
                                      remove(name);
                                    }}
                                  />
                                  <p>{`${idx + 1}`.padStart(2, "0")}</p>
                                  {/* {planType === 1 && (
                                    <Tooltip title="for incentive" placement="right">
                                      <img className="w-4 ml-1.5" src={starIcon} />
                                    </Tooltip>
                                  )} */}
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
                        <Link to="/tokenTable" className="hidden mr-10 lg:block">
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
