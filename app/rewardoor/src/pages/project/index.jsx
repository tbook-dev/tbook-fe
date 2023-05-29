import { Form, Input, Select } from 'antd'
import Button from '@/components/button'
import { useState } from 'react'
import { createProject } from '@/api/incentive'
import { user } from '@tbook/store'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const { setAuthUser, setUser, setProjects, getUserInfo } = user

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
const dashboardOverView = `/dashboard/overview`

export default function () {
  const [form] = Form.useForm()
  const [confirmLoading, setConfirmLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleCreate () {
    setConfirmLoading(true)
    form
      .validateFields()
      .then(async values => {
        try {
          const res = await createProject(values)
          setConfirmLoading(false)
          console.log(res)
          getUserInfo()
            .then(response => {
              // console.log("response", response);
              dispatch(setAuthUser(true))
              dispatch(setUser(response?.user || {}))
              dispatch(setProjects(response?.projects || []))
              navigate(dashboardOverView)
            })
            .catch(err => {
              dispatch(setAuthUser(false))
              console.log(err, 'xxx')
            })
        } catch (err) {
          console.log(err)
        }
      })
      .catch(err => {
        setConfirmLoading(false)
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
            name='projectName'
            rules={[{ required: true, message: 'Project Name is required' }]}
          >
            <Input placeholder='Enter a Project Name' />
          </Form.Item>

          <Form.Item
            label='Project URL'
            name='projectUrl'
            rules={[{ required: true, message: 'Project URL is required' }]}
          >
            <Input
              placeholder='Enter a Project URL'
              prefix={location.origin + '/'}
            />
          </Form.Item>
          <Form.Item
            name='tags'
            label='Project Category'
            rules={[
              { required: true, message: 'Project Category is required' }
            ]}
          >
            <Select
              placeholder='Select the category'
              mode='multiple'
              allowClear
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
