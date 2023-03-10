import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import list from "./conf";
import { useResponsive } from "ahooks";

export default function Partners() {
  const { pc } = useResponsive();

  return (
    <div className="mb-10 lg:mb-[144px]">
      <div className="mb-8 text-center lg:mb-[50px]">
        <h2 className="text-c12 mb-0.5 lg:mb-3">
          <span className="font-medium text-colorful1">Partners</span>
        </h2>
        <h1 className="font-bold text-white text-c11 lg:text-cwh5">Be with builders </h1>
      </div>

      <Swiper
        modules={[Autoplay]}
        loop
        speed={3000}
        slidesPerView="auto"
        spaceBetween={pc ? 72 : 36}
        autoplay={{
          delay: 1000,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
      >
        {list.map((v) => (
          <SwiperSlide key={v.src} style={{ width: "auto" }}>
            <img src={v.src} className="w-[123px] h-[48px] lg:w-[246px] lg:h-[96px]" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
