import { Form, message } from 'antd'
import Breadcrumb from '@/components/breadcrumb'
import { useRef, useState } from 'react'
import Button from '@/components/button'
import { useNavigate } from 'react-router-dom'
import { useAsyncEffect } from 'ahooks'
import { useCurrentProject } from '@tbook/hooks'
import {
  getNFTList,
  getCredentials,
  getCampaignDetail,
  createCampaign,
  updateCampaign,
  getNFTcontracts,
  getCredentialByGroup
} from '@/api/incentive'
import { useQuery } from 'react-query'
import CredentialReward from './modules/CredentialReward'
import { useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import { useRequest } from 'ahooks'
import { conf } from '@tbook/utils'
import BasicInfo from './modules/BasicInfo'
const dashboardLink = `/dashboard/campaign`
const title = 'Set up an Incentive Campaign'
const textMap = {
  1: {
    title: 'Set up an Incentive Campaign',
    subTitle: 'Basic Info',
    save: 'Cancel',
    next: 'Next'
  },
  2: {
    title: 'Set up an Incentive Campaign',
    subTitle: 'Credential',
    save: 'Previous',
    next: 'Release'
  },
  3: {
    title: 'Set up an Incentive Campaign',
    subTitle: 'Rewards',
    save: 'Save',
    next: 'Create'
  }
}
const { defaultErrorMsg } = conf
const successMsg = `draft saved successfully`
const defaultStep = '2'

export default function () {
  // console.log({ NFTcontracts })
  const [step, setStep] = useState(defaultStep)
  const { projectId } = useCurrentProject()
  const { data: NFTcontracts } = useQuery(
    ['NFTcontracts', projectId],
    projectId => getNFTcontracts(projectId),
    {
      enabled: !!projectId
    }
  )
  // const { data: credentialRemoteList = [] } = useRequest(
  //   () => getCredentials(projectId),
  //   {
  //     refreshOnWindowFocus: true,
  //     ready: !!projectId,
  //     refreshDeps: [projectId]
  //   }
  // )
  const { data: credentialRemoteList = [] } = useQuery(
    ['credentialList', projectId],
    () => getCredentialByGroup(projectId),
    {
      enabled: !!projectId
    }
  )
  console.log({ NFTcontracts })
  const [setUpForm] = Form.useForm()
  const [credentialForm] = Form.useForm()
  const [incentiveForm] = Form.useForm()
  // const [credentialRemoteList, setCredentialList] = useState([])
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [confirmDraftLoading, setConfirmDraftLoading] = useState(false)
  const { campaignId } = useParams()
  const draftData = useRef({})
  const navigate = useNavigate()

  const formSavedValues = useRef({})

  const editMode = !!campaignId
  const { data: list } = useRequest(() => getNFTList(projectId), {
    refreshOnWindowFocus: true,
    ready: !!projectId,
    refreshDeps: [projectId]
  })

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
      navigate(dashboardLink)
    } else if (step === '2') {
      // 第二步是中间状态，直接为previous, 并不产生草稿
      setStep(Number(step) - 1 + '')
    } else if (step === '3') {
      handleIncentive(true)
    }
  }
  // console.log(formSavedValues.current, 'formSavedValues.current')

  return (
    <div className='text-white'>
      <Breadcrumb
        items={[
          {
            title: 'Incentive Campaign',
            href: '/dashboard/campaign'
          },
          {
            title: 'Set up an incentive campaign'
          }
        ]}
      />
      <div className='pt-20'>
        <h1 className='text-4xl  mb-10 font-bold'>{title}</h1>
        <div className=''>
          {step === '1' && <BasicInfo form={setUpForm} />}
          {step === '2' && <CredentialReward />}
        </div>
      </div>

      <div className='flex justify-between py-20'>
        <div className='flex justify-center space-x-6'>
          <Button type='text'>Save Draft</Button>
          <Button type='text'>Preview</Button>
        </div>

        <div className='flex justify-center space-x-6'>
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
