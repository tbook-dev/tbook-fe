import { list } from './conf'
import Swiper from '@/components/Swiper'
import { Title } from '@/components/Para'
import { animated, useInView } from '@react-spring/web'
import v1 from './solution1.webm'

const moduleConf = {
  title: 'Solution',
  desc: [
    'Empowering Innovation Across the Spectrum',
    '- Unleashing the Full Potential of the Open Economy'
  ],
  tips: ['Discover what tbook', 'can do for your protocol']
}
export default function Solution () {
  const [ref, springs] = useInView(
    () => ({
      from: { opacity: 0, transform: 'translateY(200px)' },
      to: { opacity: 1, transform: 'translateY(0)' },
      config: { duration: 500 }
    }),
    { threshold: 0.2, once: true }
  )
  return (
    <div
      id='solution'
      className='relative overflow-hidden video-mask h-screen flex flex-col justify-between'
    >
      <video
        className='absolute inset-0 h-full w-full object-cover object-center'
        autoPlay
        loop
        muted
      >
        <source src={v1} type='video/webm' />
        Your browser does not support the video tag. Please update your browser.
      </video>
      <div className='py-7 mb-[187px] lg:mb'>
        <Swiper list={list} />
      </div>
      <animated.div
        ref={ref}
        style={springs}
        className='bx flex flex-col items-center px-6 lg:px-0 space-y-10 mb-[192px] lg:mb-[360px] relative z-10'
      >
        <Title text={moduleConf.title} />
        <div className='text-[32px] lg:text-[40px] leading-[48px] font-medium text-center'>
          {moduleConf.desc.map((v, idx) => {
            return <p key={idx}>{v}</p>
          })}
        </div>
      </animated.div>

      <div className='bx text-lg relative z-10 pb-20 flex flex-col items-center'>
        <div className='text-center'>
          {moduleConf.tips.map((v, idx) => (
            <p key={idx}>{v}</p>
          ))}
        </div>
        <svg
          width='40'
          height='40'
          viewBox='0 0 40 40'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M20 13V39.6667' stroke='#131517' stroke-width='1.5' />
          <path
            d='M20 39.4583C20.9028 35.8471 24.1667 28.1666 30 26.3333'
            stroke='#131517'
            stroke-width='1.5'
          />
          <path
            d='M20 39.25C19.0972 35.6389 15.8333 27.9583 10 26.125'
            stroke='#131517'
            stroke-width='1.5'
          />
        </svg>
      </div>
    </div>
  )
}
