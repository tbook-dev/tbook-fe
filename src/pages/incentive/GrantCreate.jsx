import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import IncentiveLayout from "./Layout";
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
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  getTIPInfo,
  getProjectUsers,
  addGrant,
  addProjectUser,
  getIncentiveList,
} from "@/api/incentive";
import {
  saveDraftGrantData,
  getDraftGrantData,
  clearDraftGrantData,
} from "@/api/ls";
import { useSelector } from "react-redux";
import { grantType, dateFormat } from "../../utils/const";
import GranteeFrom from "./GranteeForm";
import dayjs from "dayjs";
import { useAsyncEffect } from "ahooks";
import { message } from "antd";
import BorderModalContent from "../component/BorderModalContent";
import customParseFormat from "dayjs/plugin/customParseFormat";
import useCurrentProjectId from "@/hooks/useCurrentProjectId";

dayjs.extend(customParseFormat);

const { Option } = Select;

function GrantCreate() {
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [formGrantee] = Form.useForm();
  const [showModal, setModal] = useState(false);
  const userStore = useSelector((state) => state.user);
  const [confirmLoadingMember, setConfirmLoadingMember] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const projectId = useCurrentProjectId();

  const [userlist, setUserlist] = useState([]);
  const [tipList, setTipList] = useState([]);
  const newGrantee = useRef(null);

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
      setUserlist(res.users);
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

  useEffect(() => {
    // 从ls恢复数据
    // const projectId = userStore?.projects?.[0]?.projectId;
    console.log(tipId, projectId);
    if (tipId && projectId) {
      try {
        const storedData = getDraftGrantData(projectId, tipId);
        // console.log("xxx->", storedData);
        if (!storedData) return;
        const formValue = {
          ...storedData,
          isIncludingCliff: !!storedData.cliffTime,
          grantDate: dayjs(storedData.grantDate, dateFormat),
          vestingScheduleDate: dayjs(
            storedData.vestingScheduleDate,
            dateFormat
          ),
        };
        console.log("restore from ls");
        form.setFieldsValue(formValue);
      } catch (error) {
        console.log("error", error);
      }
    }
  }, [projectId, tipId]);

  const formatValue = useCallback((planValues, userlist, userId) => {
    const grantValues = userlist.find((v) => v.userId === planValues.granteeId);
    const finalTipId = hasTipId ? tipId : planValues.incentivePlanId;
    const values = {
      incentivePlanId: finalTipId,
      grantCreatorId: userId,
      granteeId: grantValues.userId,
      granteeName: grantValues.name,
      granteeEthAddress: grantValues.mainWallet,
      granteeEmail: grantValues.email,
      grantType: planValues.grantType,
      grantNum: planValues.grantNum,
      exercisePrice: planValues.exercisePrice,
      grantDate: planValues.grantDate.format(dateFormat),
      vestingScheduleDate: dayjs().format(dateFormat),
      grantStatus: 1,
      vestingTotalLength: planValues.vestingTotalLength,
      vestingTotalPeriod: planValues.vestingTotalPeriod,
      cliffTime: planValues.cliffTime,
      cliffAmount: planValues.cliffAmount,
      cliffPeriod: planValues.cliffPeriod,
      vestingFrequency: planValues.vestingFrequency,
      vestingPeriod: planValues.vestingPeriod,
    };
    return values;
  }, []);

  async function handleCreate() {
    const planValues = await form.validateFields();
    setLoadingCreate(true);
    const values = formatValue(planValues, userlist, userStore?.user?.userId);
    const grantInfo = await addGrant(values.incentivePlanId, values);
    if (!grantInfo.success) {
      message.error(grantInfo.message);
      setLoadingCreate(false);
      return;
    }
    clearDraftGrantData(projectId,tipId)
    setLoadingCreate(false);
    navigate(`/grants/${grantInfo?.entity?.grantId}/sign`);
  }

  function handleSaveAsDraft() {
    // const projectId = userStore?.projects?.[0]?.projectId;
    // tipId只从url里面取
    form
      .validateFields()
      .then((planValues) => {
        const values = formatValue(
          planValues,
          userlist,
          userStore?.user?.userId
        );
        saveDraftGrantData(projectId, tipId, {
          ...values,
          isIncludingCliff: planValues.isIncludingCliff,
        });
        message.success("Save Draft Sucess!");
        window.history.back()
      })
      .catch((err) => {
        console.log(err, "error");
      });
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
        getProjectUsers(projectId).then((res) => {
          setUserlist(res?.users || []);
          // console.log(userRes);
        });
      });
    });
  }

  return (
    <IncentiveLayout>
      <div className="lg:relative lg:flex">
        <div className="px-4 py-8 sm:px-6 lg:px-16 lg:grow lg:pr-8 xl:pr-16">
          <div className="lg:max-w-[500px]">
            <div className="mb-6 lg:mb-0">
              <header className="mb-6">
                <h1 className="mb-2 text-2xl font-bold md:text-3xl text-slate-800">
                  New Grant
                </h1>
              </header>
              <div>
                <Form
                  form={form}
                  layout="vertical"
                  requiredMark={false}
                  initialValues={{
                    grantType: 1,
                    vestingTotalPeriod: 3,
                    vestingPeriod: 3,
                    cliffPeriod: 3,
                    isIncludingCliff: false,
                  }}
                >
                  <div className="mb-4 font-semibold text-slate-800">
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
                  )}

                  <div className="mb-4 font-semibold text-slate-800">
                    Grantee Detail
                  </div>

                  <Form.Item
                    label="Grantee"
                    name="granteeId"
                    rules={[
                      { required: true, message: "Please input the grantee!" },
                    ]}
                  >
                    <Select
                      placeholder="Search/Select"
                      dropdownRender={(menu) => {
                        return (
                          <>
                            {menu}
                            <Divider style={{ margin: "8px 0" }} />
                            <Button
                              type="text"
                              className="w-full"
                              onClick={() => setModal(true)}
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
                        label: item.name,
                        value: item.userId,
                      }))}
                    />
                  </Form.Item>

                  <div className="mb-4 font-semibold text-slate-800">
                    Grant Detail
                  </div>

                  <Form.Item
                    label="Quantity"
                    name="grantNum"
                    rules={[
                      {
                        required: true,
                        message: "Please input the Quantity!",
                      },
                    ]}
                  >
                    <InputNumber
                      min={0}
                      style={{ width: "100%" }}
                      placeholder="Editable amout"
                      addonAfter="Token"
                    />
                  </Form.Item>
                  <Form.Item
                    label="Exercise Price"
                    name="exercisePrice"
                    rules={[
                      {
                        required: true,
                        message: "Please input the Exercise Price!",
                      },
                    ]}
                  >
                    <InputNumber
                      min={0}
                      style={{ width: "100%" }}
                      placeholder="Editable amout"
                      addonAfter="USDT"
                    />
                  </Form.Item>

                  <div className="mb-4 font-semibold text-slate-800">
                    Vesting Schedule
                  </div>
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

                  <Form.Item
                    label="Grant Start Date"
                    name="grantDate"
                    rules={[
                      {
                        required: true,
                        message: "Please input the Grant Start Date!",
                      },
                    ]}
                  >
                    <DatePicker className="w-full" />
                  </Form.Item>
                  <Form.Item
                    label="Length"
                    name="vestingTotalLength"
                    rules={[
                      {
                        required: true,
                        message: "Please input the Length!",
                      },
                    ]}
                  >
                    <InputNumber
                      min={0}
                      style={{ width: "100%" }}
                      placeholder="Editable amout"
                      addonAfter={
                        <Form.Item name="vestingTotalPeriod" noStyle>
                          <Select style={{ width: 100 }}>
                            <Option value={1}>day</Option>
                            <Option value={2}>week</Option>
                            <Option value={3}>month</Option>
                            <Option value={4}>year</Option>
                          </Select>
                        </Form.Item>
                      }
                    />
                  </Form.Item>
                  <Form.Item
                    label="Vesting Frequency"
                    name="vestingFrequency"
                    rules={[
                      {
                        required: true,
                        message: "Please input the Length!",
                      },
                    ]}
                  >
                    <InputNumber
                      min={0}
                      style={{ width: "100%" }}
                      placeholder="Editable amout"
                      addonAfter={
                        <Form.Item name="vestingPeriod" noStyle>
                          <Select style={{ width: 100 }}>
                            <Option value={1}>day</Option>
                            <Option value={2}>week</Option>
                            <Option value={3}>month</Option>
                            <Option value={4}>year</Option>
                          </Select>
                        </Form.Item>
                      }
                    />
                  </Form.Item>
                  <Form.Item
                    label=""
                    name="isIncludingCliff"
                    valuePropName="checked"
                  >
                    <Checkbox>including cliff</Checkbox>
                  </Form.Item>

                  <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, currentValues) =>
                      prevValues.isIncludingCliff !==
                      currentValues.isIncludingCliff
                    }
                  >
                    {({ getFieldValue }) =>
                      getFieldValue("isIncludingCliff") === true ? (
                        <Form.Item
                          name="cliffTime"
                          label="Cliff Duration"
                          rules={[
                            {
                              required: true,
                              message: "Please input the Cliff Duration!",
                            },
                          ]}
                        >
                          <InputNumber
                            style={{ width: "100%" }}
                            addonAfter={
                              <Form.Item name="cliffPeriod" noStyle>
                                <Select style={{ width: 100 }}>
                                  <Option value={1}>day</Option>
                                  <Option value={2}>week</Option>
                                  <Option value={3}>month</Option>
                                  <Option value={4}>year</Option>
                                </Select>
                              </Form.Item>
                            }
                          />
                        </Form.Item>
                      ) : null
                    }
                  </Form.Item>
                  <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, currentValues) =>
                      prevValues.isIncludingCliff !==
                      currentValues.isIncludingCliff
                    }
                  >
                    {({ getFieldValue }) =>
                      getFieldValue("isIncludingCliff") === true ? (
                        <Form.Item
                          name="cliffAmount"
                          label="Cliff Amount"
                          rules={[
                            {
                              required: true,
                              message: "Please input the Cliff Amount!",
                            },
                          ]}
                        >
                          <InputNumber
                            placeholder="Editable amout"
                            style={{ width: "100%" }}
                            addonAfter="%"
                            max={100}
                          />
                        </Form.Item>
                      ) : null
                    }
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>

          <div className="max-w-[700px] pt-40	">
            <hr className="my-6 border-t border-slate-200" />
            <div className="flex justify-around">
              <Button onClick={handleSaveAsDraft}>Save as a draft</Button>
              <Button
                onClick={handleCreate}
                type="primary"
                className="bg-[#6366F1]"
                loading={loadingCreate}
              >
                create
              </Button>
            </div>
          </div>
        </div>
      </div>

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
          setConfirmLoadingMember(false);
        }}
      >
        <BorderModalContent>
          <GranteeFrom form={formGrantee} />
        </BorderModalContent>
      </Modal>

    </IncentiveLayout>
  );
}

export default GrantCreate;
