import { useState } from 'react'
import Layout from './laylout'
import clsx from 'clsx'
import { getCampaignDetail } from '@/api/incentive'
import { useAsyncEffect } from 'ahooks'
import { useParams } from 'react-router-dom'
import dayjs from 'dayjs'
const dateFormat = `YYYY-MM-DD`

export default function () {
  const [pageInfo, setPageInfo] = useState({})
  const [loading, setLoading] = useState(false)
  const { id } = useParams()
  useAsyncEffect(async () => {
    if (!id) return
    setLoading(true)
    const res = await getCampaignDetail(id)
    setPageInfo(res)
    setLoading(false)
  }, [id])
  const credentialList = [
    {
      label: 'User of GoPlus Security Service',
      value: 1
    },
    {
      label: 'Ethereum Transactors_10 transactions',
      value: 2
    },
    {
      label: 'USDT Trader-Receive',
      value: 3
    },
    {
      label: 'Buyer of GoPlus Security Service',
      value: 4
    }
  ]
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
            {pageInfo?.credentials?.map(v => {
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
            <div
              className={clsx(
                'flex items-center group justify-center h-8 px-6 rounded-md relative bg-b-1 mr-6 mb-3 text-white'
              )}
            >
              🎁 NFT
            </div>
            <div
              className={clsx(
                'flex items-center group justify-center h-8 px-6 rounded-md relative bg-b-1 mr-6 mb-3 text-white'
              )}
            >
              💎 POINTS
            </div>
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
