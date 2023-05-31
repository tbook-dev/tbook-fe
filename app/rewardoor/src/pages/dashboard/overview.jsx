import { useState } from 'react'
import Layout from './laylout'
import { conf } from '@tbook/utils'
import { incentiveAssetsTypeList } from '@/utils/conf'

const { formatDollar } = conf
const list = [
  {
    name: 'Rewardoor Campaign 004',
    type: 1,
    participation: 2000,
    qualified: 1800,
    claimed: 1200
  },
  {
    name: 'Rewardoor Campaign 004',
    type: 1,
    participation: 2000,
    qualified: 1800,
    claimed: 1200
  },
  {
    name: 'Rewardoor Campaign 004',
    type: 1,
    participation: 2000,
    qualified: 1800,
    claimed: 1200
  },
  {
    name: 'Rewardoor Campaign 004',
    type: 1,
    participation: 2000,
    qualified: 1800,
    claimed: 1200
  },
  {
    name: 'Rewardoor Campaign 004',
    type: 1,
    participation: 2000,
    qualified: 1800,
    claimed: 1200
  },
  {
    name: 'Rewardoor Campaign 004',
    type: 1,
    participation: 2000,
    qualified: 1800,
    claimed: 1200
  }
]
export default function () {
  const [info, setInfo] = useState()

  const overviewConf = [
    {
      label: 'Awarded behaviors',
      value: 2000
    },
    {
      label: 'Awarded credentials',
      value: 1800
    },
    {
      label: 'Awarded NFT',
      value: 500
    },
    {
      label: 'Incentive Campaigns',
      value: 6
    }
  ]
  const cols = [
    {
      title: 'Campaign Name',
      render: v => v.name,
      algin: 'left'
    },
    {
      title: 'Rewards',
      render: v => incentiveAssetsTypeList.find(i => v.type === i.value)?.label,
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
            {list.map(data => {
              return (
                <tr key={data.id}>
                  {cols.map(col => {
                    return (
                      <td align={col.algin} key={col.title} className='pb-3'>
                        {col.render(data)}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </section>
    </Layout>
  )
}
