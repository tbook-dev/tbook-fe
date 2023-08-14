import Layout from './laylout'
import clsx from 'clsx'
import { getCampaignDetail } from '@/api/incentive'
import { useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import { useRequest } from 'ahooks'
import { useMemo } from 'react'
import Breadcrumb from '@/components/breadcrumb'

import { incentiveAssetsTypeList } from '@/utils/conf'
const dateFormat = `YYYY-MM-DD`

export default function () {
  const { id } = useParams()
  const { data: pageInfo = {}, loading } = useRequest(
    () => getCampaignDetail(id),
    {
      refreshDeps: [id]
    }
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
  return (
    <Layout>
      <section className='mb-6'>
        <h2 className='font-bold text-xl mb-0.5'>{pageInfo?.campaign?.name}</h2>

        <div className='font-bold text-xs flex items-center'>
          <div className='px-4 py-0.5 mr-2 bg-gray rounded-xl'>Scheduled</div>
          <div className='px-4 py-0.5 mr-2 bg-gray rounded-xl'>
            {`${dayjs(pageInfo?.campaign?.startAt).format(dateFormat)}-${dayjs(
              pageInfo?.campaign?.endAt
            ).format(dateFormat)}`}
          </div>
        </div>
      </section>

      <section className='space-y-5'>
        <div className='pt-4 pb-5 pl-8 bg-gray rounded-[20px]'>
          <h2 className='font-bold text-base mb-4'>Credentials</h2>
          <div className='flex flex-wrap'>
            {credentials?.map(v => {
              return (
                <div
                  className={clsx(
                    'flex items-center group justify-center h-8 px-6 rounded-md relative bg-b-1 mr-6 mb-3 text-white'
                  )}
                  key={v.value}
                >
                  {v.name}
                </div>
              )
            })}
          </div>
        </div>

        <div className='pt-4 pb-5 pl-8 bg-gray rounded-[20px]'>
          <h2 className='font-bold text-base mb-4'>Reward</h2>
          <div className='flex flex-wrap'>
            {rewardOpt.hasNFT && (
              <div
                className={clsx(
                  'flex items-center group justify-center h-8 px-6 rounded-md relative bg-b-1 mr-6 mb-3 text-white'
                )}
              >
                🎁 NFT
              </div>
            )}

            {rewardOpt.hasPoint && (
              <div
                className={clsx(
                  'flex items-center group justify-center h-8 px-6 rounded-md relative bg-b-1 mr-6 mb-3 text-white'
                )}
              >
                💎 POINTS
              </div>
            )}
          </div>
        </div>

        <div className='pt-4 pb-5 pl-8 bg-gray rounded-[20px]'>
          <h2 className='font-bold text-base mb-4'>Campaign Description</h2>
          <div className='font-medium text-base'>
            {pageInfo?.campaign?.description}
          </div>
        </div>
      </section>
    </Layout>
  )
}
