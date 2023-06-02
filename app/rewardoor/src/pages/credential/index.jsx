import { Form, Input } from 'antd'
import { useState } from 'react'
import Button from '@/components/button'
import { useNavigate } from 'react-router-dom'
import { useCurrentProject } from '@tbook/hooks'
import { createCredential } from '@/api/incentive'

const jumpLink = `/campaign`
const cancelLink = `/dashboard/overview`

export default function () {
  const { projectId } = useCurrentProject()
  const [credentialForm] = Form.useForm()

  const [confirmLoading, setConfirmLoading] = useState(false)
  const navigate = useNavigate()

  function handleCredential () {
    credentialForm
      .validateFields()
      .then(async values => {
        setConfirmLoading(true)
        const res = await createCredential({
          projectId,
          name: values.credential
        })
        setConfirmLoading(false)
        navigate(jumpLink)
        console.log(res)
      })
      .catch(err => {
        setConfirmLoading(false)
        console.log(err, 'error')
      })
  }

  function handleCancel () {
    navigate(cancelLink)
  }
  return (
    <div className='w-full min-h-screen text-white'>
      <div className='w-[600px] mx-auto pt-20'>
        <Form form={credentialForm} layout='vertical' requiredMark={false}>
          <h1 className='text-5xl  mb-12 font-bold'>New Credential</h1>
          <h3 className='mb-3 text-xl font-medium'>Define new credential </h3>
          <Form.Item
            label='Define credentials to describe the behavior, achievement, or qualification that determine eligibility of the campaign.'
            name='credential'
            rules={[{ required: true, message: 'Credential is required' }]}
          >
            <Input placeholder='describe the behavior in the campaign, e.g Uniswap trader' />
          </Form.Item>
        </Form>

        <div className='flex justify-center py-20'>
          <Button className='mr-6' onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            type='primary'
            onClick={handleCredential}
            loading={confirmLoading}
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  )
}
