import { Form, Input, Select } from 'antd';
import FormFrame from './formFrame';

const categoryList = [
  'DeFi',
  'DAO',
  'SocialFi',
  'GameFi',
  'NFT',
  'Metaverse',
  'Tools',
  'Ecosystem',
  'Infra',
  'Safety',
  'Others',
];
export default function BasicInfo ({ form, ...props }) {
  const handleNextStep = () => {
    form.validateFields().then(values => {
      props.valueRef.current = {
        ...props.valueRef.current,
        ...values,
        category: values.category.join(','),
      };
      props.handleNextStep();
    });
  };
  return (
    <FormFrame {...props} handleNextStep={handleNextStep}>
      <Form
        form={form}
        layout='vertical'
        initialValues={props.valueRef.current.bascInfo}
      >
        <Form.Item
          label='Project Name'
          name='projectName'
          rules={[{ required: true, message: 'Project Name is required' }]}
        >
          <Input placeholder='Enter a Project Name' />
        </Form.Item>
        <Form.Item
          name='category'
          label='Project Category'
          rules={[{ required: true, message: 'Project Category is required' }]}
        >
          <Select
            placeholder='Select the category'
            mode='multiple'
            allowClear
            options={categoryList.map(v => ({ value: v, label: v }))}
          />
        </Form.Item>
        <Form.Item
          label='Project TMA'
          name='tmaLink'
          rules={[{ required: true, message: 'Project TMA is required' }]}
        >
          <Input placeholder='Enter a Project TMA' />
        </Form.Item>
      </Form>
    </FormFrame>
  );
}
