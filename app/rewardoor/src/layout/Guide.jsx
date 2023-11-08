import slide1 from "@/images/aboard/slide1.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination } from "swiper";
import "swiper/css/pagination";
import { useState, useRef } from "react";
import pcTip from "@/images/pcTip.png";

const conf = [
  {
    img: slide1,
    title: "Incentivize core communities and builders",
    desc: "Empower core communities and builders through strategic incentives, fostering sustained growth and engagement. ",
  }
];
const pcTipText = "Please visit the website in a web browser.";

export default function Guide() {
  const [swiper, setSwiper] = useState(null);
  const [reachEnd, setReachEnd] = useState(conf.length === 1);
  const [showTip, setShowTip] = useState(false);
  const paginationRef = useRef();
  const handleSlideChange = (swiper) => {
    const activeIndex = swiper.activeIndex;
    const lastIndex = swiper.slides.length - 1;

    if (activeIndex === lastIndex) {
      setReachEnd(true);
    } else {
      setReachEnd(false);
    }
  };

  return (
    <div
      className="pt-20 px-4 bg-black text-white min-h-screen flex flex-col justify-between"
      style={{
        "--swiper-theme-color": "#006EE9",
        "--swiper-pagination-bullet-inactive-color": "#002C5D",
        "--swiper-pagination-bullet-inactive-opacity": "1"
      }}
    >
      {showTip ? (
        <div className="px-4">
          <img src={pcTip} alt="go to pc" className="mb-11" />
          <h2 className="text-2xl font-extrabold text-center">{pcTipText}</h2>
        </div>
      ) : (
        <>
          <div className="flex-auto min-h-[387px]">
            <Swiper
              onSlideChange={handleSlideChange}
              onSwiper={setSwiper}
              className="w-full "
              modules={[Pagination]}
              pagination={{
                el: "#paginationRef",
              }}
            >
              {conf.map((v, idx) => {
                return (
                  <SwiperSlide key={idx} className="h-full">
                    <div className="flex flex-col justify-between">
                      <img
                        src={v.img}
                        alt="slide"
                        className="w-full h-auto mb-10"
                      />

                      <div className="text-center">
                        <h2 className="text-2xl font-extrabold mb-2">
                          {v.title}
                        </h2>
                        <p className="text-xs font-medium">{v.desc}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
          <div
            className="w-full h-10 flex items-center justify-center space-x-3"
            id="paginationRef"
            ref={paginationRef}
          />

          <div className="pb-14 pt-12  text-center">
            {reachEnd ? (
              <button
                className="w-[calc(100%_-_80px)] bg-[#006EE9] h-10 rounded-lg"
                onClick={() => {
                  setShowTip(true);
                }}
              >
                Incentivize now
              </button>
            ) : (
              <div className="flex justify-between">
                <button
                  className="text-sm font-medium text-[#006EE9]"
                  onClick={() => {
                    setShowTip(true);
                  }}
                >
                  SKIP
                </button>
                <button
                  className="bg-[#006EE9] w-20 h-10 rounded-lg"
                  onClick={() => {
                    const activeIndex = swiper.activeIndex;
                    const lastIndex = swiper.slides.length - 1;
                    if (activeIndex === lastIndex) {
                      setReachEnd(true);
                    } else {
                      swiper?.slideNext();
                    }
                  }}
                >
                  <svg
                    className="inline"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 5.00293L13.59 6.41293L18.17 11.0029H2V13.0029H18.17L13.58 17.5929L15 19.0029L22 12.0029L15 5.00293Z"
                      fill="white"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
