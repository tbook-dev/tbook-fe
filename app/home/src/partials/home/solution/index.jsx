import { list } from './conf'
import Swiper from '@/components/Swiper'
import { Title } from '@/components/Para'
import { animated, useInView } from '@react-spring/web'

const moduleConf = {
  title: 'Solution',
  desc: [
    'Empowering Innovation Across the Spectrum',
    ' - Unleashing the Full Potential of the Open Economy'
  ]
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
    <div id='solution'>
      <div className='py-7 bg-black mb-[187px] lg:mb'>
        <Swiper list={list} />
      </div>

      <animated.div
        ref={ref}
        style={springs}
        className='bx flex flex-col items-center px-6 lg:px-0 space-y-10 mb-[192px] lg:mb-[360px]'
      >
        <Title text={moduleConf.title} />
        <div className='text-[32px] lg:text-[40px] leading-[48px] font-medium text-center'>
          {moduleConf.desc.map((v, idx) => {
            return <p key={idx}>{v}</p>
          })}
        </div>
      </animated.div>
    </div>
  )
}
