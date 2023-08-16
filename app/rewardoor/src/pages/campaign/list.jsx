import clsx from 'clsx'
import { useState } from 'react'
import Button from '@/components/button'
import { Link } from 'react-router-dom'
import { getCampaign } from '@/api/incentive'
import { useQuery } from 'react-query'
import Loading from '@/components/loading'
import { PlusOutlined } from '@ant-design/icons'
import Compaign from '@/components/compaign'
import useUserInfo from "@/hooks/useUserInfoQuery"

//0: 草稿, 1：进行中, 2：计划中，3: 已完成, 16: 已删除
import { campaignStatus } from '@/utils/conf'

const ongoingId = 1
const pageTitle = 'Incentive Campaign'
export default function () {
  const [selectStatus, setSelectedStatus] = useState(campaignStatus[0].value)
  const { projectId } = useUserInfo()

  const { data: list = [], loading } = useQuery(
    ['campaignList', projectId],
    () => getCampaign(projectId),
    {
      staleTime: 1000 * 60 * 10,
      enabled: !!projectId
    }
  )
  const listFilter = list.filter(v => v.campaign?.status === selectStatus)
  return (
    <>
      <section className='flex justify-between items-center mb-5'>
        <h2 className='text-3xl font-black text-[#C8C8C8]'>{pageTitle}</h2>
        <Link to='/campaign/new'>
          <Button type='primary'>
            <PlusOutlined className='mr-2' />
            <span className='font-bold text-base'>New Campaign</span>
          </Button>
        </Link>
      </section>

      <section className='mb-6 flex justify-between items-center'>
        <div>
          {campaignStatus.map(v => {
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
        </div>
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
              'grid gap-6',
              listFilter.length === 0 ? 'grid-cols-1' : 'grid-cols-4'
            )}
          >
            {listFilter.length > 0 ? (
              listFilter.map(v => (
                <Compaign key={v.campaign?.campaignId} {...v} />
              ))
            ) : (
              <div className='text-center text-c-9 text-base py-10'>
                {selectStatus === ongoingId ? (
                  <div className='flex flex-col items-center'>
                    No Ongoing Campaign
                    <Link to='/campaign/new' className='mt-6'>
                      <Button type='primary'>
                        <PlusOutlined className='mr-2' />
                        <span className='font-bold text-base'>
                          New Campaign
                        </span>
                      </Button>
                    </Link>
                  </div>
                ) : (
                  'No Data'
                )}
              </div>
            )}
          </div>
        )}
      </section>
    </>
  )
}
