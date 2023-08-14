import clsx from 'clsx'
import { getCampaignDetail } from '@/api/incentive'
import { useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import { useQuery } from 'react-query'
import { useMemo } from 'react'
import Breadcrumb from '@/components/breadcrumb'
import { campaignStatus } from '@/utils/conf'
import { incentiveAssetsTypeList } from '@/utils/conf'

const dateFormat = `YYYY-MM-DD HH:mm:ss`

export default function () {
  const { id } = useParams()
  const { data: pageInfo = {}, loading } = useQuery(
    ['campaignDetail', id],
    () => getCampaignDetail(id)
  )
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
      <section className='mb-10 pt-0.5'>
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

      <section className='space-y-5'>
        <div className='space-y-3'>
          <h2 className='font-bold text-base '>Credential Group & Reward</h2>
        </div>

        <div className='pt-4 pb-5 pl-8 bg-gray rounded-[20px]'>
          <h2 className='font-bold text-base mb-4'>Campaign Description</h2>
          <div className='font-medium text-base'>
            {pageInfo?.campaign?.description}
          </div>
        </div>
      </section>
    </>
  )
}
