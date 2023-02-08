import React, { useState, useReducer, useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getIncentiveList, getTipGrantList } from "@/api/incentive";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { PlusOutlined } from "@ant-design/icons";
import GrantTable from "./GrantTable";
import { Button, Drawer, Empty } from "antd";
import { Link } from "react-router-dom";
import { useAsyncEffect, useResponsive, useRequest } from "ahooks";
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
import GrantCard from "./grantCard";
import FilterPanel from "./filter";
import { Spin } from "antd";
import { filterReducer, initialFilters } from "@/store/parts";
import dayjs from "dayjs";

function PlanList() {
  const [swiper, setSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [tipList, updateTipList] = useState([]);
  const [grantList, updateGrantList] = useState([]);
  const [grantLoading, setGrantLoading] = useState(true);
  const projectId = useCurrentProjectId();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.user.authUser);
  const [drawerOpen, setDrawer] = useState(false);
  const { pc } = useResponsive();
  const [filters, dispatchFilter] = useReducer(filterReducer, initialFilters);

  useAsyncEffect(async () => {
    if (!projectId) return;
    setGrantLoading(true);
    const list1 = await getIncentiveList(projectId);
    // format
    updateTipList(list1);
    // grants
    const list2 = await Promise.all(
      list1.map((tip) => getTipGrantList(tip.incentivePlanId))
    );
    const list2Formated = _.cloneDeep(list2)
      ?.map((planGrants) => {
        const sortedList = planGrants.sort((a, b) => {
          return dayjs(a?.grant?.updateTime).isBefore(
            dayjs(b?.grant?.updateTime)
          )
            ? -1
            : 1;
        });
        const lastOne = sortedList.pop();
        return lastOne;
      })
      .map((item, idx) => ({ ...item, idx }))
      .filter((item) => item.grant)
      .sort((a, b) => {
        return dayjs(a?.grant?.updateTime).isBefore(dayjs(b?.grant?.updateTime))
          ? 1
          : -1;
      });

    const activeIdx = list2Formated[0]?.idx || 0;
    setActiveIndex(pc ? activeIdx + 1 : activeIdx);
    // console.log(list1[activeIdx]?.incentivePlanId)
    !pc &&
      dispatchFilter({
        type: "Plan",
        payload: list1[activeIdx]?.incentivePlanId,
      });
    setGrantLoading(false);
    updateGrantList(_.flattenDeep(list2));
    // console.log("activeIdx--in", activeIdx);
  }, [projectId]);

  const filterGrantList = useCallback(() => {
    const { Status, Plan } = filters;
    let res = grantList;
    if (Status !== null) {
      res = res.filter((grant) => grant?.grant?.grantStatus === Status);
    }

    if (Plan !== -1) {
      res = res.filter((grant) => grant?.grant?.incentivePlanId === Plan);
    }
    return res;
  }, [grantList, filters]);
  console.log(filters);
  return (
    <div className="w-full text-[#202124] mb-4">
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

      <div
        className="w-full mb-5"
        style={{ "--swiper-navigation-size": "16px" }}
      >
        <h2 className="pb-2 text-[32px] lg:text-[24px]">Plans</h2>

        <div className="relative h-[190px]">
          <div className="hidden lg:block absolute swiper-button-next !-right-12 border !w-8 !h-8 rounded-full"></div>
          <div className="hidden lg:block absolute swiper-button-prev !-left-12 border !w-8 !h-8 rounded-full"></div>
          {grantLoading ? (
            <div className="flex items-center justify-center w-full h-full">
              <Spin />
            </div>
          ) : (
            <Swiper
              modules={[Navigation]}
              spaceBetween={16}
              slidesPerView="auto"
              centeredSlides={pc}
              onSwiper={setSwiper}
              initialSlide={activeIndex}
              observeSlideChildren
              loop={pc}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              onSlideChange={(w) => {
                let incentivePlanId = tipList[w.realIndex]?.incentivePlanId;
                console.log(w, incentivePlanId, w.realIndex);
                if (
                  (pc && w.realIndex === 0) ||
                  (!pc && w.realIndex === tipList.length)
                ) {
                  return dispatchFilter({
                    type: "Plan",
                    payload: -1,
                  });
                }
                // if (!pc && w.activeIndex === tipList.length) return;
                dispatchFilter({
                  type: "Plan",
                  payload: incentivePlanId,
                });
              }}
            >
              {pc && (
                <SwiperSlide key="all" style={{ width: "auto" }}>
                  all
                </SwiperSlide>
              )}

              {Array.isArray(tipList) &&
                tipList.map((tip) => {
                  return (
                    <SwiperSlide
                      key={tip.incentivePlanId}
                      style={{ width: "auto", paddingBottom: "10px" }}
                    >
                      {({ isActive }) => {
                        return (
                          <NavLink to={`/incentive/${tip.incentivePlanId}`}>
                            {isActive ? (
                              <ActiveCard tip={tip} pc={pc} />
                            ) : (
                              <InActiveCard tip={tip} pc={pc} />
                            )}
                          </NavLink>
                        );
                      }}
                    </SwiperSlide>
                  );
                })}

              {!pc && (
                <SwiperSlide
                  key="add"
                  style={{ width: "auto", paddingBottom: "10px" }}
                >
                  {({ isActive }) => {
                    return (
                      <NavLink to={`/incentive/create`}>
                        <div
                          className={clsx(
                            "w-[80vw] h-[180px]",
                            !isActive && "py-2.5"
                          )}
                        >
                          <div
                            style={{ backgroundImage: `url(${newPlanUrl})` }}
                            className="h-full bg-cover rounded-[24px] text-[#0049FF] text-[60px] flex justify-center items-center"
                          >
                            <span className="flex items-center justify-center w-20 h-20 bg-white rounded-full">
                              +
                            </span>
                          </div>
                        </div>
                      </NavLink>
                    );
                  }}
                </SwiperSlide>
              )}
            </Swiper>
          )}
        </div>
      </div>

      {pc ? (
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
            <GrantTable
              list={filterGrantList(grantList)}
              loading={grantLoading}
            />
          </div>
        </div>
      ) : (
        <div className="block lg:hidden">
          <Drawer
            placement="bottom"
            closable={false}
            open={drawerOpen}
            contentWrapperStyle={{
              height: "70vh",
              borderRadius: "24px 24px 0px 0px",
              overflow: "hidden",
            }}
            onClose={() => setDrawer(false)}
          >
            <FilterPanel
              tipList={tipList}
              filters={filters}
              dispatch={dispatchFilter}
              swiper={swiper}
            />
          </Drawer>

          <nav>
            <Button onClick={() => setDrawer(true)}>open</Button>
          </nav>

          <div
            className={clsx(
              "grid gap-x-2 gap-y-2",
              filterGrantList(grantList).length > 0
                ? "grid-cols-2"
                : "grid-cols-1"
            )}
          >
            {grantLoading ? (
              <Spin />
            ) : filterGrantList(grantList).length > 0 ? (
              filterGrantList(grantList).map((grant) => (
                <GrantCard grant={grant} key={grant.grant.grantId} />
              ))
            ) : (
              <div className="h-[222px] rounded-lg bg-white flex items-center justify-center">
                <Empty description="No grant" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default PlanList;
