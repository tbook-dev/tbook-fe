import {
  Form,
  Input,
  InputNumber,
  Upload,
  DatePicker,
  Select,
  Divider
} from 'antd'
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
import { getNFTList, getCredentials, getCampaignDetail } from '@/api/incentive'
import uploadIcon from '@/images/icon/upload.svg'
import ImgSelect from '@/components/imgSelect'
import CredentialItem from '@/components/Credential'
import { createCampaign } from '@/api/incentive'
import {
  incentiveAssetsTypeList,
  rewardDistributionMethod,
  incentiveMethodList
} from '@/utils/conf'
import { Link, useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import { useRequest } from 'ahooks'
const dashboardLink = `/dashboard/campaign`

const textMap = {
  1: {
    title: 'Set up an Incentive Campaign',
    subTitle: 'Basic Info',
    cancel: 'Cancel',
    next: 'Next'
  },
  2: {
    title: 'Set up an Incentive Campaign',
    subTitle: 'Credential',
    cancel: 'Previous',
    next: 'Next'
  },
  3: {
    title: 'Set up an Incentive Campaign',
    subTitle: 'Rewards',
    cancel: 'Previous',
    next: 'Create'
  }
}

const { RangePicker } = DatePicker

export default function () {
  const [step, setStep] = useState('1')
  const { projectId } = useCurrentProject()
  const [setUpForm] = Form.useForm()
  const [credentialForm] = Form.useForm()
  const [incentiveForm] = Form.useForm()
  const [credentialRemoteList, setCredentialList] = useState([])
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [confirmDraftLoading, setConfirmDraftLoading] = useState(false)
  const { campaignId } = useParams()
  const draftData = useRef({})
  const navigate = useNavigate()
  const hanleUpload = ({ onSuccess, onError, file }) => {
    uploadFile(file).then(onSuccess).catch(onError)
  }
  const formSavedValues = useRef({})
  const credentialList = credentialRemoteList.map(v => ({
    label: v.name,
    value: v.credentialId + ''
  }))
  const defaultIncentive = [
    {
      credentials: credentialList.map(v => v.value),
      incentiveAsset: 1
    }
  ]
  const editMode = !!campaignId
  const { data: list } = useRequest(() => getNFTList(projectId), {
    refreshOnWindowFocus: true,
    ready: !!projectId,
    refreshDeps: [projectId]
  })

  useAsyncEffect(async () => {
    if (editMode) {
      const { campaign, credentials = [] } = await getCampaignDetail(campaignId)
      draftData.current = {
        campaign,
        credentials
      }
      setUpForm.setFieldsValue({
        description: campaign.description,
        banner: [
          {
            uid: '-1',
            name: 'img.png',
            status: 'done',
            url: campaign.picUrl,
            response: campaign.picUrl
          }
        ],
        schedule: [campaign.startAt, campaign.endAt].map(dayjs),
        title: campaign.name
      })
    }
  }, [campaignId])

  // useAsyncEffect(async () => {
  //   if (!projectId) return
  //   const res = await getNFTList(projectId)
  //   setList(res)
  // }, [projectId])
  useAsyncEffect(async () => {
    if (!projectId) return
    const res = await getCredentials(projectId)
    setCredentialList(res)
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
        if (editMode) {
          credentialForm.setFieldsValue({
            credentials: draftData.current.credentials.map(
              v => v.credentialId + ''
            )
          })
        }
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
        if (editMode) {
          let incentive = defaultIncentive
          try {
            incentive = JSON.parse(draftData.current.campaign.rewardAction)
          } catch (e) {
            console.log(e)
          }
          incentiveForm.setFieldsValue({
            incentive
          })
        }
        console.log('current values->', formSavedValues.current)
      })
      .catch(err => {
        console.log(err, 'error')
      })
  }
  function handleIncentive (status = 1) {
    const confirmLoading =
      status === 1 ? setConfirmDraftLoading : setConfirmLoading
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
          status,
          campaignId: campaignId,
          reward: JSON.stringify(values.incentive)
        }
        try {
          confirmLoading(true)
          const res = await createCampaign(formData)
          console.log(res, formData)
          navigate(`/dashboard/campaign`)
          confirmLoading(false)
        } catch (err) {
          console.log(err)
        }
      })
      .catch(err => {
        confirmLoading(false)
        console.log(err, 'error')
      })
  }
  function handleCreate (status) {
    if (step === '1') {
      handleStepUp()
    }
    if (step === '2') {
      handleCredential()
    }
    if (step === '3') {
      handleIncentive(status)
    }
  }
  function handleCancel () {
    if (step === '1') {
      navigate(dashboardLink)
      return
    }
    if (step === '3' || step === '2') {
      setStep(Number(step) - 1 + '')
      return
    }
  }
  return (
    <div className='w-full min-h-screen text-white'>
      <div className='w-[600px] mx-auto pt-20'>
        <h1 className='text-4xl  mb-12 font-bold'>{textMap[step]?.title}</h1>

        <div className='h-10 grid grid-cols-3 gap-x-10 mb-3'>
          {Object.entries(textMap).map(([n, v]) => {
            return (
              <div
                key={n}
                className={clsx(
                  n === step ? 'text-white bg-cw1' : 'text-c-9 bg-b-1',
                  'font-medium text-sm flex justify-center items-center',
                  'rounded-button select-none'
                  // 'cursor-pointer'
                )}
                // onClick={() => {
                //   setStep(n)
                // }}
              >
                {`${n}. ${v.subTitle}`}
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
                  rules={[
                    {
                      required: true,
                      message: 'Campaign Card Banner is required'
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
          <Form form={credentialForm} layout='vertical' requiredMark={false}>
            <Form.Item
              label='Choose the Credentials or Define new Credential'
              name='credentials'
              rules={[{ required: true, message: 'credentials required' }]}
            >
              <CredentialItem options={credentialList} />
              {/* <Select
                options={credentialList}
                className='w-full'
                mode='multiple'
                dropdownRender={menu => (
                  <>
                    {menu}
                    <Divider className='my-2' />
                    <Link
                      to='/credential'
                      className='text-c-9 hover:text-white block w-full text-center py-1'
                    >
                      + New Credentail
                    </Link>
                  </>
                )}
              /> */}
            </Form.Item>
          </Form>
        )}

        {step === '3' && (
          <Form
            form={incentiveForm}
            layout='vertical'
            requiredMark={false}
            initialValues={{
              incentive: defaultIncentive
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
                          {
                            <Form.Item noStyle shouldUpdate>
                              {({ getFieldValue }) => {
                                const method = getFieldValue([
                                  'incentive',
                                  name,
                                  'method'
                                ])
                                if (method !== 3) {
                                  return (
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
                                  )
                                }
                              }}
                            </Form.Item>
                          }

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

        <div className='flex justify-center py-20 space-x-6'>
          <Button onClick={handleCancel}>{textMap[step]?.cancel}</Button>
          {step === '3' && (
            <Button
              type='primary'
              onClick={() => handleCreate(1)}
              loading={confirmDraftLoading}
            >
              Save As Draft
            </Button>
          )}
          <Button
            type='primary'
            onClick={() => handleCreate(2)}
            loading={confirmLoading}
          >
            {textMap[step]?.next}
          </Button>
        </div>
      </div>
    </div>
  )
}
