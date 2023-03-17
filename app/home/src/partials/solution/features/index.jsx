import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

import { useResponsive } from "ahooks";

const conf = {
  title: "All You Need is TBOOK",
  desc: "TBOOK offers a powerful connect-and-play tokentable for projects to incentivize with zero code and stay ahead in Web3.",
  list: [
    {
      title: "Token vesting schedule",
      desc: "Token option incentives could be used as a part of token vesting schedules, where token holders will receive the option to exercise and purchase tokens at a predetermined price.",
    },
    {
      title: "Employee compensation",
      desc: "Companies can use token option incentives as part of employee compensation plans, where employees are offered the option to purchase company tokens at a discounted price. ",
    },
    {
      title: "Investor rewards",
      desc: "Token option incentives can be used as a way to reward investors who hold onto their tokens for a certain period of time. For example, a project can offer investors the option to purchase additional tokens at a discounted price if they hold the existing tokens for a period of time.",
    },
    {
      title: "Community governance",
      desc: "Token holders can be offered the option to vote on proposals or decisions, and those who participate in the decision-making process can be rewarded with additional options to purchase tokens at a discounted price.",
    },
  ],
};

export default function () {
  const { pc } = useResponsive();
  return (
    <div className="flex justify-end px-4 mb-10 bx lg:px-0 lg:mb-0">
      <div className="lg:pt-[273px] lg:pb-[173px] flex flex-col items-center lg:items-end justify-end">
        <h2 className="font-bold text-white text-cwh1 lg:text-cwh9 w-[230px] lg:w-auto text-center mb-2 lg:mb-4">
          {conf.title}
        </h2>
        <div className="flex justify-end text-center lg:text-right mb-5 lg:mb-[118px]">
          <p className="text-c14 lg:text-c13 text-c-9 lg:w-[440px]">{conf.desc}</p>
        </div>

        {pc ? (
          <div
            className="relative text-left w-[490px]"
            style={{
              "--swiper-navigation-size": "10px",
              "--swiper-theme-color": "#fff",
            }}
          >
            <div className="hidden lg:flex lg:justify-center lg:items-center absolute swiper-button-next !-right-12 drop-shadow-d1 swiper-icon-nav1 !w-6 !h-6 rounded-full"></div>
            <div className="hidden lg:flex lg:justify-center lg:items-center absolute swiper-button-prev !-left-12 shadow-d11 swiper-icon-nav1 !w-6 !h-6 rounded-full"></div>

            <Swiper
              modules={[Navigation]}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              autoHeight
            >
              {conf.list.map((v) => {
                return (
                  <SwiperSlide key={v.title}>
                    <div className="px-1 py-1">
                      <div className="px-10 text-white shadow-d5 py-7 rounded-2xl">
                        <h2 className="mb-4 font-extrabold text-c7">{v.title}</h2>
                        <p className="text-c6">{v.desc}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        ) : (
          <div className="space-y-5">
            {conf.list.map((v) => {
              return (
                <div className="p-5 text-center text-white rounded-lg shadow-d6">
                  <h2 className="mb-3 font-bold text-c12">{v.title}</h2>
                  <p className="text-c4">{v.desc}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
