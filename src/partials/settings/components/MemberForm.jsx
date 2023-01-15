import React from "react";
import { Form, Input, Select, Radio } from "antd";
import { roleList, inviteList } from "@/utils/const";
import { Divider } from "antd";

export default function MemberFrom({ form }) {
  return (
    <Form
      form={form}
      layout="vertical"
      requiredMark={false}
      initialValues={{ inviteType: 2 }}
    >
      <Form.Item name="inviteType">
        <Radio.Group>
          {inviteList.map(({ label, value, disabled }) => {
            return (
              <Radio disabled={disabled} value={value} key={value}>
                {label}
              </Radio>
            );
          })}
        </Radio.Group>
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.isIncludingCliff !== currentValues.isIncludingCliff
        }
      >
        {({ getFieldValue }) => {
          return getFieldValue("inviteType") === 2 ? (
            <>
              <Divider orientation="left" plain>
                By Address
              </Divider>
              <Form.Item
                label="Role"
                name="userRole"
                rules={[
                  {
                    required: true,
                    message: "Please select the Role!",
                  },
                ]}
              >
                <Radio.Group buttonStyle="solid">
                  {roleList
                    .filter((role) => role.code !== 1)
                    .map((role) => (
                      <Radio.Button key={role.code} value={role.code}>
                        {role.desc}
                      </Radio.Button>
                    ))}
                </Radio.Group>
              </Form.Item>
              <Form.Item
                label="Name"
                name="granteeName"
                rules={[
                  {
                    required: true,
                    message: "Please input the Name!",
                  },
                ]}
              >
                <Input placeholder="Editable" />
              </Form.Item>

              <Form.Item
                label="Ethereum Address"
                name="granteeEthAddress"
                rules={[
                  {
                    required: true,
                    message: "Please input the Ethereum Address!",
                  },
                ]}
              >
                <Input placeholder="Copy the address and paste here..." />
              </Form.Item>
              <Form.Item
                label="Email Address"
                name="granteeEmail"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input the Email Address!",
                  },
                ]}
              >
                <Input placeholder="Editable" />
              </Form.Item>
            </>
          ) : null;
        }}
      </Form.Item>
    </Form>
  );
}
