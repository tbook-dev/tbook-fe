import { conf } from '@tbook/utils'
import Loading from '@/components/loading'
import clsx from 'clsx'
import usePoint from '@/hooks/queries/usePoint'

const { formatDollar, shortAddress } = conf
export default function Credential () {
  const { data: info, isLoading: loading } = usePoint()

  return loading ? (
    <Loading h='h-40' />
  ) : (
    <>
      <div className='rounded-button bg-gray px-8 py-4 mb-5 w-[220px]'>
        <h3 className='text-xl font-black text-[#C8C8C8]'>
          {formatDollar(info.totalPoints)}
        </h3>
        <p2>GiveAway Points</p2>
      </div>

      <div className='w-[520px] px-8 py-4 bg-gray rounded-2.5xl'>
        <h2 className='font-bold text-base mb-2 text-t-1'>Points Leaderboard</h2>
        <div className='flex justify-between text-sm text-c-6'>
          <span>Top10 Holder Address</span>
          <span>Points</span>
        </div>
        <div className='space-y-2 text-sm font-medium'>
          {info?.addressPoints?.length > 0 ? (
            info?.addressPoints.map((v, idx) => {
              return (
                <div
                  className={clsx('flex items-center justify-between h-6')}
                  key={idx}
                >
                  <span className='text-t-1'>{shortAddress(v.address)}</span>
                  <span>{formatDollar(v.points)}</span>
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
