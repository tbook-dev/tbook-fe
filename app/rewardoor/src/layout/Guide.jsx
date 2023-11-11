import slide1 from "@/images/aboard/slide1.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination, Lazy } from "swiper";
import "swiper/css/pagination";
import "swiper/css/lazy";
import { useState, useRef } from "react";
import pcTip from "@/images/pcTip.png";
import PreImage from "@/components/preloadImage";
import { useEffect } from "react";
import { preloadImg } from "@/utils/preload";
import useScreen from "@/hooks/useScreen";

const conf = [
  {
    img: slide1,
    title: "Incentivize core communities and builders",
    desc: "Empower core communities and builders through strategic incentives, fostering sustained growth and engagement. ",
  },
];
const pcTipText = "Please visit the website in a web browser.";

export default function Guide() {
  const [swiper, setSwiper] = useState(null);
  const [reachEnd, setReachEnd] = useState(conf.length === 1);
  const [showTip, setShowTip] = useState(false);
  const paginationRef = useRef();
  const { height } = useScreen();
  useEffect(() => {
    preloadImg(pcTip);
  }, []);

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
      className="pt-20 relative px-4 bg-black text-white"
      style={{
        "--swiper-theme-color": "#006EE9",
        "--swiper-pagination-bullet-inactive-color": "#002C5D",
        "--swiper-pagination-bullet-inactive-opacity": "1",
        height,
      }}
    >
      {showTip ? (
        <div className="px-4">
          <PreImage
            src={pcTip}
            alt="go to pc"
            className="w-full  min-h-[374px] mb-11 object-cover object-center"
          />
          <h2 className="text-2xl font-extrabold text-center mb-2">{pcTipText}</h2>
          <button 
            className="text-[#006EE9] flex items-center gap-x-1 mx-auto"
            onClick={()=>{
              setShowTip(false)
            }}
          >
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.1667 9.85514H7.02501L11.6833 5.1968L10.5 4.0218L3.83334 10.6885L10.5 17.3551L11.675 16.1801L7.02501 11.5218H17.1667V9.85514Z"
                fill="#006EE9"
              />
            </svg>
            Back
          </button>
        </div>
      ) : (
        <>
          <Swiper
            onSlideChange={handleSlideChange}
            onSwiper={setSwiper}
            className="w-full "
            modules={[Pagination, Lazy]}
            pagination={{
              el: "#paginationRef",
            }}
            lazy={{
              enabled: true,
              loadPrevNext: true,
            }}
          >
            {conf.map((v, idx) => {
              return (
                <SwiperSlide key={idx} className="h-full">
                  <div className="flex flex-col justify-between">
                    <img
                      src={v.img}
                      alt="slide"
                      className="w-full h-auto mb-10 swiper-lazy"
                    />
                    <div className="swiper-lazy-preloader" />

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
          <div
            className="w-full h-10 flex items-center justify-center space-x-3"
            id="paginationRef"
            ref={paginationRef}
          />

          <div className="fixed bottom-14 left-0 w-full text-center z-10">
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
              <div className="flex justify-between px-5">
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
