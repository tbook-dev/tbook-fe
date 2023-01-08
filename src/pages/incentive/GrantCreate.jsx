import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import IncentiveLayout from "./Layout";
import {
  Button,
  Space,
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
} from "@/api/incentive";
import { useSelector } from "react-redux";
import { grantType, dateFormat } from "../../utils/const";
import GranteeFrom from "./GranteeForm";
import GranteeDetailPreview from "./GranteeDetailPreview";
import dayjs from "dayjs";
import { useAsyncEffect } from "ahooks";
import { message } from "antd";

const { Option } = Select;

function GrantCreate() {
  const [form] = Form.useForm();
  const [formGrantee] = Form.useForm();
  const [showModal, setModal] = useState(false);
  const userStore = useSelector((state) => state.user);
  const [userlist, setUserlist] = useState([]);
  const [isShowDetailPreview, updateIsShowDetailPreview] = useState(false);

  const [detail, setDetail] = useState({
    incentivePlanId: 0,
    projectId: 0,
    target: 2,
    status: 1,
    effectiveDate: "",
    projectName: "",
  });
  const { tipId } = useParams();
  console.log("x->userlist", userlist);
  useEffect(() => {
    if (tipId) {
      getTIPInfo(tipId).then((res) => {
        console.log(res);
        setDetail(res);
      });
    }
  }, [tipId]);

  useAsyncEffect(async () => {
    const projectId = userStore?.projects?.[0]?.projectId;
    if (projectId) {
      const res = await getProjectUsers(projectId);
      setUserlist(res.users);
    }
  }, [userStore]);

  function handleSave() {
    form
      .validateFields()
      .then((values) => {
        console.log(values);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  function handleCreate() {
    form
      .validateFields()
      .then((planValues) => {
        console.log(planValues, userlist);
        const grantValues = userlist.find(v => v.userId === planValues.granteeId)
        const values = {
          incentivePlanId: tipId,
          grantCreatorId: userStore?.user?.userId,
          granteeId: grantValues.granteeId,
          granteeName: grantValues.granteeName,
          granteeEthAddress: grantValues.granteeEthAddress,
          granteeEmail: grantValues.granteeEmail,
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
        console.log(planValues, grantValues, tipId);
        addGrant(tipId, values).then(() => {
          message.success('Create Grant Sucess!')
        });
        // setModal(true);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  function handleGrantee() {
    const projectId = userStore?.projects?.[0]?.projectId;
    formGrantee.validateFields().then((values) => {
      addProjectUser(projectId, {
        projectId,
        walletAddress: values.granteeEthAddress,
        name: values.granteeName,
        email: values.granteeEmail,
        userRole: 4,
      }).then(() => {
        getProjectUsers(projectId).then((res) => {
          setUserlist(res?.users || []);
          setModal(false);
        });
      });
    });
    // Promise.all([form.validateFields(), formGrantee.validateFields()])
    //   .then(([planValues, grantValues]) => {
    //     const values = {
    //       incentivePlanId: tipId,
    //       grantCreatorId: userStore?.user?.userId,
    //       granteeId: planValues.granteeId,
    //       granteeName: grantValues.granteeName,
    //       granteeEthAddress: grantValues.granteeEthAddress,
    //       granteeEmail: grantValues.granteeEmail,
    //       grantType: planValues.grantType,
    //       grantNum: planValues.grantNum,
    //       exercisePrice: planValues.exercisePrice,
    //       grantDate: planValues.grantDate.format(dateFormat),
    //       vestingScheduleDate: dayjs().format(dateFormat),
    //       grantStatus: 1,
    //       vestingTotalLength: planValues.vestingTotalLength,
    //       vestingPeriod: planValues.vestingPeriod,
    //       //                  vestingInitialNum:'',
    //       cliffTime: planValues.cliffTime,
    //       cliffAmount: planValues.cliffAmount,
    //     };
    //     console.log(planValues, grantValues, tipId, values);
    //     addGrant(tipId, values).then((res) => {
    //       console.log(res);
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err, "error");
    //   });
  }

  function handleSign() {}

  return (
    <IncentiveLayout>
      <div className="lg:relative lg:flex">
        <div className="px-4 sm:px-6 lg:px-16 py-8 lg:grow lg:pr-8 xl:pr-16">
          <div className="lg:max-w-[500px]">
            <div className="mb-6 lg:mb-0">
              <div className="mb-3">
                <div className="flex text-sm font-medium text-slate-400 space-x-2">
                  <span className="text-slate-500">Grants</span>
                  <span>-&gt;</span>
                  <span className="text-[#6366F1]">New Grant</span>
                </div>
              </div>
              <header className="mb-6">
                <h1 className="text-2xl md:text-3xl text-slate-800 font-bold mb-2">
                  New Grant
                </h1>
              </header>
              <div>
                <div className="mb-6">
                  <div className="text-slate-800 font-semibold mb-4">
                    Plan Detail
                  </div>
                  <div>
                    <p className="text-xs text-[#475569]">Plan Name</p>
                    <p className="text-base font-semibold text-[#1E293B]">
                      {detail.incentivePlanName}
                    </p>
                  </div>
                </div>

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
                    Vesting Detail
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
            <div className="text-right">
              <Space>
                {/* <Button onClick={handleSave}>Save</Button> */}
                <Button
                  onClick={handleCreate}
                  type="primary"
                  className="bg-[#6366F1]"
                >
                  Create
                </Button>
              </Space>
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
        onOk={handleGrantee}
        onCancel={() => {
          setModal(false);
        }}
      >
        <GranteeFrom form={formGrantee} />
      </Modal>

      <Modal
        width={1008}
        title="Grant Details"
        open={isShowDetailPreview}
        okText="Sign"
        cancelText="Close"
        onOk={handleSign}
        onCancel={() => {
          setModal(false);
        }}
      >
        <GranteeDetailPreview planForm={form} granteeForm={formGrantee} />
      </Modal>
    </IncentiveLayout>
  );
}

export default GrantCreate;
