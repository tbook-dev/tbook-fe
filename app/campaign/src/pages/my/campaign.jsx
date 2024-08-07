import { useLoaderData } from 'react-router-dom'
import useUserInfoQuery from '@/hooks/useUserInfoQuery'
import CampaignMyCard from '@/components/campain/campaignMyCard'
import CampaignCard2 from '@/components/campain/Card'
import TabList from './TabList'
import { useState } from 'react'
import useUserCampaignQuery from '@/hooks/useUserCampaignQuery'
import { useMemo } from 'react'
import NotConnect from './modules/NotConnect'
import Loading from '@/components/loading'
import Empty from '@/components/empty'
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
  const { projectId } = useLoaderData()
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
    <div className='space-y-8 w-page-content mx-auto'>
      <div className='flex flex-col gap-y-4 lg:gap-y-8 pt-3 pb-4 px-4 lg:px-0 border-b border-[#160b25] lg:border-none'>
        <h2 className='font-medium text-2xl lg:font-bold font-zen-dot'>
          {moduleConf.title}
        </h2>
        <TabList
          disabled={!userLogined}
          value={value}
          onSelect={setValue}
          tabs={moduleConf.tab}
        />
      </div>

      <div className='px-4 lg:px-0'>
        {userLoading ? (
          <Loading text="Aggregating metrics..."/>
        ) : userLogined ? (
          isLoading ? (
            <Loading text="Aggregating metrics..."/>
          ) : data.length === 0 ? (
            <div className='lg:h-[330px] lg:bg-[#0F081A] lg:rounded-xl flex justify-center items-center'>
              <Empty text='There’s no campaign yet.' />
            </div>
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
    </div>
  )
}
