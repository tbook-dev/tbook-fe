import TextMore from '@/components/textMore'
import { useMemo } from 'react'
import x from '@/images/icon/x-white.svg'
import dc from '@/images/icon/dc.svg'
import tg from '@/images/icon/tg.svg'
import { Tooltip } from 'antd'
import { formatDollar } from '@tbook/utils/lib/conf'
import LazyImage from '@/components/lazyImage'
import { Skeleton } from 'antd'

export default function Banner ({
  avatarUrl,
  projectName,
  tags,
  projectDescription,
  campaignNum,
  participantNum,
  isLoading
}) {
  const socialList = useMemo(() => {
    return [
      {
        name: 'x',
        picUrl: x,
        link: ''
      },
      {
        name: 'tg',
        picUrl: tg,
        link: ''
      },
      {
        name: 'dc',
        picUrl: dc,
        link: ''
      }
    ]
  }, [])
  const users = useMemo(() => {
    return [
      {
        num: formatDollar(campaignNum),
        text: campaignNum > 1 ? 'Campaigns' : 'Campaign'
      },
      {
        num: formatDollar(participantNum),
        text: participantNum > 1 ? 'Participants' : 'Participant'
      }
    ]
  }, [campaignNum, participantNum])

  return (
    <div className='flex flex-col gap-8 lg:flex-row'>
      <LazyImage
        src={avatarUrl}
        alt={projectName + 'logo'}
        className='w-20 h-20 lg:w-[108px] lg:h-[108px] object-contain object-center rounded-full flex-none'
      />

      <div className='space-y-4'>
        <h2 className='text-2xl font-zen-dot'>{projectName}</h2>
        <div className='flex items-center gap-2'>
          {tags.map((v, i) => (
            <div
              key={i}
              className='text-[#FCFCFC] text-xs px-1.5 py-1 border border-[#FCFCFC] rounded-2.5xl'
            >
              {v}
            </div>
          ))}
        </div>
        <div className='text-[#A1A1A2] text-sm'>
          <TextMore
            text={projectDescription}
            textConf={{
              pc: 'line-clamp-3',
              moble: 'line-clamp-4'
            }}
          />
        </div>
        <div className='flex items-center gap-x-3'>
          {socialList.map(v => {
            return (
              <a
                key={v.name}
                target='_blank'
                href={v.link}
                rel='nofollow noopener noreferrer'
              >
                <Tooltip title={v.link} placement='top'>
                  <img
                    src={v.picUrl}
                    className='w-6 h-6 object-center'
                    alt={v.name + ' logo'}
                  />
                </Tooltip>
              </a>
            )
          })}
        </div>
        <div className='text-sm flex items-center gap-8'>
          {isLoading ? (
            <Skeleton active paragraph={{ rows: 1 }} title={false} />
          ) : (
            users.map(v => {
              return (
                <div key={v.text}>
                  <span className='font-zen-dot mr-1'>{v.num}</span>
                  {v.text}
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
