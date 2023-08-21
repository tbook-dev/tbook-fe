import { Form, Input, Select, Upload, message } from 'antd'
import Button from '@/components/button'
import { useState } from 'react'
import { createProject } from '@/api/incentive'
import { useNavigate } from 'react-router-dom'
import Logo from '@/components/logo'
import bannerUrl from '@/images/aboard-banner.png'
import bannerBg from '@/images/aboard-bg.png'
import Account from '@/components/account'
import { useQueryClient } from 'react-query'
import { useEffect } from 'react'
import uploadIcon from '@/images/icon/upload.svg'
import uploadFile from '@/utils/upload'

// const { setAuthUser, setUser, setProjects, getUserInfo } = user

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
const title = 'Tell us about your project...'
const desc =
  'Help TBOOK customize your experience accordingly, and help users understand your project easily.'
const dashboardOverView = `/`
const defaultErrorMsg = 'Create project failed'

export default function () {
  const [form] = Form.useForm()
  const [confirmLoading, setConfirmLoading] = useState(false)
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const projectName = Form.useWatch('projectName', form)
  const [messageApi, contextHolder] = message.useMessage()

  useEffect(() => {
    form.setFieldsValue({ projectUrl: projectName })
  }, [projectName])

  const hanleUpload = ({ onSuccess, onError, file }) => {
    uploadFile(file).then(onSuccess).catch(onError)
  }
  const normFile = e => {
    console.log('Upload event:', e)
    if (Array.isArray(e)) {
      return e
    }
    return e?.fileList
  }

  function handleCreate () {
    setConfirmLoading(true)
    form
      .validateFields()
      .then(async values => {
        try {
          values.avatarUrl = values.avatarUrl?.[0]?.response
          const res = await createProject(values)
          setConfirmLoading(false)
          if (!res.success) {
            messageApi.error(res?.msg || defaultErrorMsg)
            return
          }
          console.log(res)
          queryClient.refetchQueries('userInfo')
          navigate(dashboardOverView)
        } catch (err) {
          messageApi.error(err?.data?.message || defaultErrorMsg)
          setConfirmLoading(false)
          console.log(err)
        }
      })
      .catch(err => {
        setConfirmLoading(false)
        console.log(err, 'error')
      })
  }
  return (
    <div className='w-full min-h-screen text-white flex pl-[280px]'>
      <div className='fixed left-0 inset-y-0 w-[240px] bg-b-1 pb-20 rounded-r-4xl  flex flex-col justify-end'>
        <Logo />
        <img
          src={bannerUrl}
          className='w-[592px] absolute top-1/4 right-[51px] max-w-none'
        />
        <img
          src={bannerBg}
          className='w-[592px] absolute top-1/4 right-[51px] max-w-none'
        />
        <div className='relative'>
          <Account />
        </div>
      </div>
      <div className='w-[630px] mx-auto pt-20'>
        <div className='mb-12'>
          <h1 className='text-5xl font-bold mb-1'>{title}</h1>
          <p className='font-medium text-base'>{desc}</p>
        </div>

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

          <Form.Item label='Project Logo'>
            <Form.Item
              valuePropName='fileList'
              getValueFromEvent={normFile}
              noStyle
              name='avatarUrl'
              rules={[
                {
                  required: true,
                  message: 'Project Logo is required'
                }
              ]}
            >
              <Upload.Dragger
                customRequest={hanleUpload}
                multiple={false}
                accept='image/*'
                maxCount={1}
              >
                <p className='ant-upload-drag-icon flex justify-center'>
                  <img src={uploadIcon} />
                </p>
                <p className='ant-upload-text'>Upload an image</p>
                <p className='ant-upload-hint'>296*312 or higher</p>
                <p className='ant-upload-hint'>recommended Max 20MB.</p>
              </Upload.Dragger>
            </Form.Item>
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
          <Button
            type='primary'
            onClick={handleCreate}
            loading={confirmLoading}
            className='w-full'
          >
            Create Project
          </Button>
        </div>
      </div>
      {contextHolder}
    </div>
  )
}
