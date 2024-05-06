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
export default function BasicInfo (props) {
  const [form] = Form.useForm();
  const handleNextStep = () => {
    form.validateFields().then(values => {
      props.valueRef.current.bascInfo = values;
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
          name='tags'
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
          name='projectTMA'
          rules={[{ required: true, message: 'Project TMA is required' }]}
        >
          <Input placeholder='Enter a Project TMA' />
        </Form.Item>
      </Form>
    </FormFrame>
  );
}
