import { Form, Input } from 'antd';
const FormItem = Form.Item;

export default {
  12: {
    render: ({ name }) => {
      return (
        <FormItem
          label='Snapshot Proposal URL'
          name={[name, 'link']}
          rules={[
            {
              required: true,
              message: 'Please input your Snapshot link',
            },
            {
              required: false,
              message: 'Please input a valid url',
              type: 'url',
            },
          ]}
        >
          <Input placeholder='Please enter a specific Snapshot Proposal' />
        </FormItem>
      );
    },
    pick: ['link'],
  },
};
