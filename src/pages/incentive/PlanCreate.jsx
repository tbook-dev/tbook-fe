import React, { useCallback, useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Button,
  Space,
  Form,
  Input,
  Select,
  InputNumber,
  Modal,
  Statistic,
  Divider,
} from "antd";
import { CheckOutlined, DeleteOutlined } from "@ant-design/icons";
import { targetMap } from "../../utils/const";
import { useSelector } from "react-redux";
import { createTIP } from "../../api/incentive";
import useCurrentProjectId from "@/hooks/useCurrentProjectId";
import useCurrentProject from "@/hooks/useCurrentProject";
import _ from "lodash";

function PlanCreate() {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const nameValue = Form.useWatch("incentivePlanName", form);
  const totalValue = Form.useWatch("totalTokenNum", form);
  const targetValue = Form.useWatch("target", form);
  const userStore = useSelector((state) => state.user);
  const navigate = useNavigate();
  const projectId = useCurrentProjectId();
  const project = useCurrentProject();
  const [showModal, setModal] = useState(false);
  const [customizeOptions, setCustomizeOptions] = useState(null);
  const inputRef = useRef(null);
  const preOptions = Object.entries(targetMap).map(([value, desc]) => ({
    label: desc,
    value: value,
  }));
  const options = customizeOptions
    ? [...preOptions, customizeOptions]
    : preOptions;

  useEffect(() => {
    if (userStore?.user?.userId) {
      if (userStore?.projects?.length === 0) {
        navigate(`/create`, { replace: true });
      }
    }
  }, [userStore?.user?.userId]);

  const formatPercent = useCallback(() => {
    const res =
      _.divide(
        totalValue || 0,
        project?.tokenInfo?.tokenTotalAmount || Number.MAX_SAFE_INTEGER
      ) * 100;

    const r2 = _.round(res, 4);

    return r2;
  }, [project, totalValue]);

  function handleCreate() {
    form
      .validateFields()
      .then((values) => {
        console.log(values);
        setModal(true);
      })
      .catch((err) => {
        console.log(err, "error");
        setModal(false);
      });
  }
  function handleConfirm() {
    setConfirmLoading(true);

    form
      .validateFields()
      .then((values) => {
        values.incentivePlanAdminId = userStore?.user?.userId;
        values.projectId = projectId;
        if (values.target === "7") {
          values.customized_target_name = customizeOptions.label;
        }

        createTIP(values).then((res) => {
          setConfirmLoading(false);
          setModal(false);
          navigate(`/incentive/${res.incentivePlanId}`);
        });
      })
      .catch((err) => {
        console.log(err, "error");
        setModal(false);
      });
  }

  return (
    <>
      <div className="lg:relative lg:flex">
        <div className="px-4 py-8 sm:px-6 lg:px-16 lg:grow lg:pr-8 xl:pr-16">
          <div className="lg:max-w-[500px]">
            <div className="mb-6 lg:mb-0">
              <header className="mb-6">
                <h1 className="mb-2 text-2xl font-bold md:text-3xl text-slate-800">
                  New Token Incentive Plan
                </h1>
              </header>
              <div>
                <Form form={form} layout="vertical" requiredMark={false}>
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
                    <Input placeholder="the name for your incentive plan, like GoPlusCommunityGrowth..." />
                  </Form.Item>
                  <Form.Item label="Token Options Pool Size">
                    <Space>
                      <Form.Item
                        name="totalTokenNum"
                        noStyle
                        rules={[
                          {
                            required: true,
                            message:
                              "Please input the Token Options Pool Size!",
                          },
                        ]}
                      >
                        <InputNumber
                          placeholder="0"
                          min={0}
                          max={project?.tokenInfo?.surplusTokenNum}
                          style={{ width: 350 }}
                        />
                      </Form.Item>
                      <div className="text-[#94A3B8] text-xs">
                        （{formatPercent()}% Total Token)
                      </div>
                    </Space>
                    <div className="text-[#94A3B8] text-xs mt-1 flex">
                      There are
                      <Statistic
                        value={project?.tokenInfo?.surplusTokenNum}
                        valueStyle={{
                          color: "#94A3B8",
                          fontSize: "12px",
                        }}
                      />
                      virtual tokens available
                    </div>
                  </Form.Item>
                  <Form.Item
                    label="Target Audiende"
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
                      placeholder="mark a label for you incentive plan"
                      // options={preOptions}
                      dropdownRender={(menu) => {
                        return (
                          <>
                            {menu}
                            {!customizeOptions && (
                              <>
                                <Divider style={{ margin: "8px 0" }} />
                                <div className="flex items-center px-2 pb-1">
                                  <Input
                                    placeholder="Editable..."
                                    maxLength={30}
                                    ref={inputRef}
                                    style={{ marginRight: 8 }}
                                  />
                                  <Button
                                    type="text"
                                    onClick={async () => {
                                      const val =
                                        inputRef.current?.input?.value;

                                      val &&
                                        setCustomizeOptions({
                                          label: val,
                                          value: "7",
                                        });
                                      form.setFieldValue("target", "7");
                                    }}
                                    icon={<CheckOutlined />}
                                  />
                                </div>
                              </>
                            )}
                          </>
                        );
                      }}
                    >
                      {options.map((option) => (
                        <Select.Option
                          label={option.label}
                          value={option.value}
                          key={option.value}
                        >
                          <div className="flex justify-between">
                            <span>{option.label}</span>
                            {option.value == "7" && (
                              <Button
                                onClick={(evt) => {
                                  evt.stopPropagation();
                                  setCustomizeOptions(null);
                                }}
                                type="text"
                                className="mr-2"
                              >
                                <DeleteOutlined />
                              </Button>
                            )}
                          </div>
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label="Plan Administrator"
                    name="incentivePlanAdminId"
                  >
                    <div className="w-[143px] flex items-center	flex-col">
                      <img
                        src={userStore?.user?.avatar}
                        className="w-[50px] h-[50px] block bg-white rounded-full"
                      />
                      <h3 className="text-sm font-semibold ">
                        {userStore?.user?.name}
                      </h3>
                      <p className="w-[82px] text-[#94A3B8] truncate text-ellipsis overflow-hidden">
                        {userStore?.user?.mainWallet}
                      </p>
                    </div>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>

          <div className="max-w-[700px] pt-40	">
            <hr className="my-6 border-t border-slate-200" />
            <div className="flex justify-around">
              <Link to="/incentive">
                <Button>Cancel</Button>
              </Link>

              <Button
                onClick={handleCreate}
                type="primary"
                className="bg-[#6366F1]"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        width={460}
        title="Plan Confirmation"
        open={showModal}
        okText="Confirm"
        onOk={handleConfirm}
        cancelText="Close"
        confirmLoading={confirmLoading}
        onCancel={() => {
          setModal(false);
        }}
      >
        <div className="border-[#E2E8F0] border-y px-[26px] py-[19px] mx-[-24px]">
          <div>
            <p className="text-[#475569] text-sm">Plan Name</p>
            <p className="text-[#1E293B] text-base	font-semibold">{nameValue}</p>
          </div>

          <div className="mt-7">
            <p className="text-[#475569] text-sm">Total Token</p>
            <div className="flex">
              <Statistic
                value={totalValue}
                valueStyle={{
                  color: "#1E293B",
                  fontSize: "16px",
                  lineHeight: "20px",
                  fontWeight: "600",
                }}
                suffix="Token"
              />
              <span className="ml-2 text-[#1E293B] leading-5	text-[12px]">
                ({formatPercent()}% of Total Token)
              </span>
            </div>
          </div>

          <div className="mt-7">
            <p className="text-[#475569] text-sm">Target Audiende</p>
            <div className="text-[#1E293B] text-base	font-semibold">
              {targetValue === "7"
                ? customizeOptions.label
                : targetMap[targetValue]}
            </div>
          </div>

          <div className="mt-7">
            <p className="text-[#475569] text-sm">Plan Administrator</p>

            <div className="flex">
              <img
                src={userStore?.user?.avatar}
                className="flex-none w-[50px] h-[50px] mr-2 block bg-white rounded-full"
              />
              <div className="flex-auto">
                <h3 className="text-sm font-semibold">
                  {userStore?.user?.name}
                </h3>
                <p className="w-[82px] text-[#94A3B8] truncate text-ellipsis overflow-hidden">
                  {userStore?.user?.mainWallet}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default PlanCreate;
