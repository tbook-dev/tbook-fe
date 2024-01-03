import { conf } from '@tbook/utils'
import Loading from '@/components/loading'
import useAsset from '@/hooks/queries/useAsset'
import { useMemo } from 'react'
import Address from '@tbook/ui/src/Address'
import pointSVG from '@/images/campaign/point-lg.svg'
import clsx from 'clsx'
import { useState } from 'react'
import { Pagination } from 'antd'

const { formatDollarV2: formatDollar } = conf
const pageSize = 10
export default function Point () {
  const { data: info, isLoading: loading } = useAsset()
  const [current, setCurrent] = useState(1)
  const { tableData, total, totalNum } = useMemo(() => {
    const totalNum = (info?.userPoints ?? []).reduce((acc, cur) => {
      return acc + cur.pointNum
    }, 0)
    const AllData = info?.userPoints?.map((item, index) => ({
      ...item,
      ranking: `${index + 1}`.padStart(2, '0')
    }))
    const tableData = AllData?.slice(
      (current - 1) * pageSize,
      current * pageSize
    )

    return {
      totalNum,
      tableData,
      total: AllData.length
    }
  }, [info, current])

  return loading ? (
    <Loading h='h-40' />
  ) : (
    <>
      <div className='rounded-button bg-gray px-8 py-5 mb-5  w-[520px] flex items-center gap-x-2 justify-between'>
        <div className='space-y-4'>
          <h3 className='text-colorful1 font-zen-dot text-5xl'>
            {formatDollar(totalNum ?? 0)}
          </h3>
          <p className='text-lg'>Points</p>
        </div>
        <img src={pointSVG} className='w-[120px] h-[120px] object-contain' />
      </div>

      <div className='w-[520px] pt-4 pb-2 bg-gray rounded-2.5xl'>
        <h2 className='font-medium px-5 text-lg pb-4 mb-4 border-b border-[rgb(255,255,255)]/[0.06]'>
          Points Leaderboard
        </h2>

        <div className='space-y-3 px-5 text-sm font-medium text-t-1'>
          <div className='flex items-center justify-between text-[#A1A1A2] text-sm font-medium'>
            <span className='w-[160px]'>Ranking</span>
            <span className='w-[200px]'>Address</span>
            <span className='w-[54px]'>Points</span>
          </div>
          {info?.userPoints?.length > 0 ? (
            <div className='text-white text-base'>
              <div className='mb-2'>
                {tableData.map((v, idx) => {
                  return (
                    <div
                      className={clsx('flex items-center justify-between h-6')}
                      key={idx}
                    >
                      <span className='italic w-[160px]'>{v.ranking}</span>
                      <span className='w-[200px]'>
                        <Address address={v.address} />
                      </span>

                      <span className='w-[54px]'>
                        {formatDollar(v.pointNum)}
                      </span>
                    </div>
                  )
                })}
              </div>
              <div className='flex justify-end border-t pt-2 border-[rgb(255,255,255)]/[0.06]'>
                <Pagination
                  responsive
                  showSizeChanger={false}
                  current={current}
                  pageSize={pageSize}
                  total={total}
                  onChange={page => {
                    setCurrent(page)
                  }}
                />
              </div>
            </div>
          ) : (
            <div className='h-[300px] text-t-1 w-full rounded-button bg-gray flex justify-center items-center'>
              No Data
            </div>
          )}
        </div>
      </div>
    </>
  )
}
