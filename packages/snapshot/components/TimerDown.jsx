import { Statistic } from 'antd'
import countdonwSvg from '../images/countdown.svg'
import clsx from 'clsx'
const { Countdown } = Statistic

export default function TimerDown ({ state, value }) {
  return (
    <div
      className={clsx('w-max flex items-center gap-x-1 px-1 rounded-[20px]', {
        'text-[#F87171] bg-[#321717]': state === 'pending',
        'text-[#FF5151] bg-[#270F1E]': ['active', 'closed'].includes(state)
      })}
    >
      <img src={countdonwSvg} className='w-3 h-3 object-center' />
      {state === 'closed' && 'closed'}
      {state === 'pending' && 'pending'}
      {state === 'active' && (
        <Countdown
          valueStyle={{
            color: state === 'pending' ? '#F87171' : '#FF5151',
            fontSize: '12px',
            lineHeight: '20px'
          }}
          format='D[d] H[h] m[m] s[s]'
          value={value * 1000}
        />
      )}
    </div>
  )
}
