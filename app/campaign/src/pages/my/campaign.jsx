import { useParams } from 'react-router-dom'
import useUserInfoQuery from '@/hooks/useUserInfoQuery'
import CampaignMyCard from '@/components/campain/campaignMyCard'
import TabList from './TabList'
import { useState } from 'react'
import useUserCampaignQuery from '@/hooks/useUserCampaignQuery'
import { useMemo } from 'react'
import NotConnect from './modules/NotConnect'
import Loading from '@/components/loading'
import Empty from './modules/Empty'

const moduleConf = {
  tab: [
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
  ],
  title: 'Campaigns'
}
export default function Campaign () {
  const { projectId } = useParams()
  const { userLogined } = useUserInfoQuery()
  const [value, setValue] = useState(moduleConf.tab[0].value)
  const { data: resData, isLoading } = useUserCampaignQuery(projectId)
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

  return (
    <div className='space-y-8 w-page-content px-4 pt-4 lg:px-0 mx-auto'>
      <div className='flex items-center justify-between'>
        <h2 className='text-base font-medium'>{moduleConf.title}</h2>
        <TabList
          disabled={!userLogined}
          value={value}
          onSelect={setValue}
          tabs={moduleConf.tab}
        />
      </div>

      {userLogined ? (
        <div className='space-y-3'>
          {isLoading ? (
            <Loading />
          ) : data.length === 0 ? (
            <Empty text='There’s no campaign yet.' />
          ) : (
            data.map(v => {
              return (
                <CampaignMyCard
                  key={v.campaignId}
                  projectId={projectId}
                  {...v}
                />
              )
            })
          )}
        </div>
      ) : (
        <NotConnect />
      )}
    </div>
  )
}
