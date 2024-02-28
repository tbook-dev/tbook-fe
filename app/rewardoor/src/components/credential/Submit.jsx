import { Form, Input } from 'antd';
const FormItem = Form.Item;

export default {
  13: ({ name }) => {
    return (
      <>
        <FormItem
          label='Title'
          name={[name, 'title']}
          rules={[
            {
              required: true,
              message: 'Please input the title',
            },
          ]}
        >
          <Input placeholder='Enter the aggregation Title, like Submit Exchange Address' />
        </FormItem>
        <FormItem label='Description' name={[name, 'description']}>
          <Input placeholder='Enter the description...' />
        </FormItem>
        <p className='text-sm font-medium text-c-9 mb-3'>
          After users fill in their addresses, you can view the address list in
          the participant list.
        </p>
      </>
    );
  },
};
