import { Button, Form, Input, Select } from 'antd'
import { useState } from 'react'

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
  'Others'
]
export default function () {
  const [form] = Form.useForm()
  const [confirmLoading, setConfirmLoading] = useState(false)

  function handleCreate () {
    form
      .validateFields()
      .then(values => {
        setConfirmLoading(true)
        console.log(values)
      })
      .catch(err => {
        console.log(err, 'error')
      })
  }
  return (
    <div className='w-full min-h-screen text-white'>
      <div className='w-[600px] mx-auto pt-20'>
        <h1 className='text-5xl text-center mb-12 font-bold'>New Project</h1>

        <Form
          form={form}
          layout='vertical'
          requiredMark={false}
          // initialValues={{ category: 'DeFi' }}
        >
          <Form.Item
            label='Project Name'
            name='name'
            rules={[{ required: true, message: 'Project Name is required' }]}
          >
            <Input placeholder='Enter a Project Name' />
          </Form.Item>

          <Form.Item
            label='Project URL'
            name='url'
            rules={[{ required: true, message: 'Project URL is required' }]}
          >
            <Input
              placeholder='Enter a Project URL'
              prefix={location.origin + '/'}
            />
          </Form.Item>
          <Form.Item
            name='category'
            label='Project Category'
            rules={[
              { required: true, message: 'Project Category is required' }
            ]}
          >
            <Select
              placeholder='Select the category'
              options={categoryList.map(v => ({ value: v, label: v }))}
            />
          </Form.Item>
        </Form>

        <div className='flex justify-center py-20'>
          <Button className='mr-6'>Cancel</Button>
          <Button
            type='primary'
            onClick={handleCreate}
            loading={confirmLoading}
          >
            Create
          </Button>
        </div>
      </div>
    </div>
  )
}
