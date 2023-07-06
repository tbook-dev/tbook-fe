import clsx from 'clsx'
import Layout from './laylout'
import { useState } from 'react'
import Button from '@/components/button'
import { Link } from 'react-router-dom'
import { getCampaign } from '@/api/incentive'
import { useAsyncEffect } from 'ahooks'
import { useCurrentProject } from '@tbook/hooks'
import Loading from '@/components/loading'

//0: 草稿, 1：进行中, 2：计划中，3: 已完成, 16: 已删除

const campaignStatus = [
  {
    label: 'Ongoing',
    value: 2
  },
  {
    label: 'Scheduled',
    value: 3
  },
  {
    label: 'Draft',
    value: 1
  },
  {
    label: 'Completed',
    value: 4
  }
  // {
  //   label: 'Deleted',
  //   value: 16
  // }
]
const draftId = 1

export default function () {
  const [selectStatus, setSelectedStatus] = useState(campaignStatus[0].value)
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
  const listFilter = list.filter(v => v.status === selectStatus)
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

      <section
        className={clsx(
          listFilter.length === 0 && 'bg-gray rounded-button px-8 py-4'
        )}
      >
        {loading ? (
          <Loading h='h-40' />
        ) : (
          <div
            className={clsx(
              'grid gap-5',
              listFilter.length === 0 ? 'grid-cols-1' : 'grid-cols-3'
            )}
          >
            {listFilter.length > 0 ? (
              listFilter.map(v => (
                <Link
                  key={v.campaignId}
                  to={
                    draftId === v.status
                      ? `/draft/${v.campaignId}`
                      : `/dashboard/campaign/${v.campaignId}`
                  }
                >
                  <div className='rounded-button overflow-hidden h-[480px] bg-gray flex flex-col'>
                    <img
                      src={v.picUrl}
                      className='h-[319px] w-full object-cover'
                    />
                    <div className='p-6 flex flex-col justify-between flex-auto'>
                      <h2 className='font-bold text-2xl'>{v.name}</h2>
                      <p className='font-bold text-sm'>{v.description}</p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className='text-center text-c-9 text-base py-10'>
                No Data
              </div>
            )}
          </div>
        )}
      </section>
    </Layout>
  )
}
