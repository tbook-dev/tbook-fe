import { useState } from 'react'
import credentialCreatepng from '@/images/campaign-credential.png'
import editIcon from '@/images/icon/edit.svg'
import Button from '@/components/button'
import { PlusOutlined } from '@ant-design/icons'
import CredentialModal from './CredentialModal'
import RewardModal from './RewardModal'
import { useCurrentProject } from '@tbook/hooks'
import { useRequest } from 'ahooks'
import { getCredentialByGroup } from '@/api/incentive'
import { getTwitterId } from '@/utils/conf'
import x from '@/images/icon/x.svg'

const textConf = {
  credential: {
    title: 'Credential Group',
    desc: 'Set up one or more Credential Groups to define different groups of behavior, achievement, or qualification which correspond to different rewards in one Campaign.'
  },
  reward: {
    title: 'Reward',
    desc: 'Set up one or more rewards for each Credential Group.'
  }
}
const credentialPrompt = 'Set Up Credential Group'
const rewardPrompt = 'Please set up the Credential Group first.'
const rewardReadyPrompt = 'Set Up Reward'
const addText = 'Add Credential Group & Reward'

const defaultCredentialReward = {
  credential: [],
  reward: []
}
export default function CredentialReward () {
  const { projectId } = useCurrentProject()
  const { data: credentialList = [] } = useRequest(
    () => getCredentialByGroup(projectId),
    {
      refreshDeps: [projectId],
      ready: !!projectId
    }
  )
  const credentialSet = credentialList.map(v => v.list).flat()
  const [credentialReward, setCredentialReward] = useState([
    { ...defaultCredentialReward }
  ])
  const [editCredentialIndex, setEditCredentialIndex] = useState(0)
  const [showCredentialModal, setShowCredentialModal] = useState(false)
  const [showRewardModal, setShowRewardModal] = useState(false)
  const [editRewardIndex, setEditRewardIndex] = useState(0)

  console.log({ credentialReward })
  return (
    <div>
      <div className='grid grid-cols-2 space-x-5 mb-5'>
        {[textConf.credential, textConf.reward].map((item, index) => {
          return (
            <div key={index} className='font-medium'>
              <h3 className='text-base font-bold text-t-1'>{item.title}</h3>
              <p className='mt-0.5 text-c-9'>{item.desc}</p>
            </div>
          )
        })}
      </div>

      <div className='space-y-5'>
        {credentialReward.map((cr, index) => {
          return (
            <div
              className='text-white p-5 bg-gray rounded-2.5xl grid grid-cols-2 gap-x-5'
              key={index}
            >
              {cr.credential.length > 0 ? (
                <div className='p-4 space-y-6'>
                  {cr.credential.map((v, idx) => {
                    const m = credentialSet.find(
                      item => item.credentialId === v.credentialId
                    )
                    return (
                      <div key={idx} className='flex gap-x-2.5 items-center'>
                        <img
                          src={m?.icon || x}
                          className='w-5 h-5 object-contain'
                        />
                        <p className='text-sm font-medium text-t-1'>
                          {m.nameExp.replace(/\{[1-9]\}/, getTwitterId(v.link))}
                        </p>
                      </div>
                    )
                  })}
                  <p
                    className='text-c-9 underline font-medium text-xs cursor-pointer'
                    onClick={() => {
                      setEditCredentialIndex(index)
                      setShowCredentialModal(true)
                    }}
                  >
                    Edit Credential Group
                  </p>
                </div>
              ) : (
                <div
                  className='py-[30px] text-center bg-cover'
                  style={{ backgroundImage: `url(${credentialCreatepng})` }}
                >
                  <img
                    src={editIcon}
                    className='inline w-3 h-3 mr-3 cursor-pointer'
                    onClick={() => {
                      setEditCredentialIndex(index)
                      setShowCredentialModal(true)
                    }}
                  />
                  {credentialPrompt}
                </div>
              )}

              {cr.reward.length > 0 ? (
                <div>
                  {cr.reward.map(v => {
                    xxx
                  })}
                </div>
              ) : cr.credential.length === 0 ? (
                <div className='py-[30px] flex items-center justify-center'>
                  {rewardPrompt}
                </div>
              ) : (
                <div
                  className='py-[30px] flex items-center justify-center bg-cover'
                  style={{ backgroundImage: `url(${credentialCreatepng})` }}
                >
                  <img
                    src={editIcon}
                    className='inline w-3 h-3 mr-3 cursor-pointer'
                    onClick={() => {
                      setEditRewardIndex(index)
                      setShowRewardModal(true)
                    }}
                  />
                  {rewardReadyPrompt}
                </div>
              )}
            </div>
          )
        })}
      </div>
      <CredentialModal
        conf={
          credentialReward.find((v, idx) => idx === editCredentialIndex)
            .credential ?? []
        }
        credentialList={credentialList}
        open={showCredentialModal}
        setOpen={setShowCredentialModal}
        handleSave={values => {
          if (values) {
            setCredentialReward(
              credentialReward.map((v, idx) => {
                if (idx === editCredentialIndex) {
                  v.credential = values.credential
                }
                return v
              })
            )
          }
        }}
      />
      <RewardModal
        conf={
          credentialReward.find((v, idx) => idx === editRewardIndex).reward ??
          []
        }
        open={showRewardModal}
        setOpen={setShowRewardModal}
        handleSave={values => {
          if (values) {
            setCredentialReward(
              credentialReward.map((v, idx) => {
                if (idx === editRewardIndex) {
                  v.reward = values.reward
                }
                return v
              })
            )
          }
        }}
      />
      <div>
        <Button
          type='text'
          onClick={() => {
            setCredentialReward([
              ...credentialReward,
              { ...defaultCredentialReward }
            ])
          }}
        >
          <PlusOutlined className='mr-2' />
          {addText}
        </Button>
      </div>
    </div>
  )
}
