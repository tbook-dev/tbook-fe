import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import IncentiveLayout from "./Layout";
import {
  Button,
  Space,
  Form,
  Input,
  Select,
  InputNumber,
  Modal,
  Statistic,
} from "antd";
import { targetMap } from "../../utils/const";
import { useSelector } from "react-redux";
import { createTIP } from "../../api/incentive";

function PlanCreate() {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const nameValue = Form.useWatch("incentivePlanName", form);
  const totalValue = Form.useWatch("totalTokenNum", form);
  const targetValue = Form.useWatch("target", form);
  const userStore = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [showModal, setModal] = useState(false);

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
        values.projectId = userStore?.projects?.[0]?.projectId;

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
    <IncentiveLayout>
      <div className="lg:relative lg:flex">
        <div className="px-4 sm:px-6 lg:px-16 py-8 lg:grow lg:pr-8 xl:pr-16">
          <div className="lg:max-w-[500px]">
            <div className="mb-6 lg:mb-0">
              <header className="mb-6">
                <h1 className="text-2xl md:text-3xl text-slate-800 font-bold mb-2">
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
                        <InputNumber min={0} style={{ width: 350 }} />
                      </Form.Item>
                      <p className="text-[#94A3B8] text-xs">
                        （20% Total Token)
                      </p>
                    </Space>
                    <p className="text-[#94A3B8] text-xs mt-1">
                      当前剩余可用 102,090,000虚拟 token{" "}
                    </p>
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
                    <Select allowClear>
                      {Object.entries(targetMap).map(([value, desc]) => {
                        return (
                          <Select.Option value={value} key={value}>
                            {desc}
                          </Select.Option>
                        );
                      })}
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
                      <h3 className="text-sm	font-semibold	">
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
            <div className="flex justify-center">
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
        title="Token Basic Info"
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
            <p className="flex">
              <Statistic
                value={totalValue}
                valueStyle={{
                  color: "#1E293B",
                  fontSize: "16px",
                  lineHeight: "20px",
                  fontWeight: '600'
                }}
                suffix="Token"
              />
              <span className="ml-2 text-[#1E293B] leading-5	text-[12px]">(20% of Total Token)</span>
            </p>
          </div>

          <div className="mt-7">
            <p className="text-[#475569] text-sm">Target Audiende</p>
            <p className="text-[#1E293B] text-base	font-semibold">
              {targetMap[targetValue]}
            </p>
          </div>

          <div className="mt-7">
            <p className="text-[#475569] text-sm">Plan Administrator</p>

            <div className="flex">
              <img
                src={userStore?.user?.avatar}
                className="flex-none w-[50px] h-[50px] mr-2 block bg-white rounded-full"
              />
              <div className="flex-auto">
                <h3 className="text-sm	font-semibold">
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
    </IncentiveLayout>
  );
}

export default PlanCreate;
