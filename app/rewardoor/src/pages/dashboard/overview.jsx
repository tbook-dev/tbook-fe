import { useState } from 'react'
import Layout from './laylout'
import { conf } from '@tbook/utils'
import { incentiveAssetsTypeList } from '@/utils/conf'
import { getOverview } from '@/api/incentive'
import { useAsyncEffect } from 'ahooks'
import { useCurrentProject } from '@tbook/hooks'
import Loading from '@/components/loading'
const { formatDollar } = conf

export default function () {
  const [info, setInfo] = useState({})
  const [loading, setLoading] = useState(false)
  const { projectId } = useCurrentProject()

  useAsyncEffect(async () => {
    if (!projectId) return
    setLoading(true)
    const res = await getOverview(projectId)
    setInfo(res)
    setLoading(false)
  }, [projectId])

  const overviewConf = [
    {
      label: 'Awarded behaviors',
      value: info.actionCount || 0
    },
    {
      label: 'Awarded credentials',
      value: info.credentialCount || 0
    },
    {
      label: 'Awarded NFT',
      value: info.nftCount || 0
    },
    {
      label: 'Incentive Campaigns',
      value: info.campaignCount || 0
    }
  ]
  const cols = [
    {
      title: 'Campaign Name',
      render: v => v.campaign.name,
      algin: 'left'
    },
    {
      title: 'Rewards',
      render: v =>
        [v.nftReward ? 1 : 0, v.pointsReward ? 2 : 0].map(i => (
          <span key={i} className='mr-2'>
            {incentiveAssetsTypeList.find(m => m.value === i)?.label || ''}
          </span>
        )),
      algin: 'center'
    },
    {
      title: 'Participation',
      render: v => v.participation,
      algin: 'right'
    },
    {
      title: 'Qualified',
      render: v => v.qualified,
      algin: 'right'
    },
    {
      title: 'Claimed',
      render: v => v.claimed,
      algin: 'right'
    }
  ]
  return (
    <Layout>
      <section className='mb-5'>
        <h2 className='font-bold text-xl mb-5'>Overview</h2>
        <div className='grid grid-cols-4 gap-x-4'>
          {overviewConf.map(v => (
            <div key={v.label} className='bg-gray rounded-button px-8 py-4'>
              <div className='font-black text-xl'>
                <span className='text-colorful1'>{formatDollar(v.value)}</span>
              </div>
              <div className='font-medium text-sm text-c-9'>{v.label}</div>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h3 className='text-base text-white text-bold mb-2'>Statistics</h3>
        {loading ? (
          <Loading h='h-40' />
        ) : (
          <table className='w-full'>
            <thead>
              <tr>
                {cols.map(v => (
                  <th
                    className='font-medium text-sm text-c-9 pb-4'
                    align={v.algin}
                    key={v.title}
                    scope='col'
                  >
                    {v.title}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className='space-y-3'>
              {info?.campaigns?.length > 0 ? (
                info?.campaigns?.map(data => {
                  return (
                    <tr key={data?.campaign?.campaignId}>
                      {cols.map(col => {
                        return (
                          <td
                            align={col.algin}
                            key={col.title}
                            className='pb-3'
                          >
                            {col.render(data)}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td
                    colSpan={cols.length}
                    className='text-center text-c-9 py-10'
                  >
                    No data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </section>
    </Layout>
  )
}
