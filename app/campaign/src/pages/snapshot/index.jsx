import { useParams } from 'react-router-dom'
import { useProposal } from '@tbook/snapshot/api'
import TimerDown from '@tbook/snapshot/components/TimerDown'
import Markdown from './Markdown'
import SingleVote from './SingleVote'
import VoteResult from './VoteResult'
import CastModal from './CastModal'
import Loading from '@/components/loading'
import { Affix } from 'antd'
import { useResponsive } from 'ahooks'

const regex = /(!\[.*?\]\()ipfs:\/\/([^)]+)(\))/g
const replacement = '$1https://snapshot.4everland.link/ipfs/$2$3'

const formatIPFS = src => {
  if (typeof src !== 'string') return
  return src
    .split('\n')
    .map(markdown => {
      return markdown.replace(regex, replacement)
    })
    .join('\n')
}

export default function Snapshot () {
  const { snapshotId } = useParams()
  const { data, isLoading } = useProposal(snapshotId)
  const { pc } = useResponsive()
  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <div className='lg:w-page-content mx-auto relative'>
        <div className='px-6 pt-5 min-h-[calc(100vh_-_100px)] space-y-8 pb-3'>
          <div className='space-y-3 lg:space-y-4'>
            <TimerDown state={data?.state} value={data?.end} />
            <h2 className='text-xl lg:font-medium font-bold lg:text-4xl'>{data?.title}</h2>
          </div>

          <div className='lg:flex space-y-16 lg:space-y-0 lg:gap-x-20'>
            <div className='space-y-6 lg:space-y-16 lg:w-[calc(100%_-_480px)]'>
              <Markdown>{formatIPFS(data?.body)}</Markdown>

              {data?.state === 'closed' && (
                <div className='text-[#C4C4C4] text-sm mb-4'>
                  The voting has closed.
                </div>
              )}

              {data?.state !== 'closed' && (
                <SingleVote snapshotId={snapshotId} />
              )}
            </div>

            <div className='lg:w-[400px] lg:flex-none'>
              {pc ? (
                <Affix offsetTop={40}>
                  <VoteResult snapshotId={snapshotId} />
                </Affix>
              ) : (
                <VoteResult snapshotId={snapshotId} />
              )}
            </div>
          </div>
        </div>
      </div>
      <CastModal />
    </>
  )
}
