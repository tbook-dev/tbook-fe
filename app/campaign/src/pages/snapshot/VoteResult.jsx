import BigNumber from 'bignumber.js'
import { useProposal } from '@tbook/snapshot/api'
import clsx from 'clsx'
import { useMemo } from 'react'
import { formatImpact } from '@tbook/utils/lib/conf'
import { Skeleton } from 'antd'

export default function VoteResult({ snapshotId }) {
  const { data, isLoading } = useProposal(snapshotId)
  const choices = useMemo(() => {
    // const sum =
    return Array.isArray(data?.choices)
      ? data.choices.map((v, idx) => {
        return {
          choiceDesc: v,
          percent:
            data.scores_total === 0
              ? 0
              : BigNumber(data.scores[idx])
                .div(data.scores_total)
                .times(100)
                .toFixed(1),
          voteNum: BigNumber(data.scores[idx]).toFixed(6)
        }
      })
      : []
  }, [data])
  const arriveQuorum = BigNumber(data?.scores_total).gte(data?.quorum)

  return (isLoading ? <Skeleton /> :
    <div className='space-y-6'>
      {data?.quorum > 0 && (
        <div className='space-y-3'>
          <h2 className='flex items-center justify-between text-sm font-medium text-white'>
            <span>Quorum</span>
            <span
              className={clsx(
                arriveQuorum ? 'text-[#76DF9A] flex items-center gap-x-1' : ''
              )}
            >
              {formatImpact(BigNumber(data?.scores_total).toFixed(6))}/
              <span className='text-white'>{formatImpact(data?.quorum)}</span>
            </span>
          </h2>
        </div>
      )}

      <div className='space-y-8'>
        {choices.map((v, idx) => {
          return (
            <div key={idx} className='space-y-2'>
              <div className='flex justify-between items-start gap-x-1 text-sm font-medium'>
                <p>{v.choiceDesc}</p>
                <p className='flex-none'>
                  {formatImpact(v.voteNum)} {data?.symbol}<span className='m-1' />{v.percent}%
                </p>
              </div>

              <div className='relative rounded-full bg-[#1a1a1a] h-1'>
                <div
                  className='absolute inset-y-0 left-0 bg-white rounded-full'
                  style={{
                    width: `${v.percent}%`
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
