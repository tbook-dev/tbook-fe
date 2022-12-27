import React, { useState , useEffect} from "react";
import { NavLink } from "react-router-dom";
import IncentivesTable from "../../partials/incentives/IncentivesTable";
import PaginationClassic from "../../components/PaginationClassic";
import IncentiveLayout from "./Layout";
import { getIncentiveList } from "@/api/incentive";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { useSelector } from "react-redux";
import "swiper/css";
import "swiper/css/navigation";
import { PlusOutlined } from '@ant-design/icons'

function PlanList() {
  const userStore = useSelector((state) => state.user);
  const [selectedItems, setSelectedItems] = useState([]);
  const [tipList, updateTipList] =  useState([]);

  useEffect(() => {
    let ignore = false;

    async function getList (){
      const id = userStore?.projects?.[0]?.projectId
      if(!id) return;
      const data = await getIncentiveList(userStore?.projects?.[0]?.projectId)
      if (!ignore && Array.isArray(data)){
        console.log('TIP list->', data)
        updateTipList(data)
      } 
    }

    getList()

    return () => {
      ignore = true; 
    };
  }, [userStore?.projects?.[0]?.projectId]); 

  const handleSelectedItems = (selectedItems) => {
    setSelectedItems([...selectedItems]);
  };

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
                        to={`/incentive/${tip.projectId}`}
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
        <h1 className="pb-6 text-3xl md:text-3xl text-slate-800 font-bold">
          Grants
        </h1>
        <IncentivesTable selectedItems={handleSelectedItems} />

        {/* Pagination */}
        <div className="mt-8">
          <PaginationClassic />
        </div>
      </div>
    </IncentiveLayout>
  );
}

export default PlanList;
