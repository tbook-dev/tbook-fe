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
const defaultStep = '1'

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

  const { data: credentialRemoteList = [] } = useQuery(
    ['credentialList', projectId],
    () => getCredentials(projectId),
    {
      enabled: !!projectId
    }
  )
  console.log({ credentialRemoteList })
  const [credentialReward, setCredentialReward] = useState([
    { ...defaultCredentialReward }
  ])
  // console.log({ NFTcontracts })
  const [setupSubmittable, setSetUpSubmittable] = useState(false)
  const [setUpForm] = Form.useForm()
  const { campaignId } = useParams()
  const draftData = useRef({})
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

  const handleStepUp = async values => {
    console.log({ values })
    setStep('2')
  }
  const handleCreate = async () => {}
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
