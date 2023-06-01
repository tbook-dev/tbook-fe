import { Form, Input, InputNumber, Upload, DatePicker, Select } from 'antd'
import { useRef, useState } from 'react'
import clsx from 'clsx'
import { PlusOutlined } from '@ant-design/icons'
import closeIcon from '@tbook/share/images/icon/close4.svg'
import TagList from '@/components/tagList'
import TagRadio from '@/components/tagRadio'
import Button from '@/components/button'
import { useNavigate } from 'react-router-dom'
import uploadFile from '@/utils/upload'
import { useAsyncEffect } from 'ahooks'
import { useCurrentProject } from '@tbook/hooks'
import { getNFTList } from '@/api/incentive'
import uploadIcon from '@/images/icon/upload.svg'
import ImgSelect from '@/components/imgSelect'
import { createCampaign } from '@/api/incentive'
import {
  credentialListDefault,
  incentiveAssetsTypeList,
  rewardDistributionMethod
} from '@/utils/conf'
import { Link } from 'react-router-dom'
const dashboardLink = `/dashboard/campaign`

const textMap = {
  1: {
    title: 'Set up',
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

const { RangePicker } = DatePicker

export default function () {
  const [step, setStep] = useState('1')
  const { projectId } = useCurrentProject()
  const [list, setList] = useState([])
  const [setUpForm] = Form.useForm()
  const [credentialForm] = Form.useForm()
  const [incentiveForm] = Form.useForm()

  const [confirmLoading, setConfirmLoading] = useState(false)
  const navigate = useNavigate()
  const hanleUpload = ({ onSuccess, onError, file }) => {
    uploadFile(file).then(onSuccess).catch(onError)
  }
  const formSavedValues = useRef({})
  const credentialList = credentialListDefault.map(v => ({
    label: v.name,
    value: v.credentialId
  }))
  useAsyncEffect(async () => {
    if (!projectId) return
    const res = await getNFTList(projectId)
    setList(res)
  }, [projectId])
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
        const { description, banner, schedule, title } = values
        const picUrl = banner?.[0].response
        const [startAt, endAt] = schedule.map(v => {
          return v.valueOf()
        })
        formSavedValues.current = {
          picUrl,
          startAt,
          endAt,
          description,
          title
        }
        setStep('2')
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
        formSavedValues.current = {
          ...formSavedValues.current,
          credentials: values.credentials
        }
        setStep('3')
        console.log('current values->', formSavedValues.current)
      })
      .catch(err => {
        console.log(err, 'error')
      })
  }
  function handleIncentive () {
    incentiveForm
      .validateFields()
      .then(async values => {
        console.log(formSavedValues)
        const {
          title: name,
          picUrl,
          startAt,
          endAt,
          description
        } = formSavedValues.current
        const formData = {
          name,
          picUrl,
          startAt,
          endAt,
          description,
          projectId,
          reward: JSON.stringify(values.incentive)
        }
        try {
          setConfirmLoading(true)
          const res = await createCampaign(formData)
          console.log(res, formData)
          navigate(`/dashboard/campaign`)
          setConfirmLoading(false)
        } catch (err) {
          console.log(err)
        }
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
                  name='banner'
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
              name='credentials'
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
                            <TagList
                              options={credentialList.filter(
                                v =>
                                  formSavedValues.current?.credentials?.find(
                                    i => i === v.value
                                  ) !== undefined
                              )}
                            />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, 'incentiveAsset']}
                            label='Choose the Incentive Assets'
                            rules={[{ required: true, message: 'Missing!' }]}
                          >
                            <TagRadio options={incentiveAssetsTypeList} />
                          </Form.Item>
                          <Form.Item noStyle shouldUpdate>
                            {({ getFieldValue }) => {
                              console.log(
                                getFieldValue([
                                  'incentive',
                                  name,
                                  'incentiveAsset'
                                ])
                              )
                              return getFieldValue([
                                'incentive',
                                name,
                                'incentiveAsset'
                              ]) === 1 ? (
                                <Form.Item
                                  {...restField}
                                  name={[name, 'nft']}
                                  label={
                                    <div className='flex justify-between items-center w-[568px]'>
                                      <span> Choose the NFT</span>
                                      <Link
                                        to='/nft'
                                        className='bg-[rgb(38,38,38)] rounded-full w-6 h-6 text-white hover:text-white flex justify-center items-center'
                                      >
                                        +
                                      </Link>
                                    </div>
                                  }
                                  rules={[
                                    { required: true, message: 'Missing!' }
                                  ]}
                                >
                                  <ImgSelect
                                    slidesPerView={4}
                                    options={list.map(v => ({
                                      img: v.coverUrl,
                                      value: v.nftId
                                    }))}
                                    imgclx='h-[120px]'
                                  />
                                </Form.Item>
                              ) : (
                                <Form.Item
                                  {...restField}
                                  name={[name, 'pointAmount']}
                                  label='Point Amount'
                                >
                                  <InputNumber
                                    className='w-full'
                                    min={1}
                                    step={1}
                                    placeholder='Enter the point amount each participant would earn'
                                  />
                                </Form.Item>
                              )
                            }}
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
                            <InputNumber
                              className='w-full'
                              min={1}
                              step={1}
                              placeholder='Enter the participant amount you would like to incentive'
                            />
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
