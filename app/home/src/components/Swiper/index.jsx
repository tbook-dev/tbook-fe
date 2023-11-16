import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, FreeMode } from 'swiper'
import 'swiper/css'
import 'swiper/css/autoplay'

export default function ({ list = [] }) {
  return (
    <Swiper
      modules={[Autoplay, FreeMode]}
      loop
      speed={3000}
      slidesPerView='auto'
      spaceBetween={40}
      autoplay={{
        delay: 0,
        pauseOnMouseEnter: true,
        disableOnInteraction: false
      }}
    >
      {list.map(v => (
        <SwiperSlide key={v.src} style={{ width: 'max-content' }}>
          <img src={v.src} className='h-[40px] sm:h-[96px] inline-block' />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
