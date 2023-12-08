import { useParams } from 'react-router-dom'
import PersonalInfo from './PersonalInfo'
import { Spin } from 'antd'
import useUserInfoQuery from '@/hooks/useUserInfoQuery'
import Asset from './Asset'

export default function My () {
  const { campaignId } = useParams()
  const { firstLoad, userLogined } = useUserInfoQuery()

  if (!firstLoad) {
    return (
      <div className='flex h-[50vh] items-center justify-center'>
        <Spin spinning />
      </div>
    )
  }
  return (
    <div className='space-y-10 w-page-content px-2 lg:px-0 mx-auto'>
      <PersonalInfo />
      <Asset />
    </div>
  )
}
