import { Form, message } from 'antd'
import Breadcrumb from '@/components/breadcrumb'
import { useRef, useState, useEffect } from 'react'
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
  getNFTcontracts
} from '@/api/incentive'
import { useQuery } from 'react-query'
import CredentialReward from './modules/CredentialReward'
import { useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import { useRequest } from 'ahooks'
import { conf } from '@tbook/utils'
import BasicInfo from './modules/BasicInfo'
import { defaultCredentialReward } from './conf'

const dashboardLink = `/dashboard/campaign`
const title = 'Set up an Incentive Campaign'
const textMap = {
  1: {
    title: 'Set up an Incentive Campaign',
    subTitle: 'Basic Info',
    back: 'Cancel',
    next: 'Next'
  },
  2: {
    title: 'Set up an Incentive Campaign',
    subTitle: 'Credential',
    back: 'Previous',
    next: 'Release'
  }
}
const { defaultErrorMsg } = conf
const successMsg = `draft saved successfully`
const defaultStep = '2'

const checkFormValidte = conf => {
  return (
    conf &&
    conf?.every(v => {
      return v?.credential?.length > 0 && v?.reward?.length > 0
    })
  )
}

export default function () {
  const [step, setStep] = useState(defaultStep)
  const { projectId } = useCurrentProject()
  const { data: NFTcontracts } = useQuery(
    ['NFTcontracts', projectId],
    () => getNFTcontracts(projectId),
    {
      enabled: !!projectId
    }
  )

  const { data: credentialList = [] } = useQuery(
    ['credentialList', projectId],
    () => getCredentials(projectId),
    {
      enabled: !!projectId
    }
  )
  console.log({ credentialList })
  const [credentialReward, setCredentialReward] = useState([
    { ...defaultCredentialReward }
  ])
  // console.log({ NFTcontracts })
  const [setupSubmittable, setSetUpSubmittable] = useState(false)
  const [setUpForm] = Form.useForm()
  const { campaignId } = useParams()
  const fd = useRef({})
  const navigate = useNavigate()

  const editMode = !!campaignId
  const setUpFormValues = Form.useWatch([], setUpForm)

  useEffect(() => {
    setUpForm.validateFields({ validateOnly: true }).then(
      () => {
        setSetUpSubmittable(true)
      },
      () => {
        setSetUpSubmittable(false)
      }
    )
  }, [setUpFormValues])

  const handleStepUp = async () => {
    const values = await setUpForm.validateFields()
    fd.current = {
      title: values.title,
      picUrl: values.picUrl?.[0]?.response,
      description: values.description,
      startAt: dayjs(values.schedule[0]).format('YYYY-MM-DD HH:mm:ss'),
      endAt: dayjs(values.schedule[1]).format('YYYY-MM-DD HH:mm:ss'),
      projectId,
      status: 0
    }
    setStep('2')
  }
  const handleCreate = async () => {
    // 一个是表单的内容，一个是credentialReward的内容
    fd.current = {
      title: 'tbook 666',
      picUrl:
        'https://rd-worker.xgamma.workers.dev/img/c761d3f0ac734a398999636e2e516512',
      description: 'abc is abc',
      startAt: '2023-08-18 21:59:31',
      endAt: '2023-09-20 21:59:31',
      projectId: 153900040006,
      status: 0
    }
    console.log({ credentialReward })
    const data = {
      campaign: fd.current,
      groups: credentialReward.map(v => {
        const credentialList = v.credential
        const pointList = v.reward.filter(v => v.rewardType === 2)
        const nftList = v.reward.filter(v => v.rewardType === 1)
        return {
          status: 0,
          projectId,
          credentialList,
          pointList,
          nftList
        }
      })
    }
    console.log(credentialReward, data)
    const res = await createCampaign(data)
    console.log(res)
  }
  return (
    <div className='text-white'>
      <Breadcrumb
        items={[
          {
            title: 'Incentive Campaign',
            href: '/campaign'
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
          {step === '2' && (
            <CredentialReward
              credentialReward={credentialReward}
              setCredentialReward={setCredentialReward}
              NFTcontracts={NFTcontracts}
              credentialList={credentialList}
            />
          )}
        </div>
      </div>

      <div className='flex justify-between py-20'>
        <div className='flex justify-center space-x-6'>
          <Button type='text'>Save Draft</Button>
          <Button type='text'>Preview</Button>
        </div>

        <div className='flex justify-center space-x-6'>
          {step === '1' && (
            <>
              <Button
                onClick={() => {
                  navigate(-1)
                }}
              >
                {textMap[1]?.back}
              </Button>

              <Button
                type='primary'
                onClick={handleStepUp}
                disabled={!setupSubmittable}
              >
                {textMap[1]['next']}
              </Button>
            </>
          )}

          {step === '2' && (
            <>
              <Button
                onClick={() => {
                  setStep('1')
                }}
              >
                {textMap[2]?.back}
              </Button>
              <Button
                type='primary'
                onClick={handleCreate}
                // loading={confirmLoading}
                disabled={!checkFormValidte(credentialReward)}
              >
                {textMap[2]['next']}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
