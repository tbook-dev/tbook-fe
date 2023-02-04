import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import LayoutAdmin from "@/layout/Layout.admin";
import { getIncentiveList, getTipGrantList } from "@/api/incentive";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { PlusOutlined } from "@ant-design/icons";
import GrantTable from "./GrantTable";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { useAsyncEffect } from "ahooks";
import useCurrentProjectId from "@/hooks/useCurrentProjectId";
import _ from "lodash";
import { targetMap, getDividePercent } from "@/utils/const";
import { loadWeb3, signLoginMetaMask } from "@/utils/web3";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser, fetchUserInfo } from "@/store/user";
import planIcon from "@/images/incentive/plan.svg";
import clsx from "clsx";

function PlanList() {
  const [tipList, updateTipList] = useState([]);
  const [grantList, updateGrantList] = useState([]);
  const projectId = useCurrentProjectId();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.user.authUser);

  async function handleSignIn() {
    console.log("authUser", authUser);
    if (authUser) {
      navigate("/incentive/create");
    } else {
      const web3 = await loadWeb3();
      await signLoginMetaMask(web3);
      dispatch(fetchUserInfo());
      dispatch(setAuthUser(true));
    }
  }

  useAsyncEffect(async () => {
    if (!projectId) return;
    const data = await getIncentiveList(projectId);
    if (Array.isArray(data)) {
      updateTipList(data);
    }
  }, [projectId]);

  useAsyncEffect(async () => {
    if (!projectId) return;
    const list = await Promise.all(
      tipList.map((tip) => getTipGrantList(tip.incentivePlanId))
    );
    // console.log(tipList.length)
    updateGrantList(_.flattenDeep(list));
  }, [tipList]);

  return (
    <div className="w-full text-[#202124]">
      <div className="hidden pt-6 mb-4 lg:block">
        <h1 className="text-[56px] leading-[64px] mb-10 text-center">
          Incentive List
        </h1>

        <div className="flex items-center justify-between rounded-2xl border border-[#DADCE0] pt-7 pb-5 px-4">
          <div className="flex items-center">
            <img className="mr-4 w-14" src={planIcon} />
            <div className="flex-auto">
              <p className="text-2xl leading-[32px] mb-1">
                New Token Incentive Plan
              </p>
              <p className="text-base">Click to set up your incentive plan.</p>
            </div>
          </div>

          <Link to="/incentive/create">
            <Button type="primary" shape="round" ghost size="large">
              <span>
                <PlusOutlined />
                <span className="ml-2 font-roboto">New Plan</span>
              </span>
            </Button>
          </Link>
        </div>
      </div>

      <div className="w-full mb-4">
        <h2 className="pb-2 text-[32px] lg:text-[24px]">Plans</h2>

        <div
          className="relative h-[194px]"
          style={{ "--swiper-navigation-size": "16px" }}
        >
          <div className="hidden lg:block absolute swiper-button-next !-right-12 border !w-8 !h-8 rounded-full"></div>
          <div className="hidden lg:block absolute swiper-button-prev !-left-12 border !w-8 !h-8 rounded-full"></div>
          <Swiper
            modules={[Navigation]}
            spaceBetween={16}
            slidesPerView="auto"
            centeredSlides
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
          >
            {Array.isArray(tipList) && tipList.length === 0 ? (
              <SwiperSlide className="flex items-center ">
                <p className="text-[#1E293B] text-2xl]">
                  Click to set up your first incentive plan.
                </p>
              </SwiperSlide>
            ) : (
              Array.isArray(tipList) &&
              tipList.map((tip) => {
                return (
                  <SwiperSlide
                    key={tip.incentivePlanId}
                    style={{ width: "auto" }}
                  >
                    {({ isActive }) => {
                      return (
                        <NavLink
                          to={`/incentive/${tip.incentivePlanId}`}
                        >
                          <div
                            className={clsx(
                              "px-1.5 shadow-c2 border rounded-[10px] relative",
                              isActive
                                ? "w-[80vw] h-[360px] lg:w-[264px] lg:h-[194px]"
                                : "w-[70vw] h-[320px] lg:w-[220px] lg:h-[136px]"
                            )}
                          >
                            <div className="pt-[9px]">
                              <span className="border px-1.5 text-xs py-[3px] border-[#CBD5E1] rounded-[3px]">
                                {tip.target == "7"
                                  ? tip.customized_target_name
                                  : targetMap[tip.target]}
                              </span>
                            </div>
                            <div className="text-base text-[#1E293B] font-semibold	 mb-[20px]">
                              <p>{tip.incentivePlanName}</p>
                            </div>

                            <div className="absolute inset-x-0 h-1.5 overflow-hidden bottom-5 bg-[#CBD5E1]">
                              <div
                                className="h-1.5	bg-[#475569]"
                                style={{ width: tip.percentage + "%" }}
                              />
                            </div>

                            <div className="inset-x-1.5 absolute bottom-0 origin-left	scale-50 text-[#94A3B8] whitespace-nowrap">
                              Granted {tip.grantedTokenNum}
                            </div>
                            <div className="inset-x-1.5 absolute bottom-0 origin-right text-right	scale-50 whitespace-nowrap	text-[#94A3B8]">
                              Total: {tip.totalTokenNum}(
                              {getDividePercent(
                                tip.grantedTokenNum,
                                tip.totalTokenNum
                              )}
                              %)
                            </div>
                          </div>
                        </NavLink>
                      );
                    }}
                  </SwiperSlide>
                );
              })
            )}
          </Swiper>
        </div>
      </div>

      <div>
        <h1 className="pb-6 text-3xl font-bold md:text-3xl text-slate-800">
          Grants
        </h1>

        <div>
          <div className="flex flex-row-reverse items-center mb-2">
            {tipList.length === 0 ? (
              <Button type="primary" disabled>
                + New Grant
              </Button>
            ) : (
              <Link to="/incentive/grant/tmp/create">
                <Button type="primary">+ New Grant</Button>
              </Link>
            )}
          </div>
          <GrantTable
            list={grantList}
            title={() => (
              <h2 className="inline text-base font-bold">
                All The Grants{" "}
                <p className="inline font-light">{grantList.length}</p>
              </h2>
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default PlanList;
