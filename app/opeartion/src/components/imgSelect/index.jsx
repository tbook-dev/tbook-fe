import { useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import clsx from 'clsx'

export default function ImgSelect ({
  options = [],
  slidesPerView = 4,
  onChange,
  value,
  imgclx
}) {
  useEffect(() => {
    if (options?.[0]?.value) {
      onChange(options?.[0]?.value)
    }
  }, [options.length])

  return (
    <div
      className='relative'
      style={{
        '--swiper-navigation-size': '16px',
        '--swiper-theme-color': '#fff'
      }}
    >
      <div className='hidden lg:flex lg:justify-center lg:items-center absolute swiper-button-next  border !w-8 !h-8 rounded-full' />
      <div className='hidden lg:flex lg:justify-center lg:items-center absolute swiper-button-prev  border !w-8 !h-8 rounded-full' />

      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }}
        slideToClickedSlide
        centeredSlides
        spaceBetween={10}
        slidesPerView={slidesPerView}
        onSlideChange={w => {
          //   console.log(w, w.realIndex, 'xxx')
          onChange(options[w.realIndex]?.value)
        }}
      >
        {options.map((v, idx) => {
          return (
            <SwiperSlide key={v.value + idx}>
              {({ isActive }) => {
                return (
                  <img
                    src={v.img}
                    onClick={() => {
                      // console.log({ isActive, idx: swiper.realIndex })
                      // swiper.slideTo(idx)
                    }}
                    className={clsx(
                      imgclx,
                      !isActive && 'opacity-70 cursor-pointer'
                    )}
                  />
                )
              }}
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}
