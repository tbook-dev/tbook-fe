import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Form, Input, Select, DatePicker, InputNumber } from "antd";
import AppConfigProvider from "@/theme/LightProvider";
import { getAllocatPlan, addGrantRecord } from "@/api/incentive";
import { useCurrentProjectId, useCurrentProject } from "@tbook/hooks";
import _ from "lodash";
import { useResponsive } from "ahooks";
import { conf } from "@tbook/utils";
import { Back } from "@tbook/ui";
import { useAsyncEffect } from "ahooks";

const { dateFormat, defaultErrorMsg, minZeroValidator, emptyNotNegativeValidator, maxValidator, getDividePercent } =
  conf;

const formItemCol = { labelCol: { span: 10 }, wrapperCol: { span: 14 } };

function Record() {
  const [form] = Form.useForm();

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [plans, setPlans] = useState([]);

  const navigate = useNavigate();
  const projectId = useCurrentProjectId();
  const project = useCurrentProject();

  const { pc } = useResponsive();

  const tokenTotalAmount = project?.tokenInfo?.tokenTotalAmount || 100000000;

  function handleCreate() {
    form
      .validateFields()
      .then(async (values) => {
        setConfirmLoading(true);
        values.projectId = projectId;
        values.grantDate = values.grantDate.format(dateFormat);
        values.allocPlanName = plans.find((v) => v.value === values.allocPlanId)?.label;
        const res = await addGrantRecord(projectId, values);
        console.log(res);
        if (res.success) {
          navigate("/tokenTable");
        } else {
          setConfirmLoading(false);
          message.error(res.message || defaultErrorMsg);
        }
      })
      .catch((err) => {
        console.log(err, "error");
      })
      .finally(() => {
        setConfirmLoading(false);
      });
  }

  useAsyncEffect(async () => {
    if (projectId) {
      const info = await getAllocatPlan(projectId);
      const plans = JSON.parse(info.planList);
      const options = plans?.map((v) => ({ value: v.planId, label: v.planName }));
      setPlans([...options, { label: "Others", value: -2 }]);
    }
  }, [projectId]);

  return (
    <div className="w-full text-[#1E293B]">
      {!pc && <Back link="/tokenTable" />}
      <div className="pt-3 lg:py-12">
        <div className="mb-6  lg:w-[600px] mx-4 lg:mx-auto lg:mb-10">
          <div className="flex flex-col justify-center flex-auto ml-[52px] lg:ml-0 lg:text-c">
            <h1 className="mb-1 font-bold text-c11 lg:text-cwh3 dark:text-white">New Grant Record</h1>
            <h2 className="text-c2 lg:text-cwh2 dark:text-b-8">
              Add external allocation records to track the whole token allocation plan.
            </h2>
          </div>
        </div>

        <div className="mb-6  lg:w-[600px] mx-4 lg:mx-auto lg:mb-0">
          <div className="overflow-hidden bg-cw1 dark:lg:shadow-d3 rounded-xl ">
            <div className="relative px-3 py-4 lg:pb-0 lg:pt-6 lg:px-4">
              <Form
                {...(pc ? formItemCol : null)}
                form={form}
                labelAlign="left"
                colon={false}
                layout={pc ? "horizontal" : "vertical"}
                requiredMark={false}
              >
                <Form.Item
                  label="Holder Name"
                  name="holderName"
                  rules={[
                    {
                      required: true,
                      message: "Please input the Holder Name!",
                    },
                  ]}
                >
                  <Input placeholder="New Holder" />
                </Form.Item>

                <Form.Item
                  label="Token Allocation"
                  name="allocPlanId"
                  rules={[
                    {
                      required: true,
                      message: "Please select the Target Audiende!",
                    },
                  ]}
                >
                  <Select allowClear optionLabelProp="label" placeholder="Others" options={plans} />
                </Form.Item>

                <Form.Item label="Grant Proportion">
                  <div className="grid grid-cols-2 gap-x-2">
                    <Form.Item
                      name="percentage"
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
                        step={1}
                        precision={0}
                        min={1}
                        max={100}
                        placeholder="Proportion"
                        type="number"
                        suffix="%"
                        onChange={(evt) => {
                          const val = Number(evt.target.value);
                          form.setFieldValue("tokenAmount", (tokenTotalAmount * val) / 100);
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      name="tokenAmount"
                      rules={[
                        {
                          required: true,
                          message: "Missing!",
                        },
                      ]}
                    >
                      <InputNumber
                        onChange={(val) => {
                          form.setFieldValue("percentage", getDividePercent(val, Number(tokenTotalAmount), 4));
                        }}
                        style={{ width: "100%" }}
                        step={1}
                        precision={0}
                        min={1}
                        type="number"
                        placeholder="Token Amount"
                      />
                    </Form.Item>
                  </div>
                </Form.Item>

                <Form.Item
                  label="Grant Date"
                  name="grantDate"
                  rules={[
                    {
                      required: true,
                      message: "Please input the Grant Date!",
                    },
                  ]}
                >
                  <DatePicker className="w-full" />
                </Form.Item>

                <Form.Item
                  label={
                    <div className="flex text-right lg:block ">
                      Invest Amount <br />
                      <span className="ml-1 lg:ml-0 text-l-4">(optional)</span>
                    </div>
                  }
                  name="tokenValue"
                  rules={[
                    {
                      validator: emptyNotNegativeValidator("Invest amount"),
                    },
                  ]}
                >
                  <Input placeholder="Not set yet" type="number" suffix="USD" min={0} />
                </Form.Item>

                <AppConfigProvider>
                  <div className="pt-3 lg:pb-6 lg:pt-2">
                    <div className="flex justify-center">
                      <Link to="/tokenTable" className="hidden mr-10 lg:block">
                        <Button className="w-[120px]">Cancel</Button>
                      </Link>

                      <Button
                        onClick={handleCreate}
                        type="primary"
                        className="w-[64vw] lg:w-[120px]"
                        loading={confirmLoading}
                      >
                        Create
                      </Button>
                    </div>
                  </div>
                </AppConfigProvider>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Record;
