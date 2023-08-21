import clsx from 'clsx'
import { getCampaignDetail } from '@/api/incentive'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { useMemo } from 'react'
import Breadcrumb from '@/components/breadcrumb'
import { campaignStatus } from '@/utils/conf'
import { useState } from 'react'
import { Spin } from 'antd'
import CampaignInfo from './info/campaign'
import ParticipationInfo from './info/participation'

const moduleMap = {
  0: <CampaignInfo />,
  1: <ParticipationInfo />
}
export default function () {
  const { id } = useParams()
  const { data: pageInfo = {}, loading } = useQuery(
    ['campaignDetail', id],
    () => getCampaignDetail(id),
    {
      staleTime: Infinity,
      refetchOnWindowFocus: true
    }
  )
  if (loading) {
    return <Spin />
  }
  const [selectStatus, setSelectedStatus] = useState(0)

  const tabList = useMemo(() => {
    const baseInfo = {
      label: 'Campaign Info',
      value: 0
    }
    const participationInfo = {
      label: 'Participation',
      value: 1
    }
    const hasParticipationList = [1, 4, 5]
    return hasParticipationList.includes(pageInfo.campaign?.status)
      ? [participationInfo, baseInfo]
      : [baseInfo]
  }, [pageInfo])

  return (
    <>
      <Breadcrumb
        items={[
          {
            title: 'Incentive Campaign',
            href: '/'
          },
          {
            title: pageInfo?.campaign?.name
          }
        ]}
      />
      <section className='mb-10 pt-0.5 flex items-center'>
        <h2 className='font-bold text-5xl mb-0.5 text-t-1'>
          {pageInfo?.campaign?.name}
        </h2>
        <div className='px-4 py-0.5 rounded-xl'>
          {
            campaignStatus.find(v => v.value === pageInfo?.campaign?.status)
              ?.label
          }
        </div>
      </section>

      <section>
        <div className='mb-8 flex gap-x-20'>
          {tabList.map(v => {
            return (
              <button
                key={v.value}
                className={clsx(
                  selectStatus === v.value
                    ? 'text-t-1 font-black relative before:absolute before:w-full before:h-0.5 before:left-0 before:-bottom-2 before:bg-white'
                    : 'text-t-2 font-bold',
                  'text-xl '
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
        {moduleMap[selectStatus]}
      </section>
    </>
  )
}
