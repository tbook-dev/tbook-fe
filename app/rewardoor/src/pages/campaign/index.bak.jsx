import {
  Form,
  Input,
  InputNumber,
  Upload,
  DatePicker,
  Select,
  message
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
import useUserInfo from "@/hooks/useUserInfoQuery"
import {
  getNFTList,
  getCredentials,
  getCampaignDetail,
  createCampaign,
  updateCampaign
} from '@/api/incentive'
import uploadIcon from '@/images/icon/upload.svg'
import ImgSelect from '@/components/imgSelect'
import CredentialItem from '@/components/Credential'
import {
  incentiveAssetsTypeList,
  rewardDistributionMethod,
  incentiveMethodList
} from '@/utils/conf'
import { Link, useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import { useRequest } from 'ahooks'
import { conf } from '@tbook/utils'

const dashboardLink = `/dashboard/campaign`

const textMap = {
  1: {
    title: 'Set up an Incentive Campaign',
    subTitle: 'Basic Info',
    save: 'Save',
    next: 'Next'
  },
  2: {
    title: 'Set up an Incentive Campaign',
    subTitle: 'Credential',
    save: 'Previous',
    next: 'Next'
  },
  3: {
    title: 'Set up an Incentive Campaign',
    subTitle: 'Rewards',
    save: 'Save',
    next: 'Create'
  }
}
const { defaultErrorMsg } = conf
const { RangePicker } = DatePicker
const successMsg = `draft saved successfully`

export default function () {
  const [step, setStep] = useState('1')
  const { projectId } = useUserInfo()
  const [setUpForm] = Form.useForm()
  const [credentialForm] = Form.useForm()
  const [incentiveForm] = Form.useForm()
  // const [credentialRemoteList, setCredentialList] = useState([])
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [confirmDraftLoading, setConfirmDraftLoading] = useState(false)
  const { campaignId } = useParams()
  const draftData = useRef({})
  const navigate = useNavigate()
  const hanleUpload = ({ onSuccess, onError, file }) => {
    uploadFile(file).then(onSuccess).catch(onError)
  }
  const formSavedValues = useRef({})

  const editMode = !!campaignId
  const { data: list } = useRequest(() => getNFTList(projectId), {
    refreshOnWindowFocus: true,
    ready: !!projectId,
    refreshDeps: [projectId]
  })
  const { data: credentialRemoteList = [] } = useRequest(
    () => getCredentials(projectId),
    {
      refreshOnWindowFocus: true,
      ready: !!projectId,
      refreshDeps: [projectId]
    }
  )
  const credentialList = credentialRemoteList.map(v => ({
    label: v.name,
    value: v.credentialId + ''
  }))

  const filterCredentialList = credentialList.filter(
    v => !!formSavedValues.current?.credentials?.find(i => i === v.value)
  )
  const defaultIncentive = [
    {
      credentials: filterCredentialList.map(v => v.value),
      incentiveAsset: 1
    }
  ]
  console.log(
    { credentialList, filterCredentialList },
    formSavedValues.current?.credentials
  )
  useAsyncEffect(async () => {
    if (editMode) {
      const { campaign } = await getCampaignDetail(campaignId)
      let credentials = []
      try {
        credentials = Array.from(
          new Set(
            JSON.parse(campaign.reward)
              .map(v => v.credentials)
              .flat(1)
          )
        )
        // console.log({ credentials }, '>>>>>')
      } catch (error) {
        console.log(campaign)
      }
      draftData.current = {
        campaign,
        credentials
      }
      // console.log({credentials},'>>>>>>useAsyncEffect')
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
  // useAsyncEffect(async () => {
  //   if (!projectId) return
  //   const res = await getCredentials(projectId)
  //   setCredentialList(res)
  // }, [projectId])
  const normFile = e => {
    console.log('Upload event:', e)
    if (Array.isArray(e)) {
      return e
    }
    return e?.fileList
  }

  function handleStepUp (saveToDraft = false) {
    setUpForm
      .validateFields()
      .then(async values => {
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
        if (saveToDraft) {
          if (editMode) {
            setConfirmDraftLoading(true)
            try {
              const res = await updateCampaign({
                campaignId,
                ...formSavedValues.current
              })
              message.success(successMsg)
            } catch (e) {
              message.error(defaultErrorMsg)
              console.log(e)
            }
            setConfirmDraftLoading(false)
          } else {
            setConfirmDraftLoading(true)
            try {
              const res = await createCampaign({
                ...formSavedValues.current,
                projectId
              })
              formSavedValues.current.campaignId = res.campaignId
              message.success(successMsg)
              // 保存 campaignId到formSavedValues.current
            } catch (e) {
              message.error(defaultErrorMsg)
              console.log(e)
            }
            setConfirmDraftLoading(false)
          }
        } else {
          setStep('2')
          if (editMode) {
            credentialForm.setFieldsValue({
              credentials: draftData.current.credentials
            })
          }
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
        // formSavedValues.current = {
        //   ...formSavedValues.current,
        //   credentials: values.credentials
        // }
        setStep('3')
        if (editMode) {
          let incentive = defaultIncentive
          try {
            incentive = JSON.parse(draftData.current.campaign.reward)
          } catch (e) {
            console.log(e)
          }
          incentiveForm.setFieldsValue({
            incentive
          })
        }
        formSavedValues.current = {
          ...formSavedValues.current,
          credentials: values.credentials
        }
        console.log('current values->', formSavedValues.current)
      })
      .catch(err => {
        console.log(err, 'error')
      })
  }
  function handleIncentive (saveToDraft = false) {
    const confirmLoading = saveToDraft
      ? setConfirmDraftLoading
      : setConfirmLoading
    const campaignAction = editMode ? updateCampaign : createCampaign
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
          status: saveToDraft ? 0 : 1,
          campaignId: campaignId ?? formSavedValues.current.campaignId,
          reward: JSON.stringify(values.incentive)
        }
        try {
          confirmLoading(true)
          const res = await campaignAction(formData)
          console.log(res, formData)
          if (saveToDraft) {
            message.success(successMsg)
          }
          navigate(`/dashboard/campaign`)
          confirmLoading(false)
        } catch (err) {
          console.log(err)
          confirmLoading(false)
          message.error(defaultErrorMsg)
        }
      })
      .catch(err => {
        confirmLoading(false)
        console.log(err, 'error')
      })
  }
  function handleCreate (saveToDraft) {
    if (step === '1') {
      handleStepUp()
    }
    if (step === '2') {
      handleCredential()
    }
    if (step === '3') {
      handleIncentive(saveToDraft)
    }
  }
  function handleSave () {
    if (step === '1') {
      handleStepUp(true)
    } else if (step === '2') {
      // 第二步是中间状态，直接为previous, 并不产生草稿
      setStep(Number(step) - 1 + '')
    } else if (step === '3') {
      handleIncentive(true)
    }
  }
  // console.log(formSavedValues.current, 'formSavedValues.current')

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
                  'rounded-button select-none',
                  n < step && 'cursor-pointer' // 单向，只能修改之前对
                )}
                onClick={() => {
                  if (n < step) {
                    setStep(n)
                  }
                }}
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
                          <Form.Item noStyle shouldUpdate>
                            {({ getFieldValue }) => {
                              // console.log(
                              //   getFieldValue([
                              //     'incentive',
                              //     name,
                              //     'incentiveAsset'
                              //   ])
                              // )
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
                          incentiveForm.setFieldValue('incentive', [
                            ...incentives.slice(0, -1),
                            ...defaultIncentive
                          ])
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
          <Button onClick={handleSave} loading={confirmDraftLoading}>
            {textMap[step]?.save}
          </Button>

          <Button
            type='primary'
            onClick={() => handleCreate(false)}
            loading={confirmLoading}
          >
            {textMap[step]?.next}
          </Button>
        </div>
      </div>
    </div>
  )
}
