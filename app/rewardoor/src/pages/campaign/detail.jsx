import clsx from 'clsx'
import { getCampaignDetail } from '@/api/incentive'
import { useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import { useQuery } from 'react-query'
import { useMemo } from 'react'
import Breadcrumb from '@/components/breadcrumb'
import { campaignStatus } from '@/utils/conf'
import { useState } from 'react'
import { Spin } from 'antd'
const dateFormat = `YYYY-MM-DD HH:mm:ss`

export default function () {
  const { id } = useParams()
  const { data: pageInfo = {}, loading } = useQuery(
    ['campaignDetail', id],
    () => getCampaignDetail(id),
    {
      staleTime: Infinity
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
      value: 0
    }
    const hasParticipationList = [1, 4, 5]
    return hasParticipationList.includes(pageInfo.campaign?.status)
      ? [participationInfo, baseInfo]
      : [baseInfo]
  }, [pageInfo])

  const credentials = useMemo(() => {
    let _credentials = []
    try {
      _credentials = Array.from(
        new Set(
          JSON.parse(pageInfo?.campaign?.reward)
            .map(v => v.credentials)
            .flat(1)
            .map(Number)
        )
      )
    } catch (e) {}
    // console.log(_credentials, pageInfo.credentials)
    return pageInfo.credentials
      ?.filter(op => _credentials.includes(op.credentialId))
      .map(v => ({ name: v.name, value: v.credentialId }))
  }, [pageInfo])
  const rewardOpt = useMemo(() => {
    let hasNFT = false
    let hasPoint = false
    try {
      const reward = JSON.parse(pageInfo?.campaign?.reward) || []
      // incentiveAssetsTypeList.NFT =1,2
      hasNFT = reward.some(v => v.incentiveAsset === 1)
      hasPoint = reward.some(v => v.incentiveAsset === 2)
    } catch (e) {
      // console.log(e)
    }
    return { hasNFT, hasPoint }
  }, [pageInfo])
  console.log({ rewardOpt, credentials, loading })
  const groups = useMemo(() => {
    return pageInfo?.groups?.map(v => {
      return []
    })
  }, [pageInfo])
  return (
    <>
      <Breadcrumb
        items={[
          {
            title: 'Incentive Campaign',
            href: '/campaign'
          },
          {
            title: pageInfo?.campaign?.name
          }
        ]}
      />
      <section className='mb-5 pt-0.5'>
        <h2 className='font-bold text-5xl mb-0.5 text-t-1'>
          {pageInfo?.campaign?.name}
        </h2>

        <div className='font-bold text-xs flex gap-x-2 items-center'>
          <div className='px-4 py-0.5 bg-[#1A1A1A] rounded-xl'>
            {
              campaignStatus.find(v => v.value === pageInfo?.campaign?.status)
                ?.label
            }
          </div>
          <div className='px-4 py-0.5 bg-[#1A1A1A] rounded-xl'>
            {`${dayjs(pageInfo?.campaign?.startAt).format(dateFormat)}-${dayjs(
              pageInfo?.campaign?.endAt
            ).format(dateFormat)}`}
          </div>
        </div>
      </section>

      <section>
        {tabList.map(v => {
          return (
            <button
              key={v.value}
              className={clsx(
                selectStatus === v.value
                  ? 'text-t-1 font-black relative before:absolute before:w-full before:h-0.5 before:left-0 before:-bottom-2 before:bg-white'
                  : 'text-t-2 font-bold',
                'text-xl mr-20'
              )}
              onClick={() => {
                setSelectedStatus(v.value)
              }}
            >
              {v.label}
            </button>
          )
        })}
      </section>
    </>
  )
}
