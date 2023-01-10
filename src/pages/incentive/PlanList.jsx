import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import IncentiveLayout from "./Layout";
import { getIncentiveList, getTipGrantList } from "@/api/incentive";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { useSelector } from "react-redux";
import "swiper/css";
import "swiper/css/navigation";
import { PlusOutlined } from "@ant-design/icons";
import GrantTable from "./GrantTable";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { useAsyncEffect } from "ahooks";

function PlanList() {
  const userStore = useSelector((state) => state.user);
  const [tipList, updateTipList] = useState([]);
  const [grantList, updateGrantList] = useState([]);

  useAsyncEffect(async () => {
    const id = userStore?.projects?.[0]?.projectId;
    if (!id) return;
    const data = await getIncentiveList(userStore?.projects?.[0]?.projectId);
    if (Array.isArray(data)) {
      updateTipList(data);
    }
  }, [userStore?.projects?.[0]?.projectId]);

  useAsyncEffect(async () => {
    for (let tipIdx in tipList) {
      const tip = tipList[tipIdx];
      try {
        const list = (await getTipGrantList(tip.incentivePlanId)) || [];
        updateGrantList((existedList) => {
          //                    if(existedList)
          if (
            !existedList.find(
              (item) => item?.grant?.grantId === list?.[0]?.grant?.grantId
            )
          ) {
            return [...list, ...existedList];
          }

          return existedList;
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [tipList]);

  return (
    <IncentiveLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        {/* Page header */}
        <div className="sm:flex sm:justify-between sm:items-center mb-8">
          {/* Left: Title */}
          <div className="mb-4 sm:mb-0 w-full">
            <h1 className="pb-6 text-3xl md:text-3xl text-slate-800 font-bold">
              Token Incentive Plans
            </h1>

            <div
              className="px-8 relative"
              style={{ "--swiper-navigation-size": "24px" }}
            >
              <div className="swiper-button-next"></div>
              <div className="swiper-button-prev"></div>
              <Swiper
                modules={[Navigation]}
                style={{ height: 110 }}
                spaceBetween={45}
                slidesPerView={6}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
              >
                <SwiperSlide>
                  <NavLink to={"/incentive/create"}>
                    <div className="w-[148px] h-[98px] shadow-c1 border rounded-[10px] flex justify-center align-middle">
                      <PlusOutlined />
                    </div>
                  </NavLink>
                </SwiperSlide>
                {tipList.map((tip) => {
                  return (
                    <SwiperSlide key={tip.incentivePlanId}>
                      <NavLink
                        to={`/incentive/${tip.incentivePlanId}`}
                        className="mr-11"
                      >
                        <div className="w-[148px] h-[98px] shadow-c2 border rounded-[10px] relative">
                          <div className="text-base text-[#3A4353] pt-3.5 pl-1.5">
                            <p>{tip.incentivePlanName}</p>
                          </div>

                          <div className="absolute inset-x-0 h-1.5 overflow-hidden bottom-5 bg-[#CBD5E1]">
                            <div
                              className="h-1.5	bg-[#475569]"
                              style={{ width: tip.percentage + "%" }}
                            />
                          </div>

                          <div className="inset-x-0 absolute bottom-0 origin-left	scale-50 text-[#1E293B]">
                            Granted {tip.grantedTokenNum}
                          </div>
                          <div className="inset-x-0 absolute bottom-0 origin-right text-right	scale-50 text-[#1E293B]">
                            Total: {tip.totalTokenNum}
                          </div>
                        </div>
                      </NavLink>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        </div>

        {/* Table */}
        <div>
          <h1 className="pb-6 text-3xl md:text-3xl text-slate-800 font-bold">
            Grants
          </h1>

          <div>
            <div className="flex flex-row-reverse	items-center mb-2">
              <Link to="/incentive/grant/tmp/create">
                <Button type="primary">+ New Grant</Button>
              </Link>
            </div>
            <GrantTable
              list={grantList}
              title={() => (
                <h2 className="font-bold text-base	inline">
                  All The Grants{" "}
                  <p className="font-light	 inline">{grantList.length}</p>
                </h2>
              )}
            />
          </div>
        </div>
      </div>
    </IncentiveLayout>
  );
}

export default PlanList;
