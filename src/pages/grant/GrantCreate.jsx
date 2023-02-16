import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  useParams,
  useNavigate,
  useSearchParams,
  Link,
} from "react-router-dom";
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
import { PlusOutlined } from "@ant-design/icons";
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
import {
  grantType,
  dateFormat,
  periodMap,
  formatDollar,
  maxValidator,
  minZeroValidator,
  tokenTypeList,
  timeLengthList,
} from "@/utils/const";
import useProjectAudience from "@/hooks/useProjectAudience";
import GranteeFrom from "../incentive/GranteeForm";
import dayjs from "dayjs";
import { useAsyncEffect, useResponsive } from "ahooks";
import BorderModalContent from "../component/BorderModalContent";
import customParseFormat from "dayjs/plugin/customParseFormat";
import useCurrentProjectId from "@/hooks/useCurrentProjectId";
import grantIcon from "@/images/incentive/grant.svg";
import Plan from "./plan";
import Title from "../component/Title";

dayjs.extend(customParseFormat);
const formItemCol = { labelCol: { span: 10 }, wrapperCol: { span: 14 } };

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
  const projectAudience = useProjectAudience();

  const { pc } = useResponsive();

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

  useAsyncEffect(async () => {
    if (!grantId) return;
    const grantInfo = await getGrantInfo(grantId);
    const formValue = {
      granteeId: grantInfo.granteeId,
      grantNum: grantInfo.grantNum,
      exercisePrice: grantInfo.exercisePrice,
      grantType: grantInfo.grantType,
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

  useEffect(() => {
    if(!showModal){
      formGrantee.resetFields()
    }
  }, [showModal])

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
      <div className="w-full lg:w-[600px] mx-auto text-[#1E293B]">
        <div className="pt-3 lg:pt-6">
          <div className="mb-6 lg:mb-0">
            <header className="mb-6">
              <img
                src={grantIcon}
                className="hidden w-24 h-24 mx-auto lg:block"
              />

              <h1 className="mb-6 lg:mb-10 text-[28px] leading-[32px] text-center lg:text-[56px] lg:leading-[64px]">
                New Grant
              </h1>
            </header>

            <Plan
              planName={detail?.incentivePlanName}
              targetAudince={
                projectAudience.find((v) => v.value == detail.target)?.label
              }
              availableAmount={formatDollar(detail?.totalTokenNum)}
            />

            <div className="mt-3 lg:mt-6">
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

                <div>
                  <Title text="Grantee" />
                  <Form.Item
                    label="Choose a Grantee"
                    name="granteeId"
                    rules={[
                      { required: true, message: "Please input the grantee!" },
                    ]}
                  >
                    <Select
                      placeholder="Search/Select"
                      open={openGrantee}
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
                        label:
                          item.name && item.name.length > 0
                            ? item.name
                            : item.mainWallet,
                        value: item.userId,
                      }))}
                    />
                  </Form.Item>
                </div>

                <div>
                  <Title text="Grant" />
                  <Form.Item name="tokenType">
                    <Radio.Group>
                      {tokenTypeList.map(({ label, value, disabled }) => {
                        return (
                          <Radio disabled={disabled} value={value} key={value}>
                            {label}
                          </Radio>
                        );
                      })}
                    </Radio.Group>
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
                    <Input
                      placeholder="Editable"
                      type="number"
                      suffix="Token"
                      min={0}
                    />
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
                    <Input
                      placeholder="Editable"
                      type="number"
                      suffix="USD"
                      min={0}
                    />
                  </Form.Item>
                </div>

                <div>
                  <Title text="Vesting" />
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
                    label="Vesting Start Date"
                    name="grantDate"
                    rules={[
                      {
                        required: true,
                        message: "Please input the Vesting Start Date!",
                      },
                    ]}
                  >
                    <DatePicker className="w-full" />
                  </Form.Item>

                  <Form.Item
                    label="Total Vesting Length"
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
                      <Select>
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
                            const grantDateV = await form.getFieldValue(
                              "grantDate"
                            );
                            if (vestingFrequencyV && grantDateV) {
                              const vestingTotalLengthV =
                                await form.getFieldValue("vestingTotalLength");
                              const vestingTotalPeriodV =
                                await form.getFieldValue("vestingTotalPeriod");
                              const totalEnd = grantDateV.add(
                                vestingTotalLengthV,
                                periodMap[vestingTotalPeriodV].toLowerCase()
                              );

                              const vestingPeriodV = await form.getFieldValue(
                                "vestingPeriod"
                              );
                              const vestEnd = grantDateV.add(
                                vestingFrequencyV,
                                periodMap[vestingPeriodV].toLowerCase()
                              );
                              // console.log('totalEnd',totalEnd.format(dateFormat))
                              // console.log('vestEnd',vestEnd.format(dateFormat))

                              if (totalEnd.isBefore(vestEnd)) {
                                return Promise.reject(
                                  new Error(
                                    "Total Vesting end time should before Vesting Frequency!"
                                  )
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
                      <Select>
                        {timeLengthList.map((v) => (
                          <Option value={v.value} key={v.value}>
                            {v.label}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Form.Item>

                  <Form.Item
                    label=""
                    name="isIncludingCliff"
                    valuePropName="checked"
                  >
                    <Checkbox>including cliff duration</Checkbox>
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
                                message:
                                  "Please input the Cliff Duration Length!",
                              },
                              {
                                validator: async (_, cliffTimeV) => {
                                  const grantDateV = await form.getFieldValue(
                                    "grantDate"
                                  );
                                  if (cliffTimeV && grantDateV) {
                                    const vestingTotalLengthV =
                                      await form.getFieldValue(
                                        "vestingTotalLength"
                                      );
                                    const vestingTotalPeriodV =
                                      await form.getFieldValue(
                                        "vestingTotalPeriod"
                                      );
                                    const totalEnd = grantDateV.add(
                                      vestingTotalLengthV,
                                      periodMap[
                                        vestingTotalPeriodV
                                      ].toLowerCase()
                                    );

                                    const cliffPeriodV =
                                      await form.getFieldValue("cliffPeriod");
                                    const cliffEnd = grantDateV.add(
                                      cliffTimeV,
                                      periodMap[cliffPeriodV].toLowerCase()
                                    );
                                    // console.log('totalEnd',totalEnd.format(dateFormat))
                                    // console.log('vestEnd',vestEnd.format(dateFormat))

                                    if (totalEnd.isBefore(cliffEnd)) {
                                      return Promise.reject(
                                        new Error(
                                          "Total Vesting end time should before cliff end!"
                                        )
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
                            <Select>
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
                              validator: minZeroValidator("Cliff Amount"),
                            },
                            {
                              validator: maxValidator(100, "Cliff Amount"),
                            },
                          ]}
                        >
                          <Input
                            placeholder="Editable"
                            suffix="%"
                            type="number"
                            max={100}
                            min={0}
                          />
                        </Form.Item>
                      ) : null
                    }
                  </Form.Item>
                </div>
              </Form>
            </div>
          </div>

          <div className="pt-10 pb-[60px]">
            <div className="flex justify-center">
              <Link to="/" className="hidden lg:block">
                <Button>Cancel</Button>
              </Link>
              <Button
                onClick={handleCreate}
                type="primary"
                className="bg-[#6366F1] lg:ml-10 w-[64vw] lg:w-auto ml-0"
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
          title={
            <div className="font-normal text-center">Set up a new grantee</div>
          }
          contentWrapperStyle={{
            height: "400px",
            borderRadius: "24px 24px 0px 0px",
            overflow: "hidden",
          }}
          onClose={() => setModal(false)}
        >
          <GranteeFrom form={formGrantee} />
          <div className="flex justify-center mt-2">
            <Button
              type="primary"
              className="w-[64vw]"
              loading={confirmLoadingMember}
              onClick={handleAddGrantee}
            >
              Save
            </Button>
          </div>
        </Drawer>
      )}
    </>
  );
}

export default GrantCreate;
