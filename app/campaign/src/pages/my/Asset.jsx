import TabList from './TabList'
import Credentials from './modules/Credential'
import NFT from './modules/NFT'
import Point from './modules/Point'
import NotConnect from './modules/NotConnect'
import useUserInfoQuery from '@/hooks/useUserInfoQuery'
import Loading from '@/components/loading'
import { useState } from 'react'

const tabModule = [
  {
    name: 'credentials',
    value: 1,
    com: <Credentials />
  },
  {
    name: 'nfts',
    value: 2,
    com: <NFT />
  },
  {
    name: 'points',
    value: 3,
    com: <Point />
  }
]
export default function Asset () {
  const { userLogined, userLoading } = useUserInfoQuery()
  const [value, setValue] = useState(tabModule[0].value)

  return (
    <div className='space-y-8 w-page-content px-4 pt-4 lg:px-0 mx-auto'>
      <div className='flex items-center justify-between py-4 lg:py-8'>
        <h2 className='text-base font-medium lg:text-2xl lg:font-bold'>
          Assets
        </h2>
        <TabList
          disabled={!userLogined}
          tabs={tabModule}
          value={value}
          onSelect={setValue}
        />
      </div>

      {userLoading ? (
        <Loading />
      ) : userLogined ? (
        <div>{tabModule.find(v => v.value === value).com}</div>
      ) : (
        <NotConnect />
      )}
    </div>
  )
}
