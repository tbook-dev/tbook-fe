import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import IncentiveLayout from "./Layout";
import { Button, Space, Form, Input, Select, InputNumber, Modal } from "antd";
import { getTIPInfo } from "@/api/incentive";

function GrantCreate() {
  const [form] = Form.useForm();
  const [showModal, setModal] = useState(false);

  const [detail, setDetail] = useState({
    incentivePlanId: 0,
    projectId: 0,
    target: 2,
    status: 1,
    effectiveDate: "",
    projectName: "",
  });
  const { tipId } = useParams();

  useEffect(() => {
    if (tipId) {
      getTIPInfo(tipId).then((res) => {
        console.log(res);
        setDetail(res);
      });
    }
  }, [tipId]);
  console.log("tipId->", tipId);
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
      });
  }

  function submitGrant(evt) {
    const d = new FormData();
    d.append("planId", planId);
    d.append("quantity", quantity);
    d.append("exercisePrice", exercisePrice);
    // d.append("buyBack", buyBack);
    d.append("vestingStartDate", vestingStartDate);
    d.append("vestingEndDate", vestingSchedule);

    evt.preventDefault();
  }

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

                <Form form={form} layout="vertical">
                  <div className="text-slate-800 font-semibold mb-4">
                    Grantee Detail
                  </div>

                  <Form.Item
                    label="Grantee"
                    name="grantee"
                    rules={[
                      { required: true, message: "Please input the grantee!" },
                    ]}
                  >
                    <Select placeholder="Search/Select">
                      <Select.Option value="name">name</Select.Option>
                    </Select>
                  </Form.Item>

                  <div className="text-slate-800 font-semibold mb-4">
                    Grant Detail
                  </div>

                  <Form.Item
                    label="Quantity"
                    name="Quantity"
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
                      <Select.Option value="employee">employee</Select.Option>
                      <Select.Option value="adviser">adviser</Select.Option>
                      <Select.Option value="ser grouwth">
                        user grouwth
                      </Select.Option>
                      <Select.Option value="investor">investor</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label="Pool for the TIP"
                    name="poorForTip"
                    rules={[
                      {
                        required: true,
                        message: "Please input the Pool for the TIP!",
                      },
                    ]}
                  >
                    <InputNumber min={0} style={{ width: "100%" }} />
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
        okText="I Accept"
        cancelText="Close"
        onCancel={() => {
          setModal(false);
        }}
      >
        <div className="border-[#E2E8F0] border-y pt-10 pb-20">
          <div className="mt-7">
            <p className="text-[#475569] text-sm">TIP Name</p>
            <p className="text-[#1E293B] text-base	">nameValue</p>
          </div>
        </div>
      </Modal>
    </IncentiveLayout>
  );
}

export default GrantCreate;
