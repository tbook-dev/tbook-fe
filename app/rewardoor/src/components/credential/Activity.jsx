import { Form, Input } from 'antd';
const FormItem = Form.Item;

export default {
  8: ({ name }) => {
    return (
      <div className='space-y-3'>
        <FormItem
          label='Name'
          name={[name, 'visitPageName']}
          rules={[
            {
              required: true,
              message: 'Please input the name',
            },
          ]}
        >
          <Input placeholder='Please enter the page name or site name' />
        </FormItem>
        <FormItem
          label='Link'
          name={[name, 'link']}
          rules={[
            {
              required: true,
              message: 'Please input the link',
            },
            {
              required: false,
              message: 'Please input a valid url',
              type: 'url',
            },
          ]}
        >
          <Input placeholder='Please paste the link the users need to visit' />
        </FormItem>
      </div>
    );
  },
  10: ({ name }) => {
    return (
      <FormItem
        label='Event Name'
        name={[name, 'name']}
        rules={[
          {
            required: true,
            message: 'Please input the name',
          },
        ]}
      >
        <Input placeholder='Paste tweet link here!' />
      </FormItem>
    );
  },
};
