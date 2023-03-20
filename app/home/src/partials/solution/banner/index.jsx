import banner from "./banner.png";
import { useResponsive } from "ahooks";
import { Button } from "@tbook/ui";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

import { conf } from "@tbook/utils";
const { appLink } = conf;
const list = [
  {
    title: "Trusted Brands",
    val: "20+",
  },
  {
    title: "TBOOK Users",
    val: "10,000+",
  },
  {
    title: "Served Projects",
    val: "50+",
  },
];
const colorfulTexts = ["developers", "employee", "adviser", "business development", "investor", "community growth"];

export default function Banner() {
  const { pc } = useResponsive();

  return (
    <div className="relative mb-10 lg:mb-0">
      {pc && <img className="absolute top-0 right-0 h-full" src={banner} />}

      <div className="lg:h-[836px] flex items-center bx relative pt-[45px] lg:pt-0">
        <div className="px-4 text-center lg:px-0 lg:text-left">
          <h2 className="px-5 font-extrabold text-white lg:px-0 text-c11 lg:text-cwh7 ">Superincentive Your Web3</h2>
          <div
            style={{ height: pc ? 90 : 40 }}
            className="inline-flex px-5 mb-5 font-extrabold text-white lg:mb-10 lg:px-0 text-c11 lg:text-cwh7 "
          >
            <Swiper
              effect="cube"
              modules={[Autoplay]}
              loop
              autoplay={{ delay: 3000 }}
              direction="vertical"
              height={pc ? 90 : 40}
              noSwiping
            >
              {colorfulTexts.map((v, idx) => {
                return (
                  <SwiperSlide key={idx} className="swiper-no-swiping">
                    <span className="text-colorful1 ">{v}</span>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>

          <div className="flex justify-center lg:block">
            <a target="_blank" href={appLink} className="relative">
              <Button className="mx-auto px-8 cursor-pointer lg:bg-white lg:bg-none w-[80vw] lg:w-auto">
                Get Started
              </Button>
            </a>
          </div>
        </div>
      </div>

      <div className="relative flex flex-col items-center justify-between px-0 py-4 space-y-5 text-center lg:flex-row lg:px-16 lg:py-8 lg:space-y-0 lg:text-left bx">
        {list.map((v, idx) => (
          <div key={idx}>
            <p className="mb-1 font-bold text-white lg:mb-px text-cwh8 lg:text-cwh7">{v.val}</p>
            <p className="font-medium lg:text-c15 text-c4 text-c-9">{v.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
