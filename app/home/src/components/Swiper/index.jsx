import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper'
import 'swiper/css'
import 'swiper/css/autoplay'
import { useResponsive } from 'ahooks'

export default function ({ list = [] }) {
  const { pc } = useResponsive()

  return (
    <Swiper
      modules={[Autoplay]}
      loop
      loopPreventsSlide
      speed={3000}
      slidesPerView='auto'
      spaceBetween={pc ? 80 : 40}
      autoplay={{
        delay: 0,
        pauseOnMouseEnter: true,
        disableOnInteraction: false
      }}
      className='solution'
    >
      {list.map((v, idx) => (
        <SwiperSlide key={idx} style={{ width: 'max-content' }}>
          <img src={v.src} className='h-7 lg:h-[56px]' />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
