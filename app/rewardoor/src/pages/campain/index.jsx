import { Form, Input, Upload, DatePicker, Select } from 'antd'
import { useState } from 'react'
import clsx from 'clsx'
import { PlusOutlined } from '@ant-design/icons'
import closeIcon from '@tbook/share/images/icon/close4.svg'
import TagList from '@/components/tagList'
import TagRadio from '@/components/tagRadio'
import Button from '@/components/button'
import { useNavigate } from 'react-router-dom'

import uploadIcon from '@/images/icon/upload.svg'
const dashboardLink = `/dashboard/campaign`
const textMap = {
  1: {
    title: 'Set upt',
    cancel: 'Cancel',
    next: 'Next'
  },
  2: {
    title: 'Credential',
    cancel: 'Previous',
    next: 'Next'
  },
  3: {
    title: 'Incentive',
    cancel: 'Previous',
    next: 'Create'
  }
}
const incentiveMethodList = [
  {
    title: 'Anyone who get the credentials',
    desc: 'Anyone who gets the credentials can claim the reward.',
    value: 1
  },
  {
    title: 'FCFS',
    desc: 'First come, first served. Whoever gets the credentials first can claim the reward first.',
    value: 2
  },
  {
    title: 'Lucky Draw',
    desc: 'A random selection of participants from those who meet the requirements.',
    value: 3
  }
]
const rewardDistributionMethod = [
  {
    label: 'Airdrop',
    value: 1
  },
  {
    label: 'Claim',
    value: 2
  }
]

const incentiveAssetsTypeList = [
  { label: '🎁 NFT', value: 1 },
  { label: '💎 POINTS', value: 2 }
]
const { RangePicker } = DatePicker

export default function () {
  const [step, setStep] = useState('1')

  const [setUpForm] = Form.useForm()
  const [credentialForm] = Form.useForm()
  const [incentiveForm] = Form.useForm()

  const [confirmLoading, setConfirmLoading] = useState(false)
  const navigate = useNavigate()

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
  function handleIncentive () {
    console.log('xx')
    incentiveForm
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
  function handleCreate () {
    if (step === '1') {
      handleStepUp()
    }
    if (step === '2') {
      handleCredential()
    }
    if (step === '3') {
      handleIncentive()
    }
  }
  function handleCancel () {
    if (step === '1') {
      navigate(dashboardLink)
      return
    }
    if (step !== '3') {
      setStep(Number(step) - 1 + '')
      return
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
                key={n}
                className={clsx(
                  n === step ? 'text-white' : 'text-c-9',
                  'font-medium text-sm bg-b-1 flex justify-center items-center',
                  'rounded-md select-none'
                  // 'cursor-pointer'
                )}
                // onClick={() => {
                //   setStep(n)
                // }}
              >
                {`${n} ${v.title}`}
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

        {step === '3' && (
          <Form
            form={incentiveForm}
            layout='vertical'
            requiredMark={false}
            initialValues={{
              incentive: [
                {
                  credentials: credentialList.map(v => v.value),
                  incentiveAsset: 1
                }
              ]
            }}
          >
            <Form.List
              name='incentive'
              rules={[
                {
                  validator: async (x, plans) => {
                    //   if (!plans || plans.length < 1) {
                    //     return Promise.reject(new Error("At least 1 Plan"));
                    //   }
                    //   const tokenSum = sumBy(plans, "tokenNum");
                    //   if (tokenSum > tokenTotalAmount) {
                    //     return Promise.reject(new Error("Total Token exceed the max token supply"));
                    //   }
                  }
                }
              ]}
            >
              {(fields, { add, remove }, { errors }) => {
                return (
                  <>
                    {fields.map(({ key, name, ...restField }, idx) => {
                      console.log(idx)
                      return (
                        <div
                          key={key}
                          className='bg-b-1 rounded-md p-4 mb-3 relative'
                        >
                          {idx !== 0 && (
                            <img
                              src={closeIcon}
                              onClick={() => {
                                remove(name)
                              }}
                              className='object-contain w-4 h-4 cursor-pointer absolute top-3 right-3 z-10'
                            />
                          )}
                          <Form.Item
                            {...restField}
                            name={[name, 'credentials']}
                            label='Choose the Credentials'
                            rules={[{ required: true, message: 'Missing!' }]}
                          >
                            <TagList options={credentialList} />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, 'incentiveAsset']}
                            label='Choose the Incentive Assets'
                            rules={[{ required: true, message: 'Missing!' }]}
                          >
                            <TagRadio options={incentiveAssetsTypeList} />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, 'method']}
                            label='Incentive Method'
                            rules={[{ required: true, message: 'Missing!' }]}
                          >
                            <Select placeholder='Select the category'>
                              {incentiveMethodList.map(v => {
                                return (
                                  <Select.Option value={v.value} key={v.value}>
                                    <p>{v.title}</p>
                                    <p>{v.desc}</p>
                                  </Select.Option>
                                )
                              })}
                            </Select>
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, 'amount']}
                            label='Amount'
                            rules={[
                              {
                                required: true,
                                message: 'Missing!'
                              }
                            ]}
                          >
                            <Input placeholder='Enter the participant amount you would like to incentive' />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, 'distributionMethod']}
                            label='Reward Distribution Method'
                            rules={[{ required: true, message: 'Missing!' }]}
                          >
                            <Select
                              placeholder='Select the Reward Distribution Method'
                              options={rewardDistributionMethod}
                            />
                          </Form.Item>
                        </div>
                      )
                    })}
                    <p style={{ color: '#dc4446', marginBottom: 12 }}>
                      {errors}
                    </p>

                    <div className='mb-4'>
                      <Button
                        onClick={() => {
                          add()
                          const incentives =
                            incentiveForm.getFieldValue('incentive')
                          incentiveForm.setFieldValue(
                            ['incentive', incentives.length - 1, 'assets'],
                            1
                          )
                        }}
                        block
                        className='!flex items-center justify-center'
                      >
                        <PlusOutlined /> New Reward
                      </Button>
                    </div>
                  </>
                )
              }}
            </Form.List>
          </Form>
        )}

        <div className='flex justify-center py-20'>
          <Button className='mr-6' onClick={handleCancel}>
            {textMap[step]?.cancel}
          </Button>
          <Button
            type='primary'
            onClick={handleCreate}
            loading={confirmLoading}
          >
            {textMap[step]?.next}
          </Button>
        </div>
      </div>
    </div>
  )
}
