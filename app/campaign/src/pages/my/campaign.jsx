import { useParams } from 'react-router-dom'
import useUserInfoQuery from '@/hooks/useUserInfoQuery'
import CampaignMyCard from '@/components/campain/campaignMyCard'
import CampaignCard2 from '@/components/campain/Card'
import TabList from './TabList'
import { useState } from 'react'
import useUserCampaignQuery from '@/hooks/useUserCampaignQuery'
import { useMemo } from 'react'
import NotConnect from './modules/NotConnect'
import Loading from '@/components/loading'
import Empty from './modules/Empty'
import { useResponsive } from 'ahooks'
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
  const { pc } = useResponsive()
  const { projectId } = useParams()
  const { userLogined, isLoading: userLoading } = useUserInfoQuery()
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
      <div className='flex items-center justify-between py-4 lg:py-8'>
        <h2 className='text-base font-medium lg:text-2xl lg:font-bold'>
          {moduleConf.title}
        </h2>
        <TabList
          disabled={!userLogined}
          value={value}
          onSelect={setValue}
          tabs={moduleConf.tab}
        />
      </div>

      {userLoading ? (
        <Loading />
      ) : userLogined ? (
        isLoading ? (
          <Loading />
        ) : data.length === 0 ? (
          <Empty text='There’s no campaign yet.' />
        ) : (
          <div
            className={
              'space-y-3 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-4 lg:gap-y-12'
            }
          >
            {data.map(v => {
              return pc ? (
                <CampaignCard2
                  key={v.campaignId}
                  projectId={projectId}
                  {...v}
                />
              ) : (
                <CampaignMyCard
                  key={v.campaignId}
                  projectId={projectId}
                  {...v}
                />
              )
            })}
          </div>
        )
      ) : (
        <NotConnect />
      )}
    </div>
  )
}
