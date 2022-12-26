import React, { useState } from "react";
import IncentiveLayout from "./Layout";
import { Button, Space, Form, Input, Select, InputNumber, Modal } from "antd";
import { target } from "../../utils/const";
import { useSelector } from "react-redux";
import { createTIP } from '../../api/incentive'

function PlanCreate() {
  const [form] = Form.useForm();
  const nameValue = Form.useWatch("incentivePlanName", form);
  const totalValue = Form.useWatch("total", form);
  const audiendeValue = Form.useWatch("audiende", form);
  const userStore = useSelector((state) => state.user);

  const [showModal, setModal] = useState(false);
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
    form
      .validateFields()
      .then((values) => {
        values.incentivePlanAdminId  =  userStore?.user?.userId
        values.projectId = userStore?.projects?.[0]?.projectId
        
        createTIP(values)
          .then(res => {
            console.log(res)
          })
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
              <div className="mb-3">
                <div className="flex text-sm font-medium text-slate-400 space-x-2">
                  <span className="text-slate-500">Incentives</span>
                  <span>-&gt;</span>
                  <span className="text-[#6366F1]">Create a TIP</span>
                </div>
              </div>
              <header className="mb-6">
                <h1 className="text-2xl md:text-3xl text-slate-800 font-bold mb-2">
                  New Token Incentive Plan
                </h1>
              </header>
              <div>
                <div className="text-slate-800 font-semibold mb-4">
                  TIP Basic Info
                </div>

                <Form form={form} layout="vertical">
                  <Form.Item
                    label="TIP Name"
                    name="incentivePlanName"
                    rules={[
                      { required: true, message: "Please input the TIP Name!" },
                    ]}
                  >
                    <Input placeholder="Name the TIP..." />
                  </Form.Item>
                  <Form.Item
                    label="Total Token"
                    name="total"
                    rules={[
                      {
                        required: true,
                        message: "Please input the Total Token!",
                      },
                    ]}
                  >
                    <InputNumber min={0} style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item
                    label="Target Audiende"
                    name="audiende"
                    rules={[
                      {
                        required: true,
                        message: "Please select the Target Audiende!",
                      },
                    ]}
                  >
                    <Select allowClear>
                      {Object.entries(target).map(([value, desc]) => {
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
            <div className="text-right">
              <Space>
                <Button onClick={handleSave}>Save</Button>
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
        title="Token Basic Info"
        open={showModal}
        okText="Confirm"
        onOk={handleConfirm}
        cancelText="Close"
        onCancel={() => {
          setModal(false);
        }}
      >
        <div className="border-[#E2E8F0] border-y pt-10 pb-20">
          <div className="mt-7">
            <p className="text-[#475569] text-sm">TIP Name</p>
            <p className="text-[#1E293B] text-base	">{nameValue}</p>
          </div>

          <div className="mt-7">
            <p className="text-[#475569] text-sm">Total Token</p>
            <p className="text-[#1E293B] text-base	">{totalValue}</p>
          </div>

          <div className="mt-7">
            <p className="text-[#475569] text-sm">Target Audiende</p>
            <p className="text-[#1E293B] text-base	">{target[audiendeValue]}</p>
          </div>

          <div className="mt-7">
            <p className="text-[#475569] text-sm">Plan Administrator</p>

            <div className="flex">
              <img
                src={userStore?.user?.avatar}
                className="flex-none w-[50px] h-[50px] mr-2 block bg-white rounded-full"
              />
              <div className="flex-auto">
                <h3 className="text-sm	font-semibold	">
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
