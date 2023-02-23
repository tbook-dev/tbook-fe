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
import { Button, Drawer, Space } from "antd";
import Empty from "@/components/empty";
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
    setActiveIndex(activeIdx);
    // console.log("activeIdx+1", list1, activeIdx + 1);
    dispatchFilter({
      type: "Plan",
      payload: list1[activeIdx]?.incentivePlanId,
    });

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
  // console.log("filters.plan", filters.Plan);
  return (
    <div className="w-full text-[#202124] mb-4">
      <div
        className="w-full mb-5 lg:mt-12"
        style={{ "--swiper-navigation-size": "16px" }}
      >
        <h2 className="mb-6 text-[32px] lg:text-cwh1 dark:text-white font-bold">
          Incentive Plans
        </h2>

        <div className="relative lg:h-[140px]">
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
                spaceBetween={10}
                slidesPerView={pc ? 4 : "auto"}
                // centeredSlides={pc}
                onSwiper={setSwiper}
                slideToClickedSlide={pc}
                initialSlide={activeIndex}
                // observeSlideChildren
                // loop={pc && tipList.length > 3}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
              >
                {Array.isArray(tipList) &&
                  tipList.map((tip) => {
                    console.log('filters.Plan',filters.Plan,tip.incentivePlanId)
                    return (
                      <SwiperSlide
                        key={tip.incentivePlanId}
                        style={{ width: "auto", paddingBottom: "10px" }}
                      >
                        <ActiveCard
                          isActive={filters.Plan === tip.incentivePlanId}
                          tip={tip}
                          pc={pc}
                        />
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            </>
          )}
        </div>
      </div>

      {pc ? (
        <div className="hidden lg:block">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-[32px] lg:text-cwh2 dark:text-white font-bold">
              Grants
            </h2>

            {userLoading || grantLoading ? null : tipList.length === 0 ? (
              <Button
                type="primary"
                className="!px-9 !h-12 !flex items-center !rounded-lg !border-none"
                disabled
              >
                <span>
                  <PlusOutlined />
                  <span className="ml-2 text-[14px]">New Grant</span>
                </span>
              </Button>
            ) : (
              ![null, -1].includes(filters.Plan) && (
                <Link to={`/incentive/grant/${filters.Plan}/create`}>
                  <Button
                    type="primary"
                    className="!px-9 !h-12 !flex items-center !rounded-lg !border-none"
                  >
                    <span>
                      <PlusOutlined />
                      <span className="ml-2 text-[14px]">New Grant</span>
                    </span>
                  </Button>
                </Link>
              )
            )}
          </div>

          {userLoading || grantLoading ? null : (
            <div className="justify-end hidden my-4 lg:flex">
              <div className="flex items-center overflow-hidden bg-white dark:bg-black !divide-x dark:divide-black rounded-lg shadow-c12">
                <div className="flex items-center justify-center w-10 h-10 bg-b-1">
                  <BarsOutlined
                    onClick={() => authUser && setDisplayType(1)}
                    style={{
                      cursor: authUser ? null : "not-allowed",
                      color: authUser
                        ? displayType === 1
                          ? "#0049FF"
                          : "#BFBFBF"
                        : "rgba(255,255,255,.2)",
                    }}
                  />
                </div>
                <div className="flex items-center justify-center w-10 h-10 bg-b-1">
                  <AppstoreOutlined
                    onClick={() => authUser && setDisplayType(0)}
                    style={{
                      cursor: authUser ? null : "not-allowed",
                      color: authUser
                        ? displayType === 0
                          ? "#0049FF"
                          : "#BFBFBF"
                        : "rgba(255,255,255,.2)",
                    }}
                  />
                </div>
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
                  <div className="h-[272px] rounded-xl bg-white dark:bg-b-1 flex items-center justify-center">
                    <Empty />
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
              <div className="h-[222px] rounded-lg bg-white dark:bg-b-1 flex items-center justify-center">
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
