import { useParams } from 'react-router-dom'
import PersonalInfo from './PersonalInfo'
import useUserInfoQuery from '@/hooks/useUserInfoQuery'
import CampaignMyCard from '@/components/campain/campaignMyCard'
import TabList from './TabList'
import { useState } from 'react'
import useUserCampaignQuery from '@/hooks/useUserCampaignQuery'
import { useMemo } from 'react'
import Loading from '@/components/loading'
import NotConnect from './modules/NotConnect'

const tabModule = [
  {
    name: 'Claimable',
    value: 1
  },
  {
    name: 'Probable',
    value: 2
  },
  {
    name: 'Completed',
    value: 3
  }
]
export default function Campaign () {
  const { projectId } = useParams()
  const { firstLoad, userLogined } = useUserInfoQuery()
  const [value, setValue] = useState(tabModule[0].value)
  const { data: resData } = useUserCampaignQuery(projectId)
  const data = useMemo(() => {
    const {
      claimableCampaigns = [],
      completedCampaigns = [],
      probableCampaigns = []
    } = resData || {}
    const mappping = {
      1: claimableCampaigns,
      2: probableCampaigns,
      3: completedCampaigns
    }

    return mappping[value]
  }, [resData, value])

  if (!firstLoad) {
    return <Loading />
  }
  return (
    <div className='space-y-10 w-page-content px-2 lg:px-0 mx-auto'>
      <PersonalInfo />

      <TabList
        disabled={!userLogined}
        value={value}
        onSelect={setValue}
        tabs={tabModule}
      />
      {userLogined ? (
        <div className='space-y-3'>
          {data.map(v => {
            return (
              <CampaignMyCard key={v.campaignId} projectId={projectId} {...v} />
            )
          })}
        </div>
      ) : (
        <NotConnect />
      )}
    </div>
  )
}
