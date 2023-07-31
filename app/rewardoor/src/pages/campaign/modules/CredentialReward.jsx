import { useState } from 'react'
import credentialCreatepng from '@/images/campaign-credential.png'
import editIcon from '@/images/icon/edit.svg'
import Button from '@/components/button'
import { PlusOutlined } from '@ant-design/icons'

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
const addText = 'Add Credential Group & Reward'

const defaultCredentialReward = {
  credential: {},
  reward: {}
}
export default function CredentialReward () {
  const [credentialReward, setCredentialReward] = useState([
    defaultCredentialReward
  ])
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
        {credentialReward.map((item, index) => {
          return (
            <div
              className='text-white p-5 bg-gray rounded-2.5xl grid grid-cols-2 gap-x-5'
              key={index}
            >
              <div
                className='py-[30px] text-center bg-cover'
                style={{ backgroundImage: `url(${credentialCreatepng})` }}
              >
                <img
                  src={editIcon}
                  className='inline w-3 h-3 mr-3 cursor-pointer'
                />
                {credentialPrompt}
              </div>
              <div className='py-[30px] text-center'>{rewardPrompt}</div>
            </div>
          )
        })}
      </div>

      <div>
        <Button type='text'>
          <PlusOutlined className='mr-2' />
          {addText}
        </Button>
      </div>
    </div>
  )
}
