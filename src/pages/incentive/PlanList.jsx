import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getIncentiveList, getTipGrantList } from "@/api/incentive";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { PlusOutlined } from "@ant-design/icons";
import GrantTable from "./GrantTable";
import { Button, Drawer } from "antd";
import { Link } from "react-router-dom";
import { useAsyncEffect, useResponsive } from "ahooks";
import useCurrentProjectId from "@/hooks/useCurrentProjectId";
import _ from "lodash";
import { loadWeb3, signLoginMetaMask } from "@/utils/web3";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser, fetchUserInfo } from "@/store/user";
import planIcon from "@/images/incentive/plan.svg";
import clsx from "clsx";
import newPlanUrl from "@/images/incentive/new-plan.png";
import ActiveCard from "./planCard/Active";
import InActiveCard from "./planCard/InActive";

function PlanList() {
  const [tipList, updateTipList] = useState([]);
  const [grantList, updateGrantList] = useState([]);
  const projectId = useCurrentProjectId();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.user.authUser);
  const [drawerOpen, setDrawer] = useState(false);
  const { pc } = useResponsive();

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

      <div className="w-full mb-5 lg:mb-12">
        <h2 className="pb-2 text-[32px] lg:text-[24px]">Plans</h2>

        <div
          className="relative h-[240px] lg:h-[200px]"
          style={{ "--swiper-navigation-size": "16px" }}
        >
          <div className="hidden lg:block absolute swiper-button-next !-right-12 border !w-8 !h-8 rounded-full"></div>
          <div className="hidden lg:block absolute swiper-button-prev !-left-12 border !w-8 !h-8 rounded-full"></div>
          <Swiper
            modules={[Navigation]}
            spaceBetween={16}
            slidesPerView="auto"
            centeredSlides={pc}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
          >
            {Array.isArray(tipList) &&
              tipList.map((tip) => {
                return (
                  <SwiperSlide
                    key={tip.incentivePlanId}
                    style={{ width: "auto" }}
                  >
                    {({ isActive }) => {
                      return (
                        <NavLink to={`/incentive/${tip.incentivePlanId}`}>
                          {isActive ? (
                            <ActiveCard tip={tip} pc={pc}/>
                          ) : (
                            <InActiveCard tip={tip} pc={pc}/>
                          )}
                        </NavLink>
                      );
                    }}
                  </SwiperSlide>
                );
              })}

            {!pc && (
              <SwiperSlide key="add" style={{ width: "auto" }}>
                {({ isActive }) => {
                  return (
                    <NavLink to={`/incentive/create`}>
                      <div
                        className={clsx(
                          "bg-cover rounded-[24px] text-[#0049FF] text-[60px] flex justify-center items-center",
                          isActive ? "w-[80vw] h-[240px]" : "w-[70vw] h-[180px]"
                        )}
                        style={{ backgroundImage: `url(${newPlanUrl})` }}
                      >
                        <span className="flex items-center justify-center w-20 h-20 bg-white rounded-full">
                          +
                        </span>
                      </div>
                    </NavLink>
                  );
                }}
              </SwiperSlide>
            )}
          </Swiper>
        </div>
      </div>

      <div className="hidden lg:block">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-[32px] lg:text-[24px]">Grants</h2>

          {tipList.length === 0 ? (
            <Button type="primary" shape="round" size="large" disabled>
              <span>
                <PlusOutlined />
                <span className="font-roboto">New Grant</span>
              </span>
            </Button>
          ) : (
            <Link to="/incentive/grant/tmp/create">
              <Button type="primary" shape="round" size="large">
                <span>
                  <PlusOutlined />
                  <span className="font-roboto">New Grant</span>
                </span>
              </Button>
            </Link>
          )}
        </div>

        <div className="hidden lg:block">
          <GrantTable list={grantList} />
        </div>
      </div>

      <div className="block lg:hidden">
        <nav>
          <Button onClick={() => setDrawer(true)}>open</Button>
        </nav>
        <Drawer
          placement="bottom"
          open={drawerOpen}
          contentWrapperStyle={{
            height: "50vh",
          }}
          onClose={() => setDrawer(false)}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
      </div>
    </div>
  );
}

export default PlanList;
