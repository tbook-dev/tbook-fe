import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper'
import 'swiper/css'
import 'swiper/css/autoplay'
import homeVideo from './homepage.mp4'
import { useInView, animated } from '@react-spring/web'
import { useResponsive } from 'ahooks'
import VideoPlayer from '@/components/video'

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
  const [ref, springs] = useInView(
    () => ({
      from: { opacity: 0, transform: 'translateY(100px)' },
      to: { opacity: 1, transform: 'translateY(0)' },
      config: { duration: 500 },
      loop: true
    }),

    {
      rootMargin: '-40% 0%'
    }
  )
  const { pc } = useResponsive()
  return (
    <section
      id='home'
      className='relative overflow-hidden py-[180px] lg:py-[300px] video-mask min-h-screen flex flex-col justify-center line1'
    >
      <VideoPlayer
        src={homeVideo}
        className='absolute inset-0 h-full w-full object-cover object-center'
      />
      <animated.main
        ref={ref}
        className='relative bx z-10 text-center lg:text-left'
        style={springs}
      >
        <div className='text-[32px] leading-[40px] font-medium px-6 lg:text-[60px] lg:leading-[84px] lg:px-0 mb-6 lg:mb-10'>
          <div className='flex lg:gap-x-5 items-center flex-col lg:flex-row lg:justify-start lg:w-max'>
            <h2>{pageConf.h1.prefix}</h2>
            <Swiper
              modules={[Autoplay]}
              loop
              loopPreventsSlide
              speed={pc ? 1500 : 1000}
              direction='vertical'
              effect='fade'
              className={pc ? 'h-[72px]' : 'h-[40px]'}
              spaceBetween={pc ? 40 : 84}
              autoplay={{
                delay: 0,
                pauseOnMouseEnter: true,
                disableOnInteraction: false
              }}
            >
              {pageConf.h1.aspects.map((v, idx) => (
                <SwiperSlide
                  key={idx}
                  style={{
                    width: pc ? 'max-content' : '',
                    height: pc ? 84 : 40
                  }}
                  className='flex justify-center items-center'
                >
                  <span className='text-[#006EE9]'>{v}</span>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <h2>{pageConf.h1.surfix}</h2>
        </div>
        <p className='text-base lg:text-xl mx-auto lg:ml-0 px-12 lg:px-0'>
          {pageConf.desc}
        </p>
      </animated.main>
    </section>
  )
}
