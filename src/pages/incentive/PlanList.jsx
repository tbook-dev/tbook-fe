import React, { useState, useReducer, useCallback } from "react";
import { NavLink, Link, useNavigate, useSearchParams } from "react-router-dom";
import { getIncentiveList, getTipGrantList } from "@/api/incentive";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import {
  PlusOutlined,
  AppstoreOutlined,
  BarsOutlined,
} from "@ant-design/icons";
import GrantTable from "./GrantTable";
import { Button, Drawer, Empty, Space } from "antd";
import { useAsyncEffect, useResponsive } from "ahooks";
import useCurrentProjectId from "@/hooks/useCurrentProjectId";
import useUserInfoLoading from "@/hooks/useUserInfoLoading";
import useProjects from "@/hooks/useProjects";
import _ from "lodash";
import { loadWeb3, signLoginMetaMask } from "@/utils/web3";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser, fetchUserInfo } from "@/store/user";
import clsx from "clsx";
import ActiveCard from "./planCard/Active";
import InActiveCard from "./planCard/InActive";
import AllActiveCard from "./planCard/AllActive";
import AllInActiveCard from "./planCard/AllInActive";
import AddActiveCard from "./planCard/AddActive";
import AddInActiveCard from "./planCard/AddInActive";
import GrantCard from "./grantCard";
import GrantCardV2 from "./grantCard/v2";
import FilterPanel from "./filter";
import { Spin } from "antd";
import { filterReducer, initialFilters } from "@/store/parts";
import dayjs from "dayjs";
import { useSigner, useAccount } from "wagmi";
import PlanTipNoConnect from "./planTip/NoConnect";
import PlanTipNoProject from "./planTip/NoProject";

function PlanList() {
  const [swiper, setSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [tipList, updateTipList] = useState([]);
  const [grantList, updateGrantList] = useState([]);
  const [grantLoading, setGrantLoading] = useState(false);
  const userLoading = useUserInfoLoading();
  const projectId = useCurrentProjectId();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.user.authUser);
  const [drawerOpen, setDrawer] = useState(false);
  const { pc } = useResponsive();
  const [filters, dispatchFilter] = useReducer(filterReducer, initialFilters);
  const [searchParams] = useSearchParams();
  const projects = useProjects();
  // type, 0是卡片，1是表格
  const [displayType, setDisplayType] = useState(0);

  const { data: signer } = useSigner();
  const { address } = useAccount();

  const selectedTipId = searchParams.get("tipId");

  // console.log("authUser", authUser);
  async function handleSignIn() {
    // console.log("authUser", authUser);
    if (authUser) {
      navigate("/incentive/create");
    } else {
      await signLoginMetaMask(address, signer);
      dispatch(fetchUserInfo());
      dispatch(setAuthUser(true));
    }
  }

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
    let activeIdx = list1.findIndex((t) => t.incentivePlanId == selectedTipId);
    if (activeIdx === -1) {
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
          return dayjs(a?.grant?.updateTime).isBefore(
            dayjs(b?.grant?.updateTime)
          )
            ? 1
            : -1;
        });
      activeIdx = list2Formated[0]?.idx || 0;
      // console.log(list2Formated[0].incentivePlanId)`
    }
    // const activeIdx = list2Formated[0]?.idx || 0;
    // 前面增加一个all, 后面增加一个new, 永远不会为all,new
    setActiveIndex(list1.length === 1 ? 0 : activeIdx + 1);
    // console.log("activeIdx+1", list1, activeIdx + 1);
    if (list1.length === 1) {
      // 手动dispatch
      dispatchFilter({
        type: "Plan",
        payload: list1[0]?.incentivePlanId,
      });
    }

    // console.log(list1[activeIdx+1]?.incentivePlanId)
    // !pc &&
    //   dispatchFilter({
    //     type: "Plan",
    //     payload: list1[activeIdx]?.incentivePlanId,
    //   });
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
    // console.log(filters)
    if (Plan !== null) {
      res = res.filter((grant) => grant?.grant?.incentivePlanId === Plan);
    }
    return res;
  }, [grantList, filters]);
  console.log("filters.plan", filters.Plan);
  return (
    <div className="w-full text-[#202124] mb-4">
      <div className="hidden pt-6 mb-4 lg:block">
        <h1 className="text-[56px] leading-[64px] mb-10 text-center">
          Incentive List
        </h1>
      </div>

      <div
        className="w-full mb-5"
        style={{ "--swiper-navigation-size": "16px" }}
      >
        <h2 className="pb-2 text-[32px] lg:text-[24px]">Plans</h2>

        <div className="relative h-[190px]">
          {userLoading || grantLoading ? (
            <div className="flex items-center justify-center w-full h-full">
              <Spin />
            </div>
          ) : !authUser ? (
            <PlanTipNoConnect pc={pc} />
          ) : projects.length === 0 || tipList.length === 0 ? (
            <PlanTipNoProject
              pc={pc}
              link={projects.length === 0 ? "/create/project" : "/create/plan"}
            />
          ) : (
            <>
              <div className="hidden lg:flex lg:justify-center lg:items-center absolute swiper-button-next !-right-12 border !w-8 !h-8 rounded-full"></div>
              <div className="hidden lg:flex lg:justify-center lg:items-center absolute swiper-button-prev !-left-12 border !w-8 !h-8 rounded-full"></div>

              <Swiper
                modules={[Navigation]}
                spaceBetween={16}
                slidesPerView="auto"
                centeredSlides={pc}
                onSwiper={setSwiper}
                slideToClickedSlide={pc}
                initialSlide={activeIndex}
                // observeSlideChildren
                loop={pc && tipList.length > 3}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                onSlideChange={(w) => {
                  console.log('------>onSlideChange',w.realIndex)
                  if (drawerOpen) return;
                  let incentivePlanId =
                    tipList[
                      tipList.length === 1 ? w.realIndex : w.realIndex - 1
                    ]?.incentivePlanId;
                  // console.log(incentivePlanId, w.realIndex);

                  // // console.log("---->", w.realIndex, tipList.length);
                  // console.log("tipList------>", tipList.length, w.realIndex);
                  if (tipList.length === 1) {
                    if (w.realIndex === tipList.length) {
                      if(pc){
                        navigate('/create/plan')
                      }
                      return dispatchFilter({
                        type: "Plan",
                        payload: -1,
                      });
                    } else {
                      return dispatchFilter({
                        type: "Plan",
                        payload: incentivePlanId,
                      });
                    }
                  } else {
                    if (w.realIndex === 0) {
                      return dispatchFilter({
                        type: "Plan",
                        payload: null,
                      });
                    }
                    if (w.realIndex === tipList.length + 1) {
                      if(pc){
                        navigate('/create/plan')
                      }
                      return dispatchFilter({
                        type: "Plan",
                        payload: -1,
                      });
                    }
                  }
                  // console.log('------>incentivePlanId', incentivePlanId)
                  // if (!pc && w.activeIndex === tipList.length) return;
                  dispatchFilter({
                    type: "Plan",
                    payload: incentivePlanId,
                  });
                }}
              >
                {tipList.length > 1 && (
                  <SwiperSlide
                    key="all"
                    style={{ width: "auto", paddingBottom: "10px" }}
                  >
                    {({ isActive }) => {
                      return isActive ? (
                        <AllActiveCard pc={pc} />
                      ) : (
                        <AllInActiveCard pc={pc} />
                      );
                    }}
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
                          return isActive ? (
                            <ActiveCard tip={tip} pc={pc} />
                          ) : (
                            <InActiveCard tip={tip} pc={pc} />
                          );
                        }}
                      </SwiperSlide>
                    );
                  })}

                {
                  <SwiperSlide
                    key="add"
                    style={{ width: "auto", paddingBottom: "10px" }}
                  >
                    {({ isActive }) => {
                      return isActive ? (
                        <AddActiveCard pc={pc} />
                      ) : (
                        <AddInActiveCard pc={pc} />
                      );
                    }}
                  </SwiperSlide>
                }
              </Swiper>
            </>
          )}
        </div>
      </div>

      {pc ? (
        <div className="hidden lg:block">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-[32px] lg:text-[24px]">Grants</h2>

            {userLoading || grantLoading ? null : tipList.length === 0 ? (
              <Button type="primary" size="large" disabled>
                <span>
                  <PlusOutlined />
                  <span className="font-roboto">New Grant</span>
                </span>
              </Button>
            ) : (
              ![null, -1].includes(filters.Plan) && (
                <Link to={`/incentive/grant/${filters.Plan}/create`}>
                  <Button type="primary" size="large">
                    <span>
                      <PlusOutlined />
                      <span className="font-roboto">New Grant</span>
                    </span>
                  </Button>
                </Link>
              )
            )}
          </div>

          {userLoading || grantLoading ? null : (
            <div className="justify-end hidden my-4 lg:flex">
              <div className="flex items-center overflow-hidden bg-white !divide-x rounded-lg shadow-c12">
                <span>
                  <Button
                    type="text"
                    icon={
                      <BarsOutlined
                        style={{
                          color: displayType === 1 ? "#0049FF" : "#BFBFBF",
                        }}
                      />
                    }
                    onClick={() => setDisplayType(1)}
                    className="!flex !rounded-none justify-center items-center"
                  />
                </span>
                <span>
                  <Button
                    type="text"
                    icon={
                      <AppstoreOutlined
                        style={{
                          color: displayType === 0 ? "#0049FF" : "#BFBFBF",
                        }}
                      />
                    }
                    onClick={() => setDisplayType(0)}
                    className="!flex !rounded-none justify-center items-center"
                  />
                </span>
              </div>
            </div>
          )}

          <div className="hidden lg:block">
            {displayType === 1 && (
              <GrantTable
                list={filterGrantList(grantList)}
                loading={grantLoading}
              />
            )}

            {displayType === 0 && (
              <div
                className={clsx(
                  "grid gap-x-2.5 gap-y-2.5",
                  filterGrantList(grantList).length > 0
                    ? "grid-cols-4"
                    : "grid-cols-1"
                )}
              >
                {userLoading || grantLoading ? (
                  <Spin />
                ) : filterGrantList(grantList).length > 0 ? (
                  filterGrantList(grantList).map((grant) => (
                    <GrantCardV2 grant={grant} key={grant.grant.grantId} />
                  ))
                ) : (
                  <div className="h-[222px] rounded-lg bg-white flex items-center justify-center">
                    <Empty description="No grant" />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="block lg:hidden">
          {/* {swiper?.realIndex !== tipList.length && (
            <div className="fixed left-0 right-0 bottom-8">
              <Link
                to={`/incentive/grant/${
                  swiper?.realIndex !== tipList.length
                    ? tipList[swiper?.realIndex]?.incentivePlanId
                    : "tmp"
                }/create`}
                className="flex items-center justify-center  w-60 h-[35px] bg-[#0049FF] text-white text-[16px] leading-[20px] mx-auto rounded-3xl"
              >
                <PlusOutlined />
                <span className="mx-6">New Grant</span>
              </Link>
            </div>
          )}  */}
          <div className="fixed left-0 right-0 flex justify-center bottom-8">
            {tipList.length === 0 ? (
              <Button
                type="primary"
                size="large"
                disabled
                className="w-60 h-[35px] px-7 "
              >
                <span>
                  <PlusOutlined />
                  <span className="ml-10">New Grant</span>
                </span>
              </Button>
            ) : (
              ![null, -1].includes(filters.Plan) && (
                <Link to={`/incentive/grant/${filters.Plan}/create`}>
                  <Button
                    type="primary"
                    size="large"
                    className="w-60 h-[35px] px-7 "
                  >
                    <span>
                      <PlusOutlined />
                      <span className="ml-10">New Grant</span>
                    </span>
                  </Button>
                </Link>
              )
            )}
          </div>

          {/* <Drawer
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
          </nav> */}

          <div
            className={clsx(
              "grid gap-x-2 gap-y-2",
              filterGrantList(grantList).length > 0
                ? "grid-cols-2"
                : "grid-cols-1"
            )}
          >
            {userLoading || grantLoading ? (
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
