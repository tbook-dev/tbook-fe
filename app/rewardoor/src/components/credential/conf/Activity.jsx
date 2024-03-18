import { Form, Input, Switch } from 'antd';
const FormItem = Form.Item;

export default {
  8: {
    render: ({ name }) => {
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
    pick: ['visitPageName', 'link'],
  },
  10: {
    render: ({ name }) => {
      return (
        <FormItem
          label='Event Name'
          name={[name, 'eventName']}
          rules={[
            {
              required: true,
              message: 'Please input the name',
            },
          ]}
        >
          <Input placeholder='Paste input the name!' />
        </FormItem>
      );
    },
    pick: ['eventName'],
  },
  14: {
    // nftplay, local sign activity
    render: ({ name, ...props }) => {
      console.log({ props });
      return (
        <div className='space-y-3'>
          <FormItem
            label='Event Name'
            name={[name, 'eventName']}
            rules={[
              {
                required: true,
                message: 'Please input the Event Name!',
              },
            ]}
          >
            <Input placeholder='Paste input the Event Name!' />
          </FormItem>
          <FormItem label='Add Event Location' name={[name, 'eventLocation']}>
            <Input placeholder='Offline location or virtual link' />
          </FormItem>
          <FormItem
            label='Need Check-in'
            name={[name, 'check']}
            rules={[
              {
                required: true,
                message: 'Please check in',
              },
            ]}
          >
            <Switch checkedChildren='yes' unCheckedChildren='no' />
          </FormItem>
        </div>
      );
    },
  },
};
