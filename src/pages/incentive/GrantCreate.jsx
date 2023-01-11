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
import { saveDraftGrantData, getDraftGrantData } from "@/api/ls";
import { useSelector } from "react-redux";
import { grantType, dateFormat } from "../../utils/const";
import GranteeFrom from "./GranteeForm";
import GranteeDetailPreview from "./GranteeDetailPreview";
import dayjs from "dayjs";
import { useAsyncEffect } from "ahooks";
import { message } from "antd";
import BorderModalContent from "../component/BorderModalContent";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { loadWeb3, signGrantMetaMask } from "@/utils/web3";

dayjs.extend(customParseFormat);

const { Option } = Select;

function GrantCreate() {
  const [form] = Form.useForm();
  const [formGrantee] = Form.useForm();
  const [showModal, setModal] = useState(false);
  const userStore = useSelector((state) => state.user);
  const [confirmLoadingMember, setConfirmLoadingMember] = useState(false);
  const [confirmLoadingSign, setConfirmLoadingSign] = useState(false);
  const navigate = useNavigate();

  const granteeIdV = Form.useWatch("granteeId", form);
  const grantNumV = Form.useWatch("grantNum", form);
  const grantDateV = Form.useWatch("grantDate", form);
  const grantTypeV = Form.useWatch("grantType", form);

  const [userlist, setUserlist] = useState([]);
  const [isShowDetailPreview, updateIsShowDetailPreview] = useState(false);
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

  const web3Ref = useRef();
  useEffect(() => {
    async function asyncloadWeb3() {
      const web3 = await loadWeb3();
      web3Ref.current = web3;
    }
    asyncloadWeb3();
  }, []);

  useAsyncEffect(async () => {
    if (tipId && hasTipId) {
      const res = await getTIPInfo(tipId);
      setDetail(res);
    }
  }, [tipId]);

  useAsyncEffect(async () => {
    const projectId = userStore?.projects?.[0]?.projectId;
    if (projectId) {
      // console.log('setUserlist')
      const res = await getProjectUsers(projectId);
      setUserlist(res.users);
    }
  }, [userStore]);

  useAsyncEffect(async () => {
    const projectId = userStore?.projects?.[0]?.projectId;
    if (!hasTipId && projectId) {
      const res = await getIncentiveList(projectId);
      // console.log(res);
      setTipList(res);
    }
  }, [userStore]);

  useEffect(() => {
    // 在更新userList之后自动选择新增的
    if (newGrantee.current && userlist.length > 0) {
      form.setFieldValue("granteeId", newGrantee.current);
      newGrantee.current = null;
    }
  }, [userlist]);

  useEffect(() => {
    // 从ls 缓存恢复数据
    const projectId = userStore?.projects?.[0]?.projectId;
    if (projectId) {
      const storedData = getDraftGrantData(projectId, tipId);
      if (!storedData) return;
      const formValue = {
        ...storedData,
        grantDate: dayjs(storedData.grantDate, dateFormat),
        vestingScheduleDate: dayjs(storedData.vestingScheduleDate, dateFormat),
      };
      console.log('restore from ls');
      form.setFieldsValue(formValue);
    }
  }, [userStore]);

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
      vestingPeriod: planValues.vestingPeriod,
      cliffTime: planValues.cliffTime,
      cliffAmount: planValues.cliffAmount,
    };
    return values;
  }, []);

  async function handleCreate() {
    const planValues = await form.validateFields();
    const values = formatValue(planValues, userlist, userStore?.user?.userId);
    const res = await addGrant(values.incentivePlanId, values);
    return res;
  }

  function handleSaveAsDraft() {
    const projectId = userStore?.projects?.[0]?.projectId;
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
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }
  function handleAddGrantee() {
    const projectId = userStore?.projects?.[0]?.projectId;
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
  const handlePreview = () => {
    form
      .validateFields()
      .then(() => {
        updateIsShowDetailPreview(true);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  async function handleSign() {
    const projectId = userStore?.projects?.[0]?.projectId;
    const userId = userStore?.user?.userId;
    try {
      setConfirmLoadingSign(true);
      const grantInfo = await handleCreate();
      console.log(grantInfo);
      if(!grantInfo.success){
        message.error(grantInfo.message);
        setConfirmLoadingSign(false);
        updateIsShowDetailPreview(false);
        return;
      }

      await signGrantMetaMask(
        web3Ref.current,
        projectId,
        grantInfo?.entity?.grantId,
        userId
      );

      message.success("Create Grant Sucess!");
      navigate(`/grants/${grantInfo?.entity?.grantId}/sign`)
    } catch (error) {
      message.error(error.message || "稍后重试!");
      console.log("签名出错!");
    }
    setConfirmLoadingSign(false);
    updateIsShowDetailPreview(false);
  }

  return (
    <IncentiveLayout>
      <div className="lg:relative lg:flex">
        <div className="px-4 sm:px-6 lg:px-16 py-8 lg:grow lg:pr-8 xl:pr-16">
          <div className="lg:max-w-[500px]">
            <div className="mb-6 lg:mb-0">
              <header className="mb-6">
                <h1 className="text-2xl md:text-3xl text-slate-800 font-bold mb-2">
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
                    vestingPeriod: 4,
                    isIncludingCliff: false,
                  }}
                >
                  <div className="text-slate-800 font-semibold mb-4">
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

                  <div className="text-slate-800 font-semibold mb-4">
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
                              <div className="w-full flex justify-center items-center">
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

                  <div className="text-slate-800 font-semibold mb-4">
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
                      addonAfter="USDT/Token"
                    />
                  </Form.Item>

                  <div className="text-slate-800 font-semibold mb-4">
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
                        <Form.Item name="vestingPeriod" noStyle>
                          <Select style={{ width: 100 }}>
                            <Option value={1}>week</Option>
                            <Option value={4}>month</Option>
                            <Option value={52}>year</Option>
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
                          label="Cliff Time"
                          rules={[
                            {
                              required: true,
                              message: "Please input the Cliff Time!",
                            },
                          ]}
                        >
                          <InputNumber
                            placeholder="Editable amout"
                            style={{ width: "100%" }}
                            addonAfter={
                              <Form.Item name="vestingPeriod" noStyle>
                                <Select style={{ width: 100 }}>
                                  <Option value={1}>week</Option>
                                  <Option value={4}>month</Option>
                                  <Option value={52}>year</Option>
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
                onClick={handlePreview}
                type="primary"
                className="bg-[#6366F1]"
              >
                Preview
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

      <Modal
        width={1008}
        title="Grant Details"
        open={isShowDetailPreview}
        okText="Sign"
        cancelText="Close"
        onOk={handleSign}
        confirmLoading={confirmLoadingSign}
        onCancel={() => {
          updateIsShowDetailPreview(false);
          setConfirmLoadingSign(false);
        }}
      >
        <BorderModalContent>
          <GranteeDetailPreview
            grantInfo={{
              granteeId: granteeIdV,
              grantNum: grantNumV,
              grantDate: grantDateV,
              grantType: grantTypeV,
            }}
            plan={detail}
            grantee={userlist.find((v) => v.userId === granteeIdV)}
          />
        </BorderModalContent>
      </Modal>
    </IncentiveLayout>
  );
}

export default GrantCreate;
