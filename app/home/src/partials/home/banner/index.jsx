import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper'
import 'swiper/css'
import 'swiper/css/autoplay'
import homeVideo from './homepage.mp4'
import { useSpring, animated } from '@react-spring/web'

const pageConf = {
  h1: {
    prefix: 'optimize',
    aspects: [
      'core',
      'token economy',
      'governance',
      'protocol design',
      'incentive program'
    ],
    surfix: 'of future financial system'
  },
  desc: 'We help industry to navigate critical decisions, elevate token economy as a whole'
}

export default function () {
  const props = useSpring({
    from: { opacity: 0, transform: 'translateY(100px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 500 }
  })
  return (
    <section
      id='home'
      className='relative overflow-hidden py-[180px] lg:py-[300px] video-mask min-h-screen flex flex-col justify-center line1'
    >
      <video
        className='absolute inset-0 h-full w-full object-cover object-center'
        autoPlay
        loop
        muted
      >
        <source src={homeVideo} type='video/webm' />
        Your browser does not support the video tag. Please update your browser.
      </video>
      <animated.main className='relative bx z-10' style={props}>
        <div className='text-[32px] leading-[38px] font-medium px-6 lg:text-[60px] lg:leading-[72px] lg:px-0 mb-6 lg:mb-10'>
          <h2 className='flex gap-x-5 items-center justify-start w-max'>
            {pageConf.h1.prefix}
            <Swiper
              modules={[Autoplay]}
              loop
              loopPreventsSlide
              speed={1500}
              direction='vertical'
              effect='fade'
              className='h-[72px]'
              spaceBetween={72}
              autoplay={{
                delay: 0,
                pauseOnMouseEnter: true,
                disableOnInteraction: false
              }}
            >
              {pageConf.h1.aspects.map((v, idx) => (
                <SwiperSlide
                  key={idx}
                  style={{ width: 'max-content', height: 72 }}
                >
                  <span className='text-[#006EE9]'>{v}</span>
                </SwiperSlide>
              ))}
            </Swiper>
          </h2>
          <h2>{pageConf.h1.surfix}</h2>
        </div>
        <p className='text-base lg:text-xl mx-auto lg:ml-0'>{pageConf.desc}</p>
      </animated.main>
    </section>
  )
}
