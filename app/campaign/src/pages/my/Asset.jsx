import { useNavigate, useLocation, useLoaderData } from 'react-router-dom'
import TabList from './TabList'
import Credentials from './modules/Credential'
import NFT from './modules/NFT'
import Point from './modules/Point'
import NotConnect from './modules/NotConnect'
import useUserInfoQuery from '@/hooks/useUserInfoQuery'
import Loading from '@/components/loading'
import useAssetQuery from '@/hooks/useAssetQuery'

const tabModule = [
  {
    name: 'Credentials',
    value: '1',
    com: <Credentials />
  },
  {
    name: 'NFTs',
    value: '2',
    com: <NFT />
  },
  {
    name: 'Points',
    value: '3',
    com: <Point />
  }
]
export default function Asset () {
  const { projectId } = useLoaderData()
  const { userLogined, isLoading: userLoading } = useUserInfoQuery()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { isLoading } = useAssetQuery(projectId)
  // get filter from url
  const value =
    tabModule.find(
      v => v.value == new URLSearchParams(location.search).get('type')
    )?.value || '1'
  const setValue = v => {
    navigate(`${pathname}?type=${v}`)
  }
  return (
    <div className='space-y-8 w-page-content mx-auto'>
      <div className='flex flex-col gap-y-4 lg:gap-y-8 pt-3 pb-4 px-4 lg:px-0 border-b border-[#160b25] lg:border-none'>
        <h2 className='font-medium text-2xl lg:font-bold font-zen-dot'>
          Assets
        </h2>
        <TabList
          disabled={!userLogined}
          tabs={tabModule}
          value={value}
          onSelect={setValue}
        />
      </div>

      <div className='px-4 lg:px-0'>
        {userLoading ? (
          <Loading />
        ) : userLogined ? (
          isLoading ? (
            <Loading />
          ) : (
            <div>{tabModule.find(v => v.value === value).com}</div>
          )
        ) : (
          <NotConnect />
        )}
      </div>
    </div>
  )
}
