import useExporeCampainQuery from '@/hooks/useExporeCampainQuery'
import Loading from '@/components/loading'
import CampaignCardV2 from '@/components/campain/campaignHomeV2'
import { useState } from 'react'
import { useResponsive } from 'ahooks'
import { campaignStatus } from '@/utils/conf'
import { useLoaderData } from 'react-router-dom'
import useCampaignList from '@/hooks/useCampaignList'
import dayjs from 'dayjs'
import clsx from 'clsx'
import Banner from './Banner'
import { useMemo } from 'react'
import { sum } from 'lodash'
const pageConf = {
  title: 'Explore Campaigns v2'
}
export default function Expore () {
  const [selectStatus, setSelectedStatus] = useState(campaignStatus[0].value)

  const { pc } = useResponsive()
  const { projectName, projectId, project } = useLoaderData()
  const { data: list = [], isLoading } = useCampaignList(projectId)

  const listFilter = list
    .filter(v => v.campaign?.status === selectStatus)
    .sort((a, b) =>
      dayjs(b.campaign?.createTime).isAfter(a.campaign?.createTime) ? 1 : -1
    )

  const participantNum = useMemo(() => {
    return sum(list.map(v => v.participation?.length ?? 0))
  }, [list])

  return (
    <main className='pb-20'>
      <div className='lg:w-bx mx-auto px-7 space-y-16 lg:px-0'>
        <Banner
          {...project}
          campaignNum={list?.length ?? 0}
          participantNum={participantNum}
        />

        <section
          className={clsx(
            'mb-20',
            listFilter.length === 0 && 'bg-gray rounded-button px-8 py-4'
          )}
        >
          {isLoading ? (
            <Loading h='h-40' />
          ) : (
            <div
              className={clsx(
                'grid gap-6',
                listFilter.length === 0
                  ? 'grid-cols-1'
                  : 'grid-cols-1 lg:grid-cols-4'
              )}
            >
              {listFilter.length > 0
                ? listFilter.map(v => (
                    <CampaignCardV2
                      key={v.campaign?.campaignId}
                      project={project}
                      users={v.participation ?? []}
                      groups={v.groups ?? []}
                      {...v.campaign}
                    />
                  ))
                : 'No Data'}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
