import { conf } from '@tbook/utils'
import Loading from '@/components/loading'
import clsx from 'clsx'
import useAsset from '@/hooks/queries/useAsset'
import { useMemo } from 'react'
import Address from '@tbook/ui/src/Address'

const { formatDollar } = conf

export default function Point () {
  const { data: info, isLoading: loading } = useAsset()

  const totalNum = useMemo(() => {
    return info?.userPoints?.reduce((acc, cur) => {
      return acc + cur.pointNum
    }, 0)
  }, [info?.userPoints])

  return loading ? (
    <Loading h='h-40' />
  ) : (
    <>
      <div className='rounded-button bg-gray px-8 py-4 mb-5 w-[220px]'>
        <h3 className='text-xl font-black text-t-1'>
          {formatDollar(totalNum ?? 0)}
        </h3>
        <p className='text-c-9'>GiveAway Points</p>
      </div>

      <div className='w-[520px] px-8 py-4 bg-gray rounded-2.5xl'>
        <h2 className='font-bold text-base mb-2 text-t-1'>
          Points Leaderboard
        </h2>
        <div className='flex justify-between text-sm text-c-6'>
          <span>Top10 Holder Address</span>
          <span>Points</span>
        </div>
        <div className='space-y-2 text-sm font-medium text-t-1'>
          {info?.userPoints?.length > 0 ? (
            info?.userPoints?.slice(0, 10).map((v, idx) => {
              return (
                <div
                  className={clsx('flex items-center justify-between h-6')}
                  key={idx}
                >
                  <span className='text-t-1'>
                    <Address address={v.address} />
                  </span>

                  <span>{formatDollar(v.pointNum)}</span>
                </div>
              )
            })
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
