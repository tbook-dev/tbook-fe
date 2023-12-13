import { useParams } from 'react-router-dom'
import { useProposal } from '@tbook/snapshot/api'
import TimerDown from '@tbook/snapshot/components/TimerDown'
import Markdown from './Markdown'
import SingleVote from './SingleVote'
import VoteResult from './VoteResult'
import CastModal from './CastModal'

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
  const { data } = useProposal(snapshotId)

  return (
    <>
      <div className='lg:w-[880px] mx-auto'>
        <div className='px-6 pt-5 min-h-[calc(100vh_-_100px)] space-y-8 pb-3'>
          <div className='space-y-3'>
            <TimerDown state={data?.state} value={data?.end} />
            <h2 className='text-xl font-bold'>{data?.title}</h2>
          </div>

          <Markdown>{formatIPFS(data?.body)}</Markdown>

          {data?.state !== 'closed' && <SingleVote snapshotId={snapshotId} />}
          <VoteResult snapshotId={snapshotId} />
        </div>
      </div>
      <CastModal />
    </>
  )
}
