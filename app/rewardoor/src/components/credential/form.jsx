import { Form, Input } from 'antd';
const FormItem = Form.Item;

// 如何实现远程验证
export default {
  11: ({ name }) => {
    return (
      <FormItem
        label='Tweet Link'
        name={[name, 'link']}
        rules={[
          {
            required: true,
            message: 'Please input your tweet link',
          },
          {
            required: false,
            message: 'Please input a valid url',
            type: 'url',
          },
        ]}
      >
        <Input placeholder='Paste tweet link here!' />
      </FormItem>
    );
  },
  1: ({ name }) => {
    return (
      <FormItem
        label='Tweet Link'
        name={[name, 'link']}
        rules={[
          {
            required: true,
            message: 'Please input your tweet link',
          },
          {
            required: false,
            message: 'Please input a valid url',
            type: 'url',
          },
        ]}
      >
        <Input placeholder='Paste tweet link here!' />
      </FormItem>
    );
  },
  2: ({ name }) => {
    return (
      <FormItem
        label='Twitter Retweet'
        name={[name, 'link']}
        rules={[
          {
            required: true,
            message: 'Please input your tweet link',
          },
          {
            required: false,
            message: 'Please input a valid url',
            type: 'url',
          },
        ]}
      >
        <Input placeholder='Paste tweet link here!' />
      </FormItem>
    );
  },
  3: ({ name }) => {
    return (
      <FormItem
        label='Tweet Space Link'
        name={[name, 'link']}
        rules={[
          {
            required: true,
            message: 'Please input your tweet link',
          },
          {
            required: false,
            message: 'Please input a valid url',
            type: 'url',
          },
        ]}
      >
        <Input placeholder='Paste twitter space link here!' />
      </FormItem>
    );
  },
};
