import { useProposal, useUserVotes } from '@tbook/snapshot/api'
import dayjs from 'dayjs'
import { useState, useMemo, useEffect } from 'react'
import clsx from 'clsx'
import { useAccount } from 'wagmi'
import { useDispatch } from 'react-redux'
import {
  setSnapshotCastModal,
  setSnapshotData,
  setConnectWalletModal
} from '@/store/global'
import useUserInfo from '@/hooks/useUserInfoQuery'
import BigNumber from 'bignumber.js'

export default function SingleVote ({ snapshotId }) {
  const { data } = useProposal(snapshotId)
  const [voted, setVoted] = useState(null)
  const { address } = useAccount()
  const { data: votes } = useUserVotes(snapshotId, address)
  const dispath = useDispatch()
  const { wallectConnected } = useUserInfo()
  const handleVote = () => {
    if (wallectConnected) {
      dispath(setSnapshotCastModal(true))
      dispath(
        setSnapshotData({
          choice: voted,
          choiceText: data?.choices?.[voted - 1]
        })
      )
    } else {
      dispath(setConnectWalletModal(true))
    }
  }
  useEffect(() => {
    if (!votes) return
    const vote = votes?.find(v => v.voter === address)
    setVoted(vote?.choice ?? null)
  }, [votes])
  const remoteVoted = useMemo(() => {
    if (!votes) return
    return votes?.find(v => v.voter === address)
  }, [votes])

  return (
    <div className='space-y-6'>
      {data?.state === 'pending' && (
        <div className='text-[#C4C4C4] text-sm'>
          This voting will start at
          {dayjs(data?.start * 1000).format('MMM D, YYYY h:mm A')}
        </div>
      )}

      {remoteVoted && (
        <div className='text-white text-sm font-medium'>
          You voted
          <span className='px-2 rounded-full border mx-1'>
            {data?.choices?.[remoteVoted.choice - 1]}
          </span>
          <span className='mx-1'>with</span>
          <span className='mr-1'>{BigNumber(remoteVoted.vp).toFixed(6)}</span>
          {data?.symbol}
        </div>
      )}

      <div className='space-y-2'>
        {data?.choices.map((v, idx) => {
          return (
            <div
              key={idx}
              onClick={() => {
                setVoted(voted === idx + 1 ? null : idx + 1)
              }}
              className={clsx(
                'px-4 py-3  rounded-lg text-sm font-medium text-center',
                data?.state === 'active' && voted === idx + 1
                  ? 'border border-white text-white cursor-pointer select-none'
                  : 'border border-[rgba(255,255,255)]/[0.1] text-white'
              )}
            >
              {v}
            </div>
          )
        })}
      </div>
      <button
        disabled={!(data?.state === 'active' && voted !== null)}
        onClick={handleVote}
        className={clsx(
          'w-full text-xl font-medium h-12 rounded-lg',
          data?.state === 'active' && voted !== null
            ? 'bg-[#904BF6] text-white'
            : 'bg-[#2b174a] text-[#55456e]'
        )}
      >
        Vote
      </button>
    </div>
  )
}
