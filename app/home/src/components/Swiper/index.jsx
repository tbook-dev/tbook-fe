import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper'
import 'swiper/css'
import 'swiper/css/autoplay'

export default function ({ list = [] }) {
  return (
    <Swiper
      modules={[Autoplay]}
      loop
      loopPreventsSlide
      speed={3000}
      slidesPerView='auto'
      spaceBetween={40}
      autoplay={{
        delay: 0,
        pauseOnMouseEnter: true,
        disableOnInteraction: false
      }}
      className='solution'
    >
      {list.map((v,idx) => (
        <SwiperSlide key={idx} style={{ width: 'max-content' }}>
          <img src={v.src} className='h-[40px] lg:h-[56px]' />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
