import tbookIcon from '@/images/icon/tbook.svg'
import banner from '@/images/banner.png'
import bannerlg from '@/images/banner-lg.png'
import { useResponsive } from 'ahooks'
import downIcon from '@/images/icon/down.svg'
import { useState, useCallback } from 'react'
import clsx from 'clsx'
import { useQuery } from 'react-query'
import { getCampaignDetail, twLogin } from '@/api/incentive'
import { useParams } from 'react-router-dom'
import { template } from 'lodash'
import { getTwitterId } from '@/utils/conf'
import Accordion from '@/components/accordion'
import giftIcon from '@/images/icon/gift.svg'
import pointIcon from '@/images/icon/point.svg'
import { Modal } from 'antd'

const textConf = {
  title: 'TBOOK Twitter Campaign',
  officalName: 'TBOOK',
  description: [
    `Following the TBOOK is one of the best ways to gain insight into what we’re building. Most importantly, it gives you an opportunity to have your voice heard and share feedback.`,
    `You will often find people from our engineering, ecosystem, marketing, and community teams actively posting on Twitter. `,
    `This campaign is designed to help you find some of our most active Twitter users. Additionally, it recognizes those who have taken the time to follow the TBOOK  by awarding a commemorative NFT.`
  ]
}
export default function () {
  const { pc } = useResponsive()
  const { campaignId } = useParams()
  const [showMore, setShowMore] = useState(false)
  const { data: page, twitterConnected } = useQuery(
    ['campaignDetail', campaignId],
    () => getCampaignDetail(campaignId)
  )
  const [rewardModalIdx, setRewardModalIdx] = useState(-1)
  const handleCancel = useCallback(() => {
    setRewardModalIdx(-1)
  }, [])
  console.log({ rewardModalIdx })
  return (
    <div className='space-y-8 px-4 lg:px-0 lg:w-[880px] mx-auto pt-8 pb-16 lg:pt-10 lg:pb-20 h-[300px] text-t-1'>
      <section className='space-y-5 lg:space-y-10'>
        <div>
          <h2 className='text-2xl font-bold mb-3'>{textConf.title}</h2>
          <h4 className='flex items-center gap-x-1 text-sm font-semibold'>
            <img src={tbookIcon} className='w-8 h-8 object-contain mr-2' />
            <span className='text-c-6'>by</span>
            <span>{textConf.officalName}</span>
          </h4>
        </div>

        <img
          src={page?.campaign?.picUrl ?? (pc ? bannerlg : banner)}
          className='w-full rounded-2.5xl h-[130px] lg:h-[294px] lg: object-cover object-center'
        />

        <div className='text-xs font-medium'>
          <div className={clsx('space-y-2 lg:space-y-0')}>
            {textConf.description.map((item, index) =>
              !showMore && !pc && index !== 0 ? null : (
                <p
                  key={index}
                  className={clsx(
                    'text-c-9',
                    !showMore &&
                      !pc &&
                      index === 0 &&
                      'text-clip overflow-hidden w-full whitespace-nowrap'
                  )}
                >
                  {item}
                </p>
              )
            )}
          </div>
          <img
            src={downIcon}
            className={clsx(
              'w-4 h-4 mx-auto mt-2 lg:hidden',
              showMore && 'rotate-180'
            )}
            onClick={() => {
              setShowMore(v => !v)
            }}
          />
        </div>
      </section>

      <section className='space-y-5 tetx-t-1'>
        {page?.groups?.map((group, index) => {
          const hasPoit = group.pointList?.length > 0
          return (
            <Accordion
              key={index}
              title={
                <h3 className='text-base lg:text-[20px] lg:font-bold font-semibold'>
                  Reward Group {index + 1}
                </h3>
              }
              fixedAreo={
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-x-2 text-base text-t-1'>
                    {hasPoit && (
                      <div className='flex items-center gap-x-1'>
                        <img src={pointIcon} className='w-[14px] h-[14px]' />
                        Points
                      </div>
                    )}
                  </div>
                  <img
                    src={giftIcon}
                    className='w-4 h-4'
                    onClick={() => {
                      setRewardModalIdx(index)
                    }}
                  />
                </div>
              }
            >
              <div className='space-y-2'>
                {group.credentialList?.map((redential, index) => (
                  <div
                    key={index}
                    className='flex items-center justify-between'
                  >
                    <div className='flex items-center gap-x-1.5 pr-2 flex-auto'>
                      <img
                        src={redential.picUrl}
                        className='w-6 h-6 object-contain'
                      />
                      <div
                        className='truncate'
                        dangerouslySetInnerHTML={{
                          __html: redential.displayExp
                        }}
                      />
                    </div>
                    {twitterConnected ? (
                      <button className='text-sm font-medium text-[#1D9BF0] underline whitespace-nowrap'>
                        Verify
                      </button>
                    ) : (
                      <button
                        className='text-sm lg:text-base font-medium text-[#1D9BF0] underline whitespace-nowrap'
                        onClick={twLogin}
                      >
                        Verify
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </Accordion>
          )
        })}
      </section>

      <Modal
        footer={null}
        title={null}
        open={rewardModalIdx >= 0}
        onCancel={handleCancel}
      >
        <div className='text-t-1 p-5'>
          <h2 className='text-4xl mb-2 font-bold'>
            Reward Group {rewardModalIdx + 1}
          </h2>
          <p className='text-base font-medium mb-10'>
            You may get these rewards once all tasks done！
          </p>
          <div>
            {page.groups?.[rewardModalIdx] && (
              <div className='flex items-center gap-x-1'>
                <img src={pointIcon} className='w-[14px] h-[14px]' />
                Points
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  )
}
