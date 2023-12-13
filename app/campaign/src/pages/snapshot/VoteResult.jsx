import BigNumber from 'bignumber.js'
import { useProposal } from '@tbook/snapshot/api'
import clsx from 'clsx'
import { useMemo } from 'react'
import { formatDollar } from '@tbook/utils/lib/conf'

export default function VoteResult ({ snapshotId }) {
  const { data } = useProposal(snapshotId)
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
  return (
    <div className='space-y-6'>
      {data?.quorum > 0 && (
        <div className='space-y-3'>
          <h2 className='flex items-center justify-between text-sm font-medium text-white'>
            <span>Turnout/Quorum</span>
            <span
              className={clsx(
                arriveQuorum ? 'text-[#76DF9A] flex items-center gap-x-1' : ''
              )}
            >
              {arriveQuorum && (
                <svg
                  width='14'
                  height='14'
                  viewBox='0 0 14 14'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <rect width='14' height='14' rx='7' fill='#76DF9A' />
                  <path
                    d='M3 7.39917C3 7.39917 5.04854 9.07486 5.25202 10.5C5.25202 10.5 7.93818 6.10281 10.9228 5.70938C10.9228 5.70938 10.0138 5.04697 10.3123 4C10.3123 4 8.6572 4.16515 5.53692 9.00837L4.07453 6.52601L3 7.39917Z'
                    fill='white'
                  />
                </svg>
              )}
              {formatDollar(BigNumber(data?.scores_total).toFixed(6), 6)}/
              {formatDollar(data?.quorum, 6)}
            </span>
          </h2>
        </div>
      )}

      <div className='space-y-8'>
        {choices.map((v, idx) => {
          return (
            <div key={idx} className='space-y-2'>
              <div className='flex justify-between items-center text-sm font-medium'>
                <p>{v.choiceDesc}</p>
                <p>
                  {formatDollar(v.voteNum, 6)} {data?.symbol}/{v.percent}%
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
