import { Form, Input, Switch, InputNumber } from 'antd';
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
    render: ({ name, form, formName }) => {
      const checked = form.getFieldValue([formName, name, 'check']);

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
          <FormItem
            label='Need Check-in'
            name={[name, 'check']}
            rules={[
              {
                required: true,
                message: 'Please check in!',
              },
            ]}
          >
            <Switch checkedChildren='yes' unCheckedChildren='no' />
          </FormItem>
          {checked && (
            <div>
              <FormItem
                label='Number of Checkpoint'
                tooltip='After the participant checking in at all checkpoints, the
              credential can be successfully verified.'
                name={[name, 'checkNum']}
                rules={[
                  {
                    required: true,
                    message: 'Please input the number!',
                  },
                ]}
              >
                <InputNumber
                  placeholder='Enter the number of checkpoint'
                  min={1}
                  step={1}
                  className='w-full'
                />
              </FormItem>
              <div className='flex items-center gap-x-1 text-[#717374] text-xs'>
                <img
                  src='https://rd-worker.xgamma.workers.dev/img/62c809dedf264051a24dbf8112af810b'
                  className='size-4 object-center object-contain'
                />
                powered by NFTPlay
              </div>
            </div>
          )}
        </div>
      );
    },
    pick: ['eventName', 'check'],
    defaultOptions: {
      check: false,
    },
  },
};
