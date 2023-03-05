import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate, useSearchParams, Link } from "react-router-dom";
import {
  Button,
  Form,
  Radio,
  Checkbox,
  DatePicker,
  Select,
  InputNumber,
  Modal,
  Divider,
  Input,
  Drawer,
  message,
} from "antd";
import { Switch } from "@tbook/ui";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import {
  getTIPInfo,
  getProjectUsers,
  addGrant,
  addProjectUser,
  getIncentiveList,
  getGrantInfo,
  updateGrantInfo,
} from "@/api/incentive";
import { useSelector } from "react-redux";

import useFindAudience from "@/hooks/useFindAudience";
import GranteeFrom from "../incentive/GranteeForm";
import dayjs from "dayjs";
import { useAsyncEffect, useResponsive } from "ahooks";
import BorderModalContent from "../component/BorderModalContent";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useCurrentProjectId } from "@tbook/hooks";
import grantIcon from "@tbook/share/images/incentive/grant.svg";
import Plan from "./plan";
// import Title from "../component/Title";
import Banner from "../component/banner";
import Spot from "./spot";
import clsx from "clsx";
import minusIconp from "@tbook/share/images/icon/minus-gray.svg";
import minusIcon from "@tbook/share/images/icon/minus-red.svg";
import { Span as ThemeSpan } from "@tbook/ui";
import _ from "lodash";
import { conf } from "@tbook/share";

const {
  grantType,
  dateFormat,
  periodMap,
  formatDollar,
  maxValidator,
  minZeroValidator,
  tokenTypeList,
  timeLengthList,
  vestingOccursOptions,
  getDividePercent,
} = conf;

dayjs.extend(customParseFormat);
const formItemCol = { labelCol: { span: 8 }, wrapperCol: { span: 16 } };

const { Option } = Select;

function GrantCreate() {
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [formGrantee] = Form.useForm();
  const [showModal, setModal] = useState(false);
  const [openGrantee, setOpenGrantee] = useState(false);
  const userStore = useSelector((state) => state.user);
  const [confirmLoadingMember, setConfirmLoadingMember] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const projectId = useCurrentProjectId();
  const [searchParms] = useSearchParams();
  // console.log(searchParms.get('grantId'))
  const grantId = searchParms.get("grantId");
  const findAudience = useFindAudience();
  const { pc } = useResponsive();
  const [userlist, setUserlist] = useState([]);
  const [tipList, setTipList] = useState([]);
  const newGrantee = useRef(null);
  const [formPeriodSum, setPeriodSum] = useState(0);
  const [detail, setDetail] = useState({
    incentivePlanId: 0,
    projectId: 0,
    target: 2,
    status: 1,
    effectiveDate: "",
    projectName: "",
  });
  const { tipId = "" } = useParams();
  const hasTipId = /\d+/.test(tipId);

  useAsyncEffect(async () => {
    if (tipId && hasTipId) {
      const res = await getTIPInfo(tipId);
      setDetail(res);
    }
  }, [tipId]);

  useAsyncEffect(async () => {
    if (projectId) {
      // console.log('setUserlist')
      const res = await getProjectUsers(projectId);
      // console.log({list:  res.users})
      const cuserId = userStore.user.userId;
      setUserlist(res?.users?.filter((m) => m.userId !== cuserId));
    }
  }, [projectId]);

  useAsyncEffect(async () => {
    if (!hasTipId && projectId) {
      const res = await getIncentiveList(projectId);
      // console.log(res);
      setTipList(res);
    }
  }, [projectId]);

  useEffect(() => {
    // 在更新userList之后自动选择新增的
    if (newGrantee.current && userlist.length > 0) {
      form.setFieldValue("granteeId", newGrantee.current);
      newGrantee.current = null;
    }
  }, [userlist]);

  useAsyncEffect(async () => {
    if (!grantId) return;
    const grantInfo = await getGrantInfo(grantId);
    const formValue = {
      granteeId: grantInfo.granteeId,
      grantNum: grantInfo.grantNum,
      exercisePrice: grantInfo.exercisePrice,
      grantType: grantInfo.grantType,
      tokenType: grantInfo.tokenType,
      grantDate: dayjs(grantInfo.grantDate, dateFormat),
      vestingTotalLength: grantInfo.vestingTotalLength,
      vestingTotalPeriod: grantInfo.vestingTotalPeriod,
      cliffTime: grantInfo.cliffTime,
      cliffAmount: grantInfo.cliffAmount,
      cliffPeriod: grantInfo.cliffPeriod,
      vestingFrequency: grantInfo.vestingFrequency,
      vestingPeriod: grantInfo.vestingPeriod,
      isIncludingCliff: !!grantInfo.cliffTime,
    };
    console.log(grantInfo);
    form.setFieldsValue(formValue);
  }, [grantId]);

  const formatValue = useCallback((planValues, userlist, userId) => {
    const grantValues = userlist.find((v) => v.userId === planValues.granteeId);
    const finalTipId = hasTipId ? tipId : planValues.incentivePlanId;
    const cliffValues = {
      vestingTotalLength: planValues.vestingTotalLength,
      vestingTotalPeriod: planValues.vestingTotalPeriod,
      cliffTime: planValues.cliffTime,
      cliffAmount: planValues.cliffAmount,
      cliffPeriod: planValues.cliffPeriod,
      vestingFrequency: planValues.vestingFrequency,
      vestingPeriod: planValues.vestingPeriod,
    };
    const periodsPlan = {
      startDate: planValues.grantDate.format(dateFormat),
      vestingOccureType: planValues.vestingOccureType,
      periodList:
        JSON.stringify(
          planValues?.periodsPlan?.map((plan) => {
            delete plan.tokenNumPercent;
            return plan;
          })
        ) || [],
    };
    const values = {
      incentivePlanId: finalTipId,
      grantCreatorId: userId,
      granteeId: grantValues.userId,
      granteeName: grantValues.name,
      granteeEthAddress: grantValues.mainWallet,
      granteeEmail: grantValues.email,
      grantType: planValues.grantType,
      grantNum: planValues.grantNum,
      tokenType: planValues.tokenType,
      exercisePrice: planValues.exercisePrice,
      grantDate: planValues.grantDate.format(dateFormat),
      vestingScheduleDate: dayjs().format(dateFormat),
      grantStatus: 1,
      ...cliffValues,
    };
    if (planValues?.grantType === 2) {
      values.periodsPlan = periodsPlan;
    }
    return values;
  }, []);

  async function handleCreate() {
    const planValues = await form.validateFields();
    setLoadingCreate(true);
    const values = formatValue(planValues, userlist, userStore?.user?.userId);
    let grantInfo = null;
    if (grantId) {
      grantInfo = await updateGrantInfo({ ...values, grantId });
    } else {
      grantInfo = await addGrant(values.incentivePlanId, values);
    }
    console.log("grantInfo", grantInfo);
    if (!grantInfo.success) {
      message.error(grantInfo.message);
      setLoadingCreate(false);
      return;
    }
    setLoadingCreate(false);
    // navigate(`/incentive?tipId=${values.incentivePlanId}`);
    navigate(`/grants/${grantInfo?.entity?.grantId}/sign`);
  }

  function handleAddGrantee() {
    // const projectId = userStore?.projects?.[0]?.projectId;
    setConfirmLoadingMember(true);

    formGrantee.validateFields().then((values) => {
      addProjectUser(projectId, {
        projectId,
        walletAddress: values.granteeEthAddress,
        name: values.granteeName,
        email: values.granteeEmail,
        userRole: 4,
      }).then((userRes) => {
        setConfirmLoadingMember(false);
        setModal(false);
        newGrantee.current = userRes?.entity?.userId;
        if (!userRes.success) {
          message.error(userRes.message);
        }
        getProjectUsers(projectId).then((res) => {
          setUserlist(res?.users || []);
          // console.log(userRes);
        });
      });
    });
  }

  // console.log("detail->", detail);
  return (
    <>
      <div className="w-full mx-auto">
        <div className="pt-3 lg:pt-12">
          <Banner
            img={grantIcon}
            title="New Grant"
            description="Motivate the valuable contributions"
            className="lg:w-[640px] mx-auto mb-6 lg:mb-12"
          />
          <div className="mb-6 lg:w-[600px] lg:mx-auto mx-4 lg:mb-0">
            <Plan
              planName={detail?.incentivePlanName}
              targetAudince={findAudience(detail.target)}
              availableAmount={formatDollar(detail?.totalTokenNum)}
            />
            <div className="mt-5 lg:mt-10">
              <Form
                {...(pc ? formItemCol : null)}
                form={form}
                layout={pc ? "horizontal" : "vertical"}
                requiredMark={false}
                labelAlign="left"
                colon={false}
                initialValues={{
                  grantType: 1,
                  vestingTotalPeriod: 3,
                  vestingPeriod: 3,
                  cliffPeriod: 3,
                  tokenType: 1,
                  isIncludingCliff: false,
                  periodsPlan: [{ timeUnit: 3 }],
                  vestingOccureType: 0,
                }}
              >
                {/* <div className="mb-4 font-semibold text-slate-800">
                  Plan Detail
                </div>

                {hasTipId ? (
                  <div className="mb-6">
                    <p className="text-xs text-[#475569]">Plan Name</p>
                    <p className="text-base font-semibold text-[#1E293B]">
                      {detail.incentivePlanName}
                    </p>
                  </div>
                ) : (
                  <Form.Item
                    label="Choose an Incentive Plan"
                    name="incentivePlanId"
                    rules={[
                      {
                        required: true,
                        message: "Please select the Incentive Plan!",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Search/Select"
                      options={tipList.map((item) => ({
                        label: item.incentivePlanName,
                        value: item.incentivePlanId,
                      }))}
                    />
                  </Form.Item>
                )} */}

                <Spot
                  id="grantee"
                  className="pt-2 mb-5 overflow-hidden divide-y divide-b-1 lg:divide-none lg:pb-1 lg:pt-4 rounded-xl shadow-d6 lg:mb-10"
                  close={() => {
                    setOpenGrantee(false);
                  }}
                >
                  <h2 className="h-10 px-4 leading-10 dark:text-white text-c3 dark:lg:text-cwh2">Grantee</h2>
                  <div className="px-4">
                    <Form.Item
                      label="Choose a Grantee"
                      name="granteeId"
                      rules={[
                        {
                          required: true,
                          message: "Please input the grantee!",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Search/Select"
                        open={openGrantee}
                        getPopupContainer={() => document.getElementById("grantee")}
                        onDropdownVisibleChange={(v) => setOpenGrantee(v)}
                        dropdownRender={(menu) => {
                          return (
                            <>
                              {menu}
                              <Divider style={{ margin: "8px 0" }} />
                              <Button
                                type="text"
                                className="w-full"
                                onClick={() => {
                                  setOpenGrantee(false);
                                  setTimeout(() => {
                                    setModal(true);
                                  }, 300);
                                }}
                              >
                                <div className="flex items-center justify-center w-full">
                                  <PlusOutlined />
                                  Set up a new grantee
                                </div>
                              </Button>
                            </>
                          );
                        }}
                        options={userlist.map((item) => ({
                          label: item.name && item.name.length > 0 ? item.name : item.mainWallet,
                          value: item.userId,
                        }))}
                      />
                    </Form.Item>
                  </div>
                </Spot>

                <Spot className="pt-2 mb-5 overflow-hidden divide-y divide-b-1 lg:divide-none lg:pb-1 lg:pt-4 rounded-xl shadow-d6 lg:mb-10">
                  <h2 className="h-10 px-4 leading-10 dark:text-white text-c3 dark:lg:text-cwh2">Grant</h2>
                  <div className="px-4">
                    <Form.Item name="tokenType">
                      {/* <Radio.Group>
                      {tokenTypeList.map(({ label, value, disabled }) => {
                        return (
                          <Radio disabled={disabled} value={value} key={value}>
                            {label}
                          </Radio>
                        );
                      })}
                    </Radio.Group> */}

                      {pc ? (
                        <Form.Item name="tokenType">
                          <Radio.Group>
                            {tokenTypeList.map(({ name, value, disabled }) => {
                              return (
                                <Radio disabled={disabled} value={value} key={value}>
                                  {name}
                                </Radio>
                              );
                            })}
                          </Radio.Group>
                        </Form.Item>
                      ) : (
                        <Form.Item name="tokenType" className="!mt-3">
                          <Switch list={tokenTypeList} />
                        </Form.Item>
                      )}
                    </Form.Item>
                    <Form.Item
                      label="Total Amount"
                      name="grantNum"
                      rules={[
                        {
                          validator: minZeroValidator("Total Amount"),
                        },
                      ]}
                    >
                      <Input placeholder="Editable" type="number" suffix="Token" min={0} />
                    </Form.Item>
                    <Form.Item
                      label="Exercise Price"
                      name="exercisePrice"
                      rules={[
                        {
                          validator: minZeroValidator("Exercise Price"),
                        },
                      ]}
                    >
                      <Input placeholder="Editable" type="number" suffix="USD" min={0} />
                    </Form.Item>
                  </div>
                </Spot>

                <Spot
                  id="vesting"
                  className="pt-2 mb-5 overflow-hidden divide-y divide-b-1 lg:divide-none lg:pb-1 lg:pt-4 rounded-xl shadow-d6 lg:mb-10"
                >
                  <h2 className="h-10 px-4 leading-10 dark:text-white text-c3 dark:lg:text-cwh2">Vesting</h2>

                  <div className="px-4">
                    {pc ? (
                      <Form.Item name="grantType">
                        <Radio.Group>
                          {grantType.map(({ name, value, disabled }) => {
                            return (
                              <Radio disabled={disabled} value={value} key={value}>
                                {name}
                              </Radio>
                            );
                          })}
                        </Radio.Group>
                      </Form.Item>
                    ) : (
                      <Form.Item name="grantType" className="!mt-3">
                        <Switch list={grantType} />
                      </Form.Item>
                    )}

                    <Form.Item
                      label="Vesting Start Date"
                      name="grantDate"
                      rules={[
                        {
                          required: true,
                          message: "Please input the Vesting Start Date!",
                        },
                      ]}
                    >
                      <DatePicker getPopupContainer={() => document.getElementById("vesting")} className="w-full" />
                    </Form.Item>
                    {/* 切换引起的渲染 */}
                    <Form.Item
                      noStyle
                      shouldUpdate={(prevValues, currentValues) => prevValues.grantType !== currentValues.grantType}
                    >
                      {({ getFieldValue }) => {
                        // Cliff
                        if (getFieldValue("grantType") === 1) {
                          return (
                            <>
                              <Form.Item
                                label="Length"
                                style={{
                                  marginBottom: 0,
                                }}
                              >
                                <Form.Item
                                  name="vestingTotalLength"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please input the Total Vesting Length!",
                                    },
                                  ]}
                                  style={{
                                    display: "inline-block",
                                    width: "calc(100% - 108px)",
                                  }}
                                >
                                  <InputNumber
                                    step={1}
                                    precision={0}
                                    min={1}
                                    style={{ width: "100%" }}
                                    placeholder="Editable"
                                  />
                                </Form.Item>
                                <Form.Item
                                  name="vestingTotalPeriod"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please input the Total Vesting Length!",
                                    },
                                  ]}
                                  style={{
                                    display: "inline-block",
                                    width: "100px",
                                    marginLeft: 8,
                                  }}
                                >
                                  <Select getPopupContainer={() => document.getElementById("vesting")}>
                                    {timeLengthList.map((v) => (
                                      <Option value={v.value} key={v.value}>
                                        {v.label}
                                      </Option>
                                    ))}
                                  </Select>
                                </Form.Item>
                              </Form.Item>

                              <Form.Item
                                label="Vesting Frequency"
                                style={{
                                  marginBottom: 0,
                                }}
                              >
                                <Form.Item
                                  name="vestingFrequency"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please input the Vesting Frequency Length!",
                                    },
                                    {
                                      validator: async (_, vestingFrequencyV) => {
                                        const grantDateV = await form.getFieldValue("grantDate");
                                        if (vestingFrequencyV && grantDateV) {
                                          const vestingTotalLengthV = await form.getFieldValue("vestingTotalLength");
                                          const vestingTotalPeriodV = await form.getFieldValue("vestingTotalPeriod");
                                          const totalEnd = grantDateV.add(
                                            vestingTotalLengthV,
                                            periodMap[vestingTotalPeriodV].toLowerCase()
                                          );

                                          const vestingPeriodV = await form.getFieldValue("vestingPeriod");
                                          const vestEnd = grantDateV.add(
                                            vestingFrequencyV,
                                            periodMap[vestingPeriodV].toLowerCase()
                                          );
                                          // console.log('totalEnd',totalEnd.format(dateFormat))
                                          // console.log('vestEnd',vestEnd.format(dateFormat))

                                          if (totalEnd.isBefore(vestEnd)) {
                                            return Promise.reject(
                                              new Error("Total Vesting end time should before Vesting Frequency!")
                                            );
                                          }
                                        }
                                      },
                                    },
                                  ]}
                                  style={{
                                    display: "inline-block",
                                    width: "calc(100% - 108px)",
                                  }}
                                >
                                  <InputNumber
                                    step={1}
                                    precision={0}
                                    min={1}
                                    style={{ width: "100%" }}
                                    placeholder="Editable"
                                  />
                                </Form.Item>
                                <Form.Item
                                  name="vestingPeriod"
                                  style={{
                                    display: "inline-block",
                                    width: "100px",
                                    marginLeft: 8,
                                  }}
                                >
                                  <Select getPopupContainer={() => document.getElementById("vesting")}>
                                    {timeLengthList.map((v) => (
                                      <Option value={v.value} key={v.value}>
                                        {v.label}
                                      </Option>
                                    ))}
                                  </Select>
                                </Form.Item>
                              </Form.Item>

                              <Form.Item label="" name="isIncludingCliff" valuePropName="checked">
                                <Checkbox>including cliff duration</Checkbox>
                              </Form.Item>

                              <Form.Item
                                noStyle
                                shouldUpdate={(prevValues, currentValues) =>
                                  prevValues.isIncludingCliff !== currentValues.isIncludingCliff
                                }
                              >
                                {({ getFieldValue }) =>
                                  getFieldValue("isIncludingCliff") === true ? (
                                    <Form.Item
                                      label="Cliff Duration"
                                      style={{
                                        marginBottom: 0,
                                      }}
                                    >
                                      <Form.Item
                                        name="cliffTime"
                                        rules={[
                                          {
                                            required: true,
                                            message: "Please input the Cliff Duration Length!",
                                          },
                                          {
                                            validator: async (_, cliffTimeV) => {
                                              const grantDateV = await form.getFieldValue("grantDate");
                                              if (cliffTimeV && grantDateV) {
                                                const vestingTotalLengthV = await form.getFieldValue(
                                                  "vestingTotalLength"
                                                );
                                                const vestingTotalPeriodV = await form.getFieldValue(
                                                  "vestingTotalPeriod"
                                                );
                                                const totalEnd = grantDateV.add(
                                                  vestingTotalLengthV,
                                                  periodMap[vestingTotalPeriodV].toLowerCase()
                                                );

                                                const cliffPeriodV = await form.getFieldValue("cliffPeriod");
                                                const cliffEnd = grantDateV.add(
                                                  cliffTimeV,
                                                  periodMap[cliffPeriodV].toLowerCase()
                                                );
                                                // console.log('totalEnd',totalEnd.format(dateFormat))
                                                // console.log('vestEnd',vestEnd.format(dateFormat))

                                                if (totalEnd.isBefore(cliffEnd)) {
                                                  return Promise.reject(
                                                    new Error("Total Vesting end time should before cliff end!")
                                                  );
                                                }
                                              }
                                            },
                                          },
                                        ]}
                                        style={{
                                          display: "inline-block",
                                          width: "calc(100% - 108px)",
                                        }}
                                      >
                                        <InputNumber
                                          min={1}
                                          step={1}
                                          precision={0}
                                          style={{ width: "100%" }}
                                          placeholder="Editable"
                                        />
                                      </Form.Item>
                                      <Form.Item
                                        name="cliffPeriod"
                                        style={{
                                          display: "inline-block",
                                          width: "100px",
                                          marginLeft: 8,
                                        }}
                                      >
                                        <Select getPopupContainer={() => document.getElementById("vesting")}>
                                          {timeLengthList.map((v) => (
                                            <Option value={v.value} key={v.value}>
                                              {v.label}
                                            </Option>
                                          ))}
                                        </Select>
                                      </Form.Item>
                                    </Form.Item>
                                  ) : null
                                }
                              </Form.Item>
                              <Form.Item
                                noStyle
                                shouldUpdate={(prevValues, currentValues) =>
                                  prevValues.isIncludingCliff !== currentValues.isIncludingCliff
                                }
                              >
                                {({ getFieldValue }) =>
                                  getFieldValue("isIncludingCliff") === true ? (
                                    <Form.Item
                                      name="cliffAmount"
                                      label="Cliff Amount"
                                      rules={[
                                        {
                                          validator: minZeroValidator("Cliff Amount"),
                                        },
                                        {
                                          validator: maxValidator(100, "Cliff Amount"),
                                        },
                                      ]}
                                    >
                                      <Input placeholder="Editable" suffix="%" type="number" max={100} min={0} />
                                    </Form.Item>
                                  ) : null
                                }
                              </Form.Item>
                            </>
                          );
                        }
                        // Periods
                        if (getFieldValue("grantType") === 2) {
                          const totalGrantToken = form.getFieldValue("grantNum");
                          console.log({ totalGrantToken });
                          return (
                            <>
                              <Form.Item label="Vesting Occurs" name="vestingOccureType">
                                <Select getPopupContainer={() => document.getElementById("vesting")}>
                                  {vestingOccursOptions.map((v) => (
                                    <Option value={v.value} key={v.value}>
                                      {v.name}
                                    </Option>
                                  ))}
                                </Select>
                              </Form.Item>
                              <Form.List
                                name="periodsPlan"
                                rules={[
                                  {
                                    validator: async (x, plans) => {
                                      if (!plans || plans.length < 1) {
                                        return Promise.reject(new Error("At least 1 periodsPlan"));
                                      }
                                      //
                                      const divideToken = _.sumBy(plans, "tokenNum");

                                      if (totalGrantToken && divideToken > Number(totalGrantToken)) {
                                        return Promise.reject(
                                          new Error("Customized Vesting Amount exceed the Total Amount")
                                        );
                                      }
                                    },
                                  },
                                ]}
                              >
                                {(fields, { add, remove }, { errors }) => {
                                  const formPeriodPlan = form.getFieldValue("periodsPlan");
                                  // console.log({ formPeriodPlan });
                                  // 这里只会列表增加减少才会触发
                                  // setPeriodSum(_.sumBy(formPeriodPlan, "tokenNum"));

                                  return (
                                    <>
                                      <div className="flex justify-between font-medium text-c1">
                                        <div>
                                          <ThemeSpan>Customized Vesting Time</ThemeSpan>
                                        </div>
                                        <div className="hidden mb-2 space-x-4 lg:flex ">
                                          <ThemeSpan>{formPeriodPlan.length} times</ThemeSpan>
                                          <ThemeSpan>{formPeriodSum} Token</ThemeSpan>
                                          <ThemeSpan>
                                            {totalGrantToken
                                              ? getDividePercent(formPeriodSum, Number(totalGrantToken), 2)
                                              : 0}
                                            %
                                          </ThemeSpan>
                                        </div>
                                      </div>

                                      {fields.map(({ key, name, ...restField }, idx) => (
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
                                                setPeriodSum(_.sumBy(formPeriodPlan, "tokenNum"));
                                                remove(name);
                                              }}
                                            />
                                            <ThemeSpan>{`${idx + 1}`.padStart(2, "0")}</ThemeSpan>
                                          </div>

                                          <div
                                            className={clsx("flex-none grid lg:grid-cols-4 grid-cols-2  gap-x-2")}
                                            style={pc ? { width: "66.67%" } : null}
                                          >
                                            <Form.Item
                                              {...restField}
                                              name={[name, "length"]}
                                              rules={[
                                                {
                                                  required: true,
                                                  message: "Missing!",
                                                },
                                              ]}
                                            >
                                              <InputNumber
                                                style={pc ? null : { width: "100%" }}
                                                step={1}
                                                precision={0}
                                                min={1}
                                                placeholder="Length"
                                              />
                                            </Form.Item>
                                            <Form.Item
                                              {...restField}
                                              name={[name, "timeUnit"]}
                                              // style={{ width: "100%" }}
                                              rules={[
                                                {
                                                  required: true,
                                                  message: "Missing!",
                                                },
                                              ]}
                                            >
                                              <Select
                                                style={{ width: pc ? 88 : "100%" }}
                                                getPopupContainer={() => document.getElementById("vesting")}
                                                placeholder="Month"
                                              >
                                                {timeLengthList.map((v) => (
                                                  <Option value={v.value} key={v.value}>
                                                    {v.label}
                                                  </Option>
                                                ))}
                                              </Select>
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
                                                style={{ width: pc ? 88 : "100%" }}
                                                step={1}
                                                precision={0}
                                                min={1}
                                                max={100}
                                                placeholder="0"
                                                type="number"
                                                suffix="%"
                                                onChange={(evt) => {
                                                  const val = Number(evt.target.value);
                                                  if (totalGrantToken) {
                                                    form.setFieldValue(
                                                      ["periodsPlan", name, "tokenNum"],
                                                      (totalGrantToken * val) / 100
                                                    );
                                                    const formPeriodPlan = form.getFieldValue("periodsPlan");
                                                    setPeriodSum(_.sumBy(formPeriodPlan, "tokenNum"));
                                                  }
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
                                                  if (totalGrantToken) {
                                                    const formPeriodPlan = form.getFieldValue("periodsPlan");
                                                    setPeriodSum(_.sumBy(formPeriodPlan, "tokenNum"));
                                                    form.setFieldValue(
                                                      ["periodsPlan", name, "tokenNumPercent"],
                                                      getDividePercent(val, Number(totalGrantToken), 2)
                                                    );
                                                  }
                                                }}
                                                style={pc ? null : { width: "100%" }}
                                                step={1}
                                                precision={0}
                                                min={1}
                                                placeholder="Token Amount"
                                              />
                                            </Form.Item>
                                          </div>
                                        </div>
                                      ))}
                                      <p style={{ color: "#dc4446", marginBottom: 12 }}>{errors}</p>

                                      <div className="mb-4">
                                        <Button
                                          onClick={() => {
                                            add();
                                            const plans = form.getFieldValue("periodsPlan");
                                            console.log({ plans });

                                            form.setFieldValue(["periodsPlan", plans.length - 1, "timeUnit"], 3);
                                          }}
                                          block
                                          className="!flex items-center justify-center"
                                        >
                                          <PlusOutlined /> New Period
                                        </Button>
                                      </div>
                                    </>
                                  );
                                }}
                              </Form.List>
                            </>
                          );
                        }
                      }}
                    </Form.Item>
                  </div>
                </Spot>
              </Form>
            </div>
          </div>

          <div className="lg:pt-10 pb-[60px]">
            <div className="flex justify-center">
              <Link to="/" className="hidden lg:block">
                <Button>Cancel</Button>
              </Link>
              <Button
                onClick={handleCreate}
                type="primary"
                className="lg:ml-10 w-[64vw] lg:w-auto ml-0"
                loading={loadingCreate}
              >
                {grantId ? "Update" : "Create"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {pc ? (
        <Modal
          width={460}
          title="Set up a new grantee"
          open={showModal}
          okText="Done"
          cancelText="Close"
          onOk={handleAddGrantee}
          confirmLoading={confirmLoadingMember}
          onCancel={() => {
            setModal(false);
            formGrantee.resetFields();
            setConfirmLoadingMember(false);
          }}
        >
          <BorderModalContent>
            <GranteeFrom form={formGrantee} />
          </BorderModalContent>
        </Modal>
      ) : (
        <Drawer
          closable={false}
          placement="bottom"
          open={showModal}
          title={<div className="font-normal text-center">Set up a new grantee</div>}
          contentWrapperStyle={{
            height: "400px",
            borderRadius: "24px 24px 0px 0px",
            overflow: "hidden",
          }}
          onClose={() => {
            setModal(false);
            formGrantee.resetFields();
            setConfirmLoadingMember(false);
          }}
        >
          <GranteeFrom form={formGrantee} />
          <div className="flex justify-center mt-2">
            <Button type="primary" className="w-[64vw]" loading={confirmLoadingMember} onClick={handleAddGrantee}>
              Save
            </Button>
          </div>
        </Drawer>
      )}
    </>
  );
}

export default GrantCreate;
