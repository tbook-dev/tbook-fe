import slide1 from "@/images/aboard/slide1.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination } from "swiper";
import "swiper/css/pagination";

const conf = [
  {
    img: slide1,
    title: "Incentivize core communities and builders",
    desc: "Empower core communities and builders through strategic incentives, fostering sustained growth and engagement. ",
  },
];

export default function Slide() {
  return (
    <Swiper
      className="w-full"
      modules={[Pagination]}
      style={{
        "--swiper-theme-color": "#fff",
        "--swiper-pagination-bullet-inactive-color": "#fff",
      }}
      pagination={{
        clickable: true,
      }}
    >
      {conf.map((v, idx) => {
        return (
          <SwiperSlide key={idx}>
            <div className="bg-black rounded-2.5xl h-full py-10 flex flex-col justify-between">
              <div className="flex justify-center">
                <img
                  src={v.img}
                  alt="slide"
                  className="w-full h-[450px] object-contain object-center"
                />
              </div>

              <div>
                <h2 className="text-[32px] font-extrabold mb-4">{v.title}</h2>
                <p className="text-base font-medium">{v.desc}</p>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
