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
export default function AddtionInfo (props) {
  const [form] = Form.useForm();
  return (
    <FormFrame {...props}>
      <Form form={form} layout='vertical'>
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
