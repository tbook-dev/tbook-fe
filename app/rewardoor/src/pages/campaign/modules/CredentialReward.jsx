import { useState } from 'react'
import credentialCreatepng from '@/images/campaign-credential.png'
import rewardCreatepng from '@/images/campaign-reward.png'
import editIcon from '@/images/icon/edit.svg'
import Button from '@/components/button'
import { PlusOutlined, CloseOutlined } from '@ant-design/icons'
import CredentialModal from './CredentialModal'
import RewardModal from './RewardModal'
import { incentiveAssetsTypeList } from '@/utils/conf'
import x from '@/images/icon/x.svg'
import { defaultCredentialReward } from '../conf'
import { template } from 'lodash'

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
const editCredentialText = 'Edit Credential Group'
const editRewardText = 'Edit Rewards'

function CredentialReward ({
  credentialReward,
  setCredentialReward,
  NFTcontracts,
  credentialList
}) {
  const credentialSet = credentialList.map(v => v.credentialList).flat()

  const [editCredentialIndex, setEditCredentialIndex] = useState(0)
  const [showCredentialModal, setShowCredentialModal] = useState(false)
  const [showRewardModal, setShowRewardModal] = useState(false)
  const [editRewardIndex, setEditRewardIndex] = useState(0)

  const handleDelete = c => {
    setCredentialReward(credentialReward.filter((_, idx) => idx !== c))
  }
  console.log({ credentialReward })
  return (
    <div>
      <div className='grid grid-cols-2 space-x-5 mb-5'>
        {[textConf.credential, textConf.reward].map((item, index) => {
          return (
            <div key={index} className='font-medium'>
              <h3 className='text-base font-bold text-t-1'>{item.title}</h3>
              <p className='mt-0.5 text-c-9 text-xs'>{item.desc}</p>
            </div>
          )
        })}
      </div>

      <div className='space-y-5'>
        {credentialReward.map((cr, index, list) => {
          return (
            <div
              className='text-white py-5 px-12 bg-gray rounded-2.5xl grid grid-cols-2 gap-x-10 relative before:absolute before:top-1/2 before:left-1/2 before:transform before:-translate-x-1/2 before:-translate-y-1/2 before:w-[1px] before:h-10 before:bg-c-6'
              key={index}
            >
              {list.length > 1 && (
                <span
                  className='absolute top-1/2 transform -translate-y-1/2 right-5 cursor-pointer'
                  onClick={() => handleDelete(index)}
                >
                  <CloseOutlined style={{ color: '#999' }} />
                </span>
              )}

              <div className='flex items-center w-full'>
                {cr.credential.length > 0 ? (
                  <div className='space-y-6 w-max'>
                    {cr.credential.map((v, idx) => {
                      const m = credentialSet.find(
                        item => item.credentialId === v.credentialId
                      )
                      return (
                        <div key={idx} className='flex gap-x-2.5 items-center'>
                          <img
                            src={m?.picUrl || x}
                            className='w-5 h-5 object-contain'
                          />
                          <div
                            dangerouslySetInnerHTML={{
                              __html: template(m.templateExp)({
                                ...v,
                                ...v.options
                              })
                            }}
                          />
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
                      {editCredentialText}
                    </p>
                  </div>
                ) : (
                  <div
                    className='py-[30px] w-full	text-center bg-cover bg-no-repeat bg-center cursor-pointer'
                    style={{ backgroundImage: `url(${credentialCreatepng})` }}
                    onClick={() => {
                      setEditCredentialIndex(index)
                      setShowCredentialModal(true)
                    }}
                  >
                    <img
                      src={editIcon}
                      className='inline w-3 h-3 mr-3 cursor-pointer'
                    />
                    {credentialPrompt}
                  </div>
                )}
              </div>

              <div className='flex items-center'>
                {cr.reward.length > 0 ? (
                  <div className='space-y-6 w-full'>
                    <div className='space-y-6'>
                      {cr.reward.map((v, idx) => {
                        const rewardType = v.rewardType
                        return (
                          <div
                            key={idx}
                            className='px-6 py-2 text-xs font-medium text-t-1 border border-c-6 rounded-2.5xl flex justify-between items-center'
                          >
                            <span>
                              {
                                incentiveAssetsTypeList.find(
                                  i => i.value === rewardType
                                )?.label
                              }
                            </span>
                            <span>{rewardType === 1 ? v.name : v.number}</span>
                          </div>
                        )
                      })}
                    </div>
                    <p
                      className='text-c-9 underline font-medium text-xs cursor-pointer'
                      onClick={() => {
                        setEditRewardIndex(index)
                        setShowRewardModal(true)
                      }}
                    >
                      {editRewardText}
                    </p>
                  </div>
                ) : cr.credential.length === 0 ? (
                  <div className='py-[30px] text-c-6 w-full flex items-center justify-center'>
                    {rewardPrompt}
                  </div>
                ) : (
                  <div
                    className='py-[30px] w-full flex items-center justify-center bg-cover bg-no-repeat bg-center cursor-pointer'
                    style={{ backgroundImage: `url(${rewardCreatepng})` }}
                    onClick={() => {
                      setEditRewardIndex(index)
                      setShowRewardModal(true)
                    }}
                  >
                    <img src={editIcon} className='inline w-3 h-3 mr-3' />
                    {rewardReadyPrompt}
                  </div>
                )}
              </div>
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
        NFTcontracts={NFTcontracts}
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
      <div className='pt-5'>
        <Button
          type='text'
          className='px-0 -ml-10'
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

export default CredentialReward
