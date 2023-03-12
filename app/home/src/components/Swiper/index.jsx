import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

export default function ({ list = [], delay = 1000 }) {
  return (
    <Swiper
      modules={[Autoplay]}
      loop
      speed={3000}
      slidesPerView="auto"
      autoplay={{
        delay: delay,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      }}
    >
      {list.map((v) => (
        <SwiperSlide key={v.src}>
          <img
            src={v.src}
            className="h-[40px] mr-[40px] sm:h-[96px] sm:mr-[96px]"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
