import clsx from 'clsx'
import Layout from './laylout'
import { useState } from 'react'
import Button from '@/components/button'
import { Link } from 'react-router-dom'
import { getCampaign } from '@/api/incentive'
import { useAsyncEffect } from 'ahooks'
import { useCurrentProject } from '@tbook/hooks'
import Loading from '@/components/loading'

const campaignStatus = [
  {
    label: 'Ongoing',
    value: 1
  },
  {
    label: 'Scheduled',
    value: 2
  },
  {
    label: 'Draft',
    value: 3
  },
  {
    label: 'Completed',
    value: 4
  }
]

export default function () {
  const [selectStatus, setSelectedStatus] = useState(1)
  const { projectId } = useCurrentProject()
  const [loading, setLoading] = useState(false)
  const [list, setList] = useState([])
  useAsyncEffect(async () => {
    if (!projectId) return
    setLoading(true)
    const res = await getCampaign(projectId)
    setList(res)
    setLoading(false)
  }, [projectId])

  return (
    <Layout>
      <section className='mb-6 flex justify-between items-center'>
        <div>
          {campaignStatus.map(v => {
            return (
              <button
                key={v.value}
                className={clsx(
                  selectStatus === v.value
                    ? 'font-black relative before:absolute before:w-full before:h-0.5 before:left-0 before:-bottom-2 before:bg-white'
                    : 'font-bold',
                  'text-white  text-xl mr-20'
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
        <Link to='/campaign'>
          <Button type='primary'> + New Campaign</Button>
        </Link>
      </section>

      {loading ? (
        <Loading h='h-40' />
      ) : (
        <section className='grid grid-cols-3 gap-5'>
          {list.map(v => (
            <Link key={v.nft} to={`/dashboard/campaign/${v.nft}`}>
              <div className='rounded-button overflow-hidden h-[480px] bg-gray flex flex-col'>
                <img
                  src={v.picUrl}
                  className='h-[319px] w-full object-contain'
                />
                <div className='p-6 flex flex-col justify-between flex-auto'>
                  <h2 className='font-bold text-2xl'>{v.name}</h2>
                  <p className='font-bold text-sm'>{v.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </section>
      )}
    </Layout>
  )
}
