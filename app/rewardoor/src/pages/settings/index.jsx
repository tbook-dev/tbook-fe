import { Form, Input, Typography, Upload, notification } from 'antd'
import useUserInfo from '@/hooks/queries/useUserInfo'
import { projectUrlPrefix } from '@/utils/conf'
import copyIcon from '@/images/icon/copy.svg'
import Button from '@/components/button'
import { useState } from 'react'
import xGray from '@/images/icon/x-gray.svg'
import dcGray from '@/images/icon/dc-gray.svg'
import tgGray from '@/images/icon/tg-gray.svg'
import uploadFile from '@/utils/upload'
import { LoadingOutlined } from '@ant-design/icons'
import { updateProject } from '@/api/incentive'

const pageTitle = 'Settings'
const { Paragraph } = Typography
const FormSection = ({ title, children }) => (
  <div className='space-y-2'>
    <h3 className='text-xl font-bold text-c-9'>{title}</h3>
    {children}
  </div>
)
export default function Settings () {
  const [form] = Form.useForm()
  const [api, contextHolder] = notification.useNotification()
  const { project, userDc, userTwitter } = useUserInfo()
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [uplading, setUploading] = useState(false)
  const avatarUrl = Form.useWatch('avatarUrl', { form, preserve: true })
  const hanleUpload = ({ onSuccess, onError, file }) => {
    setUploading(true)
    uploadFile(file)
      .then(res => {
        form.setFieldValue('avatarUrl', res)
        onSuccess(res)
      })
      .catch(onError)
      .finally(() => setUploading(false))
  }
  const handleUpdate = () => {
    setConfirmLoading(true)
    form
      .validateFields()
      .then(async values => {
        const fd = { ...project, ...values, avatarUrl }
        await updateProject(fd)
        api.success({ message: 'Successfully Saved！' })
      })
      .catch(e => {
        api.error({ message: 'Saved Error！' })
      })
      .finally(() => {
        setConfirmLoading(false)
      })
  }

  return (
    <div className='text-white relative flex flex-col justify-between min-h-full w-[520px]'>
      <div>
        <h2 className='text-3xl font-black text-[#C8C8C8] mb-10'>
          {pageTitle}
        </h2>

        <Form
          form={form}
          layout='vertical'
          initialValues={{
            avatarUrl: project.avatarUrl,
            projectName: project.projectName,
            projectDescription: project.projectDescription,
            websiteUrl: project?.websiteUrl,
            telegramUrl: project?.telegramUrl
          }}
        >
          <div className='space-y-5'>
            <div className='flex items-center gap-x-6'>
              <img
                src={avatarUrl}
                className='w-20 h-20 object-center object-cover rounded-full'
              />
              <Upload
                maxCount={1}
                customRequest={hanleUpload}
                showUploadList={false}
              >
                <button className='px-6 py-2 bg-b-1 text-c-9 text-sm rounded-2.5xl shadow-s2'>
                  Upload
                  {uplading && <LoadingOutlined className='ml-1' />}
                </button>
              </Upload>
            </div>

            <Form.Item
              name='projectName'
              label={
                <h3 className='text-xl font-bold text-c-9'>Project Name</h3>
              }
            >
              <Input />
            </Form.Item>

            <FormSection title='Project URL'>
              <Paragraph
                style={{
                  marginBottom: 0,
                  color: '#C8C8C8',
                  fontWeight: 500,
                  fontSize: 14,
                  display: 'flex',
                  alignItems: 'center'
                }}
                copyable={{
                  text: project?.projectUrl,
                  icon: <img src={copyIcon} className='w-4 h-4' />
                }}
              >
                {projectUrlPrefix + project?.projectUrl}
              </Paragraph>
            </FormSection>

            <FormSection title='Project Category'>
              <div className='flex items-center gap-2'>
                {project.tags.map((tag, index) => (
                  <div
                    key={index}
                    className='px-4 py-0.5 rounded-xl border border-white'
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </FormSection>

            <Form.Item
              name='projectDescription'
              label={
                <h3 className='text-xl font-bold text-c-9'>
                  Project Introduction
                </h3>
              }
            >
              <Input.TextArea placeholder='This is a project introduction' />
            </Form.Item>

            <Form.Item
              name='websiteUrl'
              label={<h3 className='text-xl font-bold text-c-9'>Website</h3>}
            >
              <Input placeholder='Enter website URL' />
            </Form.Item>

            <FormSection title='Official Links'>
              <div className='grid grid-cols-2 gap-x-5 gap-y-3'>
                {userTwitter?.connected ? (
                  <button className='h-10 rounded-2.5xl flex items-center px-5 gap-x-2 bg-[#1DA1F2] text-white'>
                    <img src={xGray} className='w-[18px] h-[18px]' />
                    {userTwitter?.twitterName}
                  </button>
                ) : (
                  <a
                    href=''
                    target='_blank'
                    className='h-10 rounded-2.5xl flex items-center px-5 bg-[#121212] text-[#C8C8C8] hover:text-[#C8C8C8] gap-x-2'
                  >
                    <img src={xGray} className='w-[18px] h-[18px]' />
                    Connect with Twitter
                  </a>
                )}
                {userDc?.connected ? (
                  <button className='h-10 rounded-2.5xl flex items-center px-5 gap-x-2 bg-[#5865F2] text-white'>
                    <img src={dcGray} className='w-[18px] h-[18px]' />
                    {userDc?.username}
                  </button>
                ) : (
                  <a
                    href='https://discord.com/api/oauth2/authorize?client_id=1146414186566537288&redirect_uri=https%3A%2F%2Frewardoor-staging.tbook.com%2Fdc_callback&response_type=code&scope=identify%20guilds%20guilds.members.read'
                    target='_blank'
                    className='h-10 rounded-2.5xl flex items-center px-5 bg-[#121212] text-[#C8C8C8] hover:text-[#C8C8C8] gap-x-2'
                  >
                    <img src={dcGray} className='w-[18px] h-[18px]' />
                    Connect with Discord
                  </a>
                )}
                <Form.Item name='telegramUrl'>
                  <Input
                    placeholder='Enter Telegram URL'
                    prefix={<img src={tgGray} className='mr-1' />}
                  />
                </Form.Item>
              </div>
            </FormSection>
          </div>
        </Form>
      </div>

      <div className='flex justify-center py-20'>
        <Button
          type='primary'
          onClick={handleUpdate}
          loading={confirmLoading}
          className='w-full'
        >
          Save
        </Button>
      </div>
      {contextHolder}
    </div>
  )
}
