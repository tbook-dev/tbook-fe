import { Button, Form, Input, Upload, DatePicker, Select } from 'antd'
import { useState } from 'react'
import clsx from 'clsx'
import uploadIcon from '@/images/icon/upload.svg'

const textMap = {
  1: 'Set up',
  2: 'Credential',
  3: 'Incentive'
}
const NFTMap = {
  1: 'Token shares the same image',
  2: 'Token shares different images',
  3: 'Import a deployed NFT'
}
const { RangePicker } = DatePicker

export default function () {
  const [step, setStep] = useState('1')

  const [setUpForm] = Form.useForm()

  const [credentialForm] = Form.useForm()
  const [confirmLoading, setConfirmLoading] = useState(false)
  const credentialList = [
    {
      label: 'User of GoPlus Security Service',
      value: 1
    },
    {
      label: 'Ethereum Transactors_10 transactions',
      value: 2
    },
    {
      label: 'USDT Trader-Receive',
      value: 3
    },
    {
      label: 'Buyer of GoPlus Security Service',
      value: 4
    },
    {
      label: 'GoPlus Security - Twitter Followers',
      value: 5
    },
    {
      label: 'GoPlus Security - Twitter Space Participants',
      value: 6
    }
  ]
  const normFile = e => {
    console.log('Upload event:', e)
    if (Array.isArray(e)) {
      return e
    }
    return e?.fileList
  }
  function handleStepUp () {
    setUpForm
      .validateFields()
      .then(values => {
        setConfirmLoading(true)
        console.log(values)
      })
      .catch(err => {
        setConfirmLoading(false)
        console.log(err, 'error')
      })
  }
  function handleCredential () {
    credentialForm
      .validateFields()
      .then(values => {
        setConfirmLoading(true)
        console.log(values)
      })
      .catch(err => {
        setConfirmLoading(false)
        console.log(err, 'error')
      })
  }
  function handleClick () {
    if (step === '1') {
      handleStepUp()
    }
    if (step === '2') {
      handleCredential()
    }
  }
  return (
    <div className='w-full min-h-screen text-white'>
      <div className='w-[600px] mx-auto pt-20'>
        <h1 className='text-5xl  mb-12 font-bold'>New Campaign</h1>

        <div className='h-10 grid grid-cols-3 gap-x-10 mb-3'>
          {Object.entries(textMap).map(([n, v]) => {
            return (
              <div
                key={v}
                className={clsx(
                  n === step ? 'text-white' : 'text-c-9',
                  'font-medium text-sm bg-b-1 cursor-pointer flex justify-center items-center',
                  'rounded-md select-none'
                )}
                onClick={() => {
                  setStep(n)
                }}
              >
                {`${n} ${v}`}
              </div>
            )
          })}
        </div>
        {step === '1' && (
          <>
            <Form form={setUpForm} layout='vertical' requiredMark={false}>
              <Form.Item
                label='Campaign Title'
                name='title'
                rules={[
                  { required: true, message: 'Campaign Title is required' }
                ]}
              >
                <Input placeholder='Enter a campaign title' />
              </Form.Item>

              <Form.Item label='Campaign Card Banner'>
                <Form.Item
                  valuePropName='fileList'
                  getValueFromEvent={normFile}
                  noStyle
                >
                  <Upload.Dragger name='banner' action='/upload.do'>
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
                label='Description'
                name='description'
                rules={[
                  { required: true, message: 'Description Title is required' }
                ]}
              >
                <Input placeholder='Enter' />
              </Form.Item>
              <Form.Item
                label='Schedule'
                name='schedule'
                rules={[{ required: true, message: 'Schedule is required' }]}
              >
                <RangePicker className='w-full' />
              </Form.Item>
            </Form>
          </>
        )}

        {step === '2' && (
          <Form
            form={credentialForm}
            layout='vertical'
            requiredMark={false}
            // initialValues={{ category: 'DeFi' }}
          >
            <Form.Item
              label='Choose the Credentials or Define new Credential'
              name='name'
              rules={[{ required: true, message: 'NFT Name is required' }]}
            >
              <Select
                options={credentialList}
                className='w-full'
                mode='multiple'
              />
            </Form.Item>
          </Form>
        )}

        <div className='flex justify-center py-20'>
          <Button className='mr-6'>Cancel</Button>
          <Button type='primary' onClick={handleClick} loading={confirmLoading}>
            Create
          </Button>
        </div>
      </div>
    </div>
  )
}
