import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { useResponsive } from "ahooks";
import list from "./conf";
import clsx from "clsx";

export default function () {
  const { pc } = useResponsive();

  return (
    <div className="mb-10 bx lg:mb-[144px]">
      <div className="mb-8 text-center lg:mb-[50px]">
        <h2 className="text-c12 mb-0.5 lg:mb-3">
          <span className="font-medium text-colorful1">Testimonials</span>
        </h2>
        <h1 className="font-bold text-white text-c11 lg:text-cwh5">Our Client Reviews</h1>
      </div>

      <div
        className="relative text-center"
        style={{
          "--swiper-navigation-size": "16px",
          "--swiper-theme-color": "#fff",
        }}
      >
        <div className="hidden lg:flex lg:justify-center lg:items-center absolute swiper-button-next !-right-12 border !w-8 !h-8 rounded-full"></div>
        <div className="hidden lg:flex lg:justify-center lg:items-center absolute swiper-button-prev !-left-12 border !w-8 !h-8 rounded-full"></div>

        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          slidesPerView={"auto"}
          slidesPerGroup={pc ? 3 : 1}
          spaceBetween={48}
        >
          {list.map((v) => {
            return (
              <SwiperSlide key={v.name} style={{ width: "auto" }}>
                <div
                  className={clsx(
                    "bg-white  shadow-d5 rounded-lg lg:rounded-[18px] lg:w-[372px] lg:h-[212px] lg:pt-6 lg:pb-4 lg:px-10",
                    "h-[190px] pt-4 pb-3 px-8"
                  )}
                  style={pc ? null : { width: "calc(100vw - 32px)" }}
                >
                  <h2 className="mb-1 font-bold text-c7">{v.name}</h2>
                  <p className="mb-2 text-c-6 text-c4">{v.title}</p>
                  <p className="w-full text-sm break-normal text-c-3">"{v.review}"</p>
                </div>
              </SwiperSlide>
            );
          })}

          {pc &&
            list.length % 3 !== 0 &&
            new Array(3 - (list.length % 3)).fill().map((_, v) => (
              <SwiperSlide style={{ width: "auto" }} key={v}>
                <div className="w-[372px] h-[212px]" />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}
