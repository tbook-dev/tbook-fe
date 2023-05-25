import { Button, Form, Input, Upload, DatePicker } from 'antd'
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
  const [NFTtype, setNFTtype] = useState('2')

  const [setUpForm] = Form.useForm()

  const [credentialForm] = Form.useForm()
  const [confirmLoading, setConfirmLoading] = useState(false)

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
                key={v.step}
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
            <div className='h-10 grid grid-cols-3 gap-x-2.5 mb-3 bg-b-1'>
              {Object.entries(NFTMap).map(([n, v]) => {
                return (
                  <div
                    key={v}
                    className={clsx(
                      n === NFTtype ? 'text-white' : 'text-c-9',
                      'font-medium text-xs bg-b-1 cursor-pointer flex justify-center items-center',
                      'rounded-md select-none'
                    )}
                    onClick={() => {
                      setNFTtype(n)
                    }}
                  >
                    {v}
                  </div>
                )
              })}
            </div>
            {NFTtype === '2' && (
              <>
                <Form.Item
                  label='NFT Name'
                  name='name'
                  rules={[{ required: true, message: 'NFT Name is required' }]}
                >
                  <Input placeholder='Enter an NFT name visible on blockchain that serves as an official verification' />
                </Form.Item>

                <Form.Item
                  label='Symbol'
                  name='symbol'
                  rules={[{ required: true, message: 'Symbol is required' }]}
                >
                  <Input placeholder='Token ticker for NFT contract visible on blockchain that serves as an official verification' />
                </Form.Item>

                <Form.Item label='Dragger'>
                  <Form.Item
                    name='dragger'
                    valuePropName='fileList'
                    getValueFromEvent={normFile}
                    noStyle
                  >
                    <Upload.Dragger name='files' action='/upload.do'>
                      <p className='ant-upload-drag-icon flex justify-center'>
                        <img src={uploadIcon} />
                      </p>
                      <p className='ant-upload-text'>
                        Upload the compress of the images
                      </p>
                      <p className='ant-upload-hint'>
                        ZIP,RAR of images. Maximum file size 100 MB.
                      </p>
                    </Upload.Dragger>
                  </Form.Item>
                </Form.Item>

                <Form.Item
                  label='Minting Cap'
                  name='cap'
                  rules={[
                    { required: true, message: 'Minting Cap is required' }
                  ]}
                >
                  <Input placeholder='Enter the number of minting cap' />
                </Form.Item>
              </>
            )}

            {NFTtype === '3' && (
              <Form.Item
                label='NFT Contract'
                name='contract'
                rules={[
                  { required: true, message: 'NFT Contract is required' }
                ]}
              >
                <Input placeholder='Paste your NFT Contract Address here' />
              </Form.Item>
            )}
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
