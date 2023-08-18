import tbookIcon from '@/images/icon/tbook.svg'
import banner from '@/images/banner.png'
import bannerlg from '@/images/banner-lg.png'
import { useResponsive } from 'ahooks'
import downIcon from '@/images/icon/down.svg'
import { useState } from 'react'
import clsx from 'clsx'
import { useQuery } from 'react-query'
import { getCampaignDetail } from '@/api/incentive'
import { useParams } from 'react-router-dom'
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
  const { data: page } = useQuery(['campaignDetail', campaignId], () =>
    getCampaignDetail(campaignId)
  )
  console.log(page, page?.campaign?.picUrl)
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

      <section className='space-y-5'>
        {page?.groups?.map((group, index) => (
          <div key={index}>
            <h3 className='text-lg font-bold'>Reward Group {index}</h3>
            <div className='space-y-2'>x</div>
          </div>
        ))}
      </section>
    </div>
  )
}
