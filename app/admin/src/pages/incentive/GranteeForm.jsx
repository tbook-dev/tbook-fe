import {Form, Input} from 'antd'
import React from 'react';

export default function GranteeFrom({form}) {

    return <Form form={form} layout="vertical" requiredMark={false}>
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
            <Input
                placeholder="Editable"
            />
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
            <Input
                placeholder="Copy the address and paste here..."
            />
        </Form.Item>
        <Form.Item
            label="Email Address"
            name="granteeEmail"
            rules={[
                {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                },
                {
                    required: true,
                    message: "Please input the Email Address!",
                },
            ]}
        >
            <Input
                placeholder="Editable"
            />
        </Form.Item>

    </Form>
}

