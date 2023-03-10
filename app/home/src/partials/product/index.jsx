import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import list from "./conf";
import { useResponsive } from "ahooks";
import clsx from "clsx";

export default function Partners() {
  const { pc } = useResponsive();
  const [swiper, setSwiper] = useState(null);
  const [swiperIdx, setSwiperIdx] = useState(0);

  return pc ? (
    <div className="mb-10 lg:mb-[144px] h-[590px]">
      <div className="flex items-center bx">
        <div className="lg:w-[755px]">
          <Swiper
            onSwiper={setSwiper}
            onSlideChange={(swiper) => {
              setSwiperIdx(swiper?.realIndex);
            }}
          >
            {list.map((v) => (
              <SwiperSlide key={v.src}>
                <img src={v.src} className="w-full" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="lg:w-[calc(100% - 755px)] pl-4">
          {list.map((product, idx) => {
            const isCurrent = swiperIdx === idx;
            return (
              <div
                className="mb-4 cursor-pointer"
                key={idx}
                onClick={() => {
                  swiper?.slideTo(idx);
                }}
              >
                <h2 className={clsx("font-extrabold text-cwh1 mb-2", isCurrent ? "text-colorful1" : "text-white")}>
                  {product.title}
                </h2>
                <p className="text-c6 text-c-9">{product.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  ) : (
    <>
      {list.map((product, idx) => (
        <div key={product.title} className="mb-8 text-center">
          <h2 className="mb-2 font-extrabold text-white text-cwh1"> {product.title}</h2>
          <p className="mb-4 text-sm text-c-9">{product.desc}</p>
          <div className={idx % 2 === 0 ? "-ml-4" : "-mr-4"}>
            <img src={product.src}/>
          </div>
        </div>
      ))}
    </>
  );
}
