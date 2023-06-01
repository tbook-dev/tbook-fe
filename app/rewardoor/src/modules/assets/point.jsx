import { useCurrentProject } from '@tbook/hooks'
import { useAsyncEffect } from 'ahooks'
import { getPoint } from '@/api/incentive'
import { useState } from 'react'
import { conf } from '@tbook/utils'
import Loading from '@/components/loading'
import clsx from 'clsx'

const { formatDollar, shortAddress } = conf
export default function Credential () {
  const { projectId } = useCurrentProject()
  const [loading, setLoading] = useState(false)
  const [info, setInfo] = useState([])
  useAsyncEffect(async () => {
    if (!projectId) return
    setLoading(true)
    const res = await getPoint(projectId)
    setInfo(res)
    setLoading(false)
  }, [projectId])

  return loading ? (
    <Loading h='h-40' />
  ) : (
    <>
      <div className='rounded-button bg-gray px-8 py-4 mb-5 w-[220px]'>
        <h3 className='text-2xl font-bold text-colorful1'>
          {formatDollar(info.totalPoints)}
        </h3>
        <p2>Awarded Points</p2>
      </div>
      <div className='w-[600px] px-8 py-4 bg-gray rounded-button'>
        <h2 className='font-bold text-base mb-2'>Points Leaderboard</h2>
        <div className='flex justify-between text-sm text-c-9'>
          <span>Top 10</span>
          <span>Points</span>
        </div>
        <div className='space-y-2 text-sm'>
          {info?.addressPoints?.length > 0 ? (
            info?.addressPoints.map((v, idx) => {
              return (
                <div
                  className={clsx('flex items-center justify-between h-6')}
                  key={idx}
                >
                  <span>{shortAddress(v.address)}</span>
                  <span>{formatDollar(v.points)}</span>
                </div>
              )
            })
          ) : (
            <div className='h-[300px] w-full rounded-button bg-gray flex justify-center items-center'>
              No Data
            </div>
          )}
        </div>
      </div>
    </>
  )
}
