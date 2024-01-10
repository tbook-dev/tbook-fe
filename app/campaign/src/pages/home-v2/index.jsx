import Loading from '@/components/loading'
import CampaignCardV2 from '@/components/campain/campaignHomeV2'
import { useState, useEffect } from 'react'
import { campaignStatus } from '@/utils/conf'
import { useLoaderData } from 'react-router-dom'
import useCampaignList from '@/hooks/useCampaignList'
import dayjs from 'dayjs'
import clsx from 'clsx'
import Banner from './Banner'
import { useMemo } from 'react'
import { sum } from 'lodash'
import Empty from '@/components/empty'
import { Affix } from 'antd'

export default function Expore () {
  const [selectStatus, setSelectedStatus] = useState(-1)

  const { projectId, project } = useLoaderData()
  const { data: list = [], isLoading } = useCampaignList(projectId)
  const [defaultLoaded, setDefaultLoaded] = useState(false)

  const listFilter = list
    .filter(v => v.campaign?.status === selectStatus)
    .sort((a, b) =>
      dayjs(b.campaign?.createTime).isAfter(a.campaign?.createTime) ? 1 : -1
    )

  useEffect(() => {
    if (!defaultLoaded && !isLoading) {
      // 加载完成，并且没有设置过
      const hasOngoing = list.some(v => v.campaign?.status === 1)
      const hasScheduled = list.some(v => v.campaign?.status === 2)
      if (!hasOngoing && hasScheduled) {
        setSelectedStatus(2)
      } else {
        setSelectedStatus(1)
      }
      setDefaultLoaded(true)
    }
  }, [defaultLoaded, isLoading])

  const participantNum = useMemo(() => {
    return sum(list.map(v => v.participantNum ?? 0))
  }, [list])

  return (
    <main className='pb-20'>
      <div className='lg:w-bx mx-auto px-4 space-y-16 lg:px-0'>
        <Banner
          {...project}
          isLoading={isLoading}
          campaignNum={list?.length ?? 0}
          participantNum={participantNum}
        />

        <div className='space-y-3'>
          <Affix offsetTop={0}>
            <div className='py-5 bg-black'>
              <div className='flex items-center justify-between lg:justify-start lg:gap-x-20 h-10 border-b border-[#160b25]'>
                {campaignStatus.map(v => {
                  return (
                    <button
                      key={v.value}
                      className={clsx(
                        selectStatus === v.value
                          ? 'before:absolute before:w-full before:h-0.5 before:left-0 before:-bottom-[7px] before:bg-[#904BF6]'
                          : 'text-[#A1A1A2]',
                        'text-xl relative w-[120px] h-7 lg:hover:text-white'
                      )}
                      onClick={() => {
                        setSelectedStatus(v.value)
                      }}
                    >
                      {v.label}
                    </button>
                  )
                })}
              </div>
            </div>
          </Affix>

          <section className='mb-20'>
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
                {listFilter.length > 0 ? (
                  listFilter.map(v => (
                    <CampaignCardV2
                      key={v.campaign?.campaignId}
                      project={project}
                      usersNum={v.participantNum ?? 0}
                      groups={v.groups ?? []}
                      {...v.campaign}
                    />
                  ))
                ) : (
                  <div className='lg:h-[330px] lg:bg-[#0F081A] lg:rounded-xl flex justify-center items-center'>
                    <Empty text='Stay tuned for awesome campaigns!' />
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}
