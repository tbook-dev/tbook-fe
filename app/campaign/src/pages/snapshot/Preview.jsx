import { useProposal } from '@tbook/snapshot/api'
import BigNumber from 'bignumber.js'
import { useMemo } from 'react'
import { formatDollar } from '@tbook/utils/lib/conf'
import { Skeleton } from 'antd'

export default function Preview ({ id }) {
  const { data, isLoading } = useProposal(id)
  const choices = useMemo(() => {
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

  return (
    <div className='space-y-4'>
      <h2>{data?.title}</h2>
      <div className='space-y-3'>
        {isLoading ? (
          <Skeleton />
        ) : (
          choices.map((v, idx) => (
            <div
              key={idx}
              className='flex justify-between items-start gap-x-1 bg-linear5 shadow-s4 rounded py-1.5 px-4  text-sm font-medium'
            >
              <span>{v.choiceDesc}</span>
              <span className='flex-none'>
                {formatDollar(v.voteNum, 6)} {data?.symbol}
                <span className='m-1' />
                {v.percent}%
              </span>
            </div>
          ))
        )}
        <div className='flex justify-center items-center bg-linear5 shadow-s4 rounded py-1.5 px-4  text-sm font-medium'>
          Go to vote
          <svg
            width='16'
            height='16'
            viewBox='0 0 17 16'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M6.03 11.06L9.08333 8L6.03 4.94L6.97 4L10.97 8L6.97 12L6.03 11.06Z'
              fill='white'
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
