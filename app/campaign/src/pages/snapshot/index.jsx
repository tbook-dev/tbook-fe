import { useParams, Link, useLoaderData } from 'react-router-dom'
import { useProposal } from '@tbook/snapshot/api'
import TimerDown from '@tbook/snapshot/components/TimerDown'
import Markdown from './Markdown'
import SingleVote from './SingleVote'
import VoteResult from './VoteResult'
import CastModal from './CastModal'
import { Affix, Skeleton } from 'antd'
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

export default function Snapshot() {
  const { snapshotId, campaignId } = useParams()
  const { projectName, isUsingSubdomain } = useLoaderData()
  const { data, isLoading } = useProposal(snapshotId)
  const { pc } = useResponsive()

  return (
    <>
      <div className='lg:w-page-content mx-auto relative'>
        <div className='px-6 pt-5 min-h-[calc(100vh_-_100px)] space-y-8 pb-3'>
          {
            isLoading ? <Skeleton /> :
              <div className='space-y-3 lg:space-y-4'>
                <div>
                  <Link
                    to={`${isUsingSubdomain ? '' : `/${projectName}`
                      }/${campaignId}`}
                    className='flex items-center gap-x-1 text-sm font-semibold py-2.5 text-[#717374] group hover:text-white'
                  >
                    <div className='w-6 h-6 flex items-center justify-center'>
                      <svg
                        width='12'
                        height='12'
                        viewBox='0 0 12 12'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M12 5.25H2.8725L7.065 1.0575L6 0L0 6L6 12L7.0575 10.9425L2.8725 6.75H12V5.25Z'
                          className='fill-[#717374] group-hover:fill-white'
                        />
                      </svg>
                    </div>
                    Back to campaign
                  </Link>
                  <TimerDown state={data?.state} value={data?.end} />
                </div>

                <h2 className='text-xl lg:font-medium font-bold lg:text-4xl'>
                  {data?.title}
                </h2>
              </div>

          }


          <div className='lg:flex space-y-16 lg:space-y-0 lg:gap-x-20'>
            {
              isLoading ? <Skeleton /> :
                <div className='space-y-6 lg:space-y-16 lg:w-[calc(100%_-_480px)]'>
                  <Markdown>{formatIPFS(data?.body)}</Markdown>

                  <div>
                    <h2 className='mb-4 text-base font-bold font-zen-dot'>
                      Cast your vote
                    </h2>

                    {data?.state === 'closed' && (
                      <div className='text-[#C4C4C4] text-sm mb-4'>
                        The voting has closed.
                      </div>
                    )}

                    {data?.state !== 'closed' && (
                      <SingleVote snapshotId={snapshotId} />
                    )}
                  </div>
                </div>
            }


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
