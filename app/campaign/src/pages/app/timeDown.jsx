import timeSvg from '@/images/icon/time.svg'
import { Statistic } from 'antd'
import useCampaignQuery from '@/hooks/useCampaignQuery'
import { useParams } from 'react-router-dom'
import { Popover } from 'antd'
const { Countdown } = Statistic

const finishTaskText = `We're excited to let you know the distribution result when the tasks are accomplished. `

export default function TimeDown () {
  const { campaignId } = useParams()
  const { data: page } = useCampaignQuery(campaignId)

  return (
    <Popover
      content={
        <div className='max-w-[calc(100vw_-_60px)] lg:max-w-[400px]'>{finishTaskText}</div>
      }
      trigger='click'
      placement='top'
    >
      <div className='flex items-center gap-x-1 px-2 py-1 rounded-2.5xl bg-[rgb(255,255,255)]/[0.1] w-max mb-4 cursor-pointer'>
        <img
          src={timeSvg}
          className='w-4 h-4 object-center object-contain'
          alt='time'
        />
        <Countdown
          value={page?.campaign?.endAt}
          format='D[d] H[h] m[m] s[s]'
          valueStyle={{
            color: '#fff',
            fontSize: '14px',
            lineHeight: '20px'
          }}
        />
      </div>
    </Popover>
  )
}
