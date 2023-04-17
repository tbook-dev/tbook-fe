import React, { useState, useReducer, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getIncentiveListWithGrants } from "@/api/incentive";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { PlusOutlined } from "@ant-design/icons";
import GrantTable from "./GrantTable";
import { Empty } from "@tbook/ui";
import { useAsyncEffect, useResponsive } from "ahooks";
import { useCurrentProjectId, useUserInfoLoading, useTheme, useProjects } from "@tbook/hooks";
import _ from "lodash";
import { useSelector } from "react-redux";
import clsx from "clsx";
import PlanCard from "./planCard/Active";
import GrantCard from "./grantCard";
import GrantCardV2 from "./grantCard/v2";
import FilterPanel from "./filter";
import { Spin } from "antd";
import { filterReducer, initialFilters } from "@/store/parts";
import dayjs from "dayjs";
import PlanTipNoConnect from "./planTip/NoConnect";
import PlanTipNoProject from "./planTip/NoProject";
import filterIcon from "@tbook/share/images/icon/filter.svg";
import filterIcon2 from "@tbook/share/images/icon/filter2.svg";
import filterList from "@tbook/share/images/icon/list-default.png";
import filterList2 from "@tbook/share/images/icon/list-active.png";
import filterCard from "@tbook/share/images/icon/card-default.png";
import filterCard2 from "@tbook/share/images/icon/card-active.png";
import closeIcon from "@tbook/share/images/icon/close4.svg";
import closeIcon2 from "@tbook/share/images/icon/close5.svg";
import Select from "@/components/select/themeSelect";
import { conf } from "@tbook/utils";

const { sortList, dateFormat, getLastVested } = conf;

function PlanList() {
  const [swiper, setSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [tipList, updateTipList] = useState([]);
  const [grantList, updateGrantList] = useState([]);
  const [grantLoading, setGrantLoading] = useState(false);
  const userLoading = useUserInfoLoading();
  const projectId = useCurrentProjectId();
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.user.authUser);
  const [filterOpen, setFilter] = useState(false);
  const { pc } = useResponsive();
  const [filters, dispatchFilter] = useReducer(filterReducer, initialFilters);
  const [searchParams] = useSearchParams();
  const projects = useProjects();
  const theme = useTheme();
  // type, 0是卡片，1是表格
  const [displayType, setDisplayType] = useState(0);

  const selectedTipId = searchParams.get("tipId");

  useEffect(() => {
    return () => {
      swiper?.destroy();
    };
  }, []);

  useAsyncEffect(async () => {
    if (!projectId) return;
    setGrantLoading(true);
    const list1 = await getIncentiveListWithGrants(projectId);
    // format
    updateTipList(list1);
    // grants
    //const list2 = await Promise.all(list1.map((tip) => getTipGrantList(tip.incentivePlanId)));
    const list2 = list1.map((tip) => tip.grants);
    console.log({ list2 });
    let activeIdx = list1.findIndex((t) => t.incentivePlanId == selectedTipId);
    if (activeIdx === -1) {
      const list2Formated = _.cloneDeep(list2)
        ?.map((planGrants) => {
          const sortedList = planGrants.sort((a, b) => {
            return dayjs(a?.grant?.updateTime).isBefore(dayjs(b?.grant?.updateTime)) ? -1 : 1;
          });
          const lastOne = sortedList.pop();
          return lastOne;
        })
        .map((item, idx) => ({ ...item, idx }))
        .filter((item) => item.grant)
        .sort((a, b) => {
          return dayjs(a?.grant?.updateTime).isBefore(dayjs(b?.grant?.updateTime)) ? 1 : -1;
        });
      activeIdx = list2Formated[0]?.idx || 0;
      // console.log(list2Formated[0].incentivePlanId)`
    }
    // const activeIdx = list2Formated[0]?.idx || 0;
    setActiveIndex(activeIdx);
    console.log("activeIdx", activeIdx);

    if (list1.length > 0) {
      dispatchFilter({
        type: "plan",
        payload: {
          value: [
            {
              value: list1[activeIdx].incentivePlanId,
              label: list1[activeIdx].incentivePlanName,
              key: "plan",
              disabled: false,
            },
          ],
        },
      });
    } else {
      dispatchFilter({
        type: "clearAll",
        payload: null,
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

  useEffect(() => {
    if (swiper && filters.plan.length === 1 && tipList.length > 0) {
      const idx = tipList.findIndex((v) => v.incentivePlanId === filters.plan[0]?.value);
      try {
        idx !== -1 && swiper?.slideTo(idx);
      } catch (error) {
        console.log(error);
      }
    }
  }, [filters.plan.length, swiper, tipList.length]);

  const getfilterGrantList = () => {
    const { status = [], plan = [], vestingType = [], grantType = [], sortBy = 1 } = filters;
    let res = grantList.slice();
    if (status.length > 0) {
      res = res.filter((grant) => status.find((v) => grant?.grant?.grantStatus === v.value));
    }
    if (plan.length > 0) {
      res = res.filter((grant) => plan.find((v) => grant?.grant?.incentivePlanId === v.value));
    }
    if (vestingType.length > 0) {
      res = res.filter((grant) => vestingType.find((v) => grant?.grant?.grantType === v.value));
    }
    if (sortBy === 1) {
      // grantDate
      res = res.sort((a, b) =>
        dayjs(b?.grant?.grantDate, dateFormat).isBefore(dayjs(a?.grant?.grantDate, dateFormat)) ? -1 : 1
      );
    } else if (sortBy === 2) {
      // Token Amount
      res = res.sort((a, b) => b?.grant?.grantNum - a?.grant?.grantNum);
    } else if (sortBy === 3) {
      res = res.sort((a, b) => b?.vestedAmount - a?.vestedAmount);
    } else if (sortBy === 4) {
      // 存在没有授予的情况
      res = res.sort((a, b) =>
        dayjs(getLastVested(b?.grant?.vestingSchedule?.vestingDetail)?.date, dateFormat).isBefore(
          dayjs(getLastVested(a?.grant?.vestingSchedule?.vestingDetail)?.date, dateFormat)
        )
          ? 1
          : -1
      );
      res.reverse();
    }
    // grantType 现在都是token option, 现在没效果
    return res;
  };
  const filterGrantList = getfilterGrantList();

  const flatKeys = ["status", "plan", "vestingType", "grantType"];
  const flatFilters = _.flattenDeep([flatKeys.map((key) => filters[key])]);
  // console.log({ grantList, filters });
  // console.log("filters.plan", filters.Plan);
  // console.log(filters, flatFilters);
  return (
    <div className="w-full text-[#202124] mb-4 px-4 lg:px-0 lg:w-[936px] mx-auto">
      <div
        className="w-full mt-3 mb-5 lg:my-12"
        style={{
          "--swiper-navigation-size": "16px",
          "--swiper-theme-color": theme === "dark" ? "#fff" : "#666",
        }}
      >
        <div className="flex items-center justify-between mb-2 lg:mb-6">
          <h2 className="font-bold text-ch1 lg:text-cwh1 dark:text-white">Incentive Plans</h2>

          {authUser && tipList.length > 0 && (
            <Link to="/create/plan">
              <button
                type="button"
                className={clsx(
                  "flex items-center justify-center w-8 h-8  lg:w-40 lg:h-10 text-xs font-medium ",
                  "rounded-md lg:rounded-lg  shadow-d3",
                  "text-white  bg-black dark:text-black dark:bg-white  ",
                  "lg:hover:opacity-70 lg:hover:dark:opacity-100  lg:dark:bg-white lg:dark:bg-none  lg:dark:text-black lg:dark:hover:text-white lg:dark:hover:bg-cw1 lg:hover:shadow-d7"
                )}
              >
                <PlusOutlined style={pc ? null : { fontSize: "16px" }} />
                <span className="ml-2 text-[14px] hidden lg:inline">New Plan</span>
              </button>
            </Link>
          )}
        </div>

        <div className="relative lg:h-[150px] lg:flex lg:justify-center">
          {userLoading || grantLoading ? (
            <div className="flex items-center justify-center w-full h-full">
              <Spin />
            </div>
          ) : !authUser ? (
            <PlanTipNoConnect pc={pc} />
          ) : projects.length === 0 || tipList.length === 0 ? (
            <PlanTipNoProject pc={pc} link={projects.length === 0 ? "/create/project" : "/create/plan"} />
          ) : (
            <>
              <div className="hidden lg:flex lg:justify-center lg:items-center absolute swiper-button-next !-right-12 border !w-8 !h-8 rounded-full"></div>
              <div className="hidden lg:flex lg:justify-center lg:items-center absolute swiper-button-prev !-left-12 border !w-8 !h-8 rounded-full"></div>

              <Swiper
                modules={[Navigation]}
                spaceBetween={10}
                slidesPerView={"auto"}
                slidesPerGroup={pc ? 4 : 1}
                onSwiper={setSwiper}
                // style={{ marginLeft: pc && tipList.length < 4 ? "0" : "auto" }}
                slideToClickedSlide={pc}
                initialSlide={activeIndex}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                onSlideChange={(w) => {
                  if (!pc && !filterOpen) {
                    // let incentivePlanId = tipList[w.realIndex]?.incentivePlanId;
                    let tip = tipList[w.realIndex];

                    dispatchFilter({
                      type: "plan",
                      payload: {
                        value: [
                          { value: tip.incentivePlanId, label: tip.incentivePlanName, key: "plan", disabled: false },
                        ],
                      },
                    });
                  }
                }}
              >
                {Array.isArray(tipList) &&
                  tipList.map((tip) => {
                    return (
                      <SwiperSlide key={tip.incentivePlanId} style={{ width: "auto", cursor: "pointer" }}>
                        <div
                          style={{ padding: "4px 4px" }}
                          onClick={() => {
                            dispatchFilter({
                              type: "plan",
                              payload: {
                                value: [
                                  {
                                    value: tip.incentivePlanId,
                                    label: tip.incentivePlanName,
                                    key: "plan",
                                    disabled: false,
                                  },
                                ],
                              },
                            });
                          }}
                        >
                          <PlanCard
                            isActive={filters?.plan?.length === 1 && filters?.plan[0]?.value === tip.incentivePlanId}
                            tip={tip}
                            pc={pc}
                          />
                        </div>
                      </SwiperSlide>
                    );
                  })}

                {pc &&
                  tipList.length % 4 !== 0 &&
                  new Array(4 - (tipList.length % 4)).fill().map((_, v) => (
                    <SwiperSlide style={{ width: "auto" }} key={v}>
                      <div style={{ padding: "6px 4px 4px" }}>
                        <div className="w-[218px] h-[140px]" />
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </>
          )}
        </div>
      </div>

      {pc ? (
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-[32px] lg:text-cwh2 dark:text-white font-bold">Grants</h2>

            {userLoading || grantLoading ? null : (
              <button
                type="button"
                disabled={filters.plan.length !== 1}
                onClick={() => navigate(`/incentive/grant/${filters.plan[0]?.value}/create`)}
                className={clsx(
                  "flex items-center justify-center text-xs font-medium text-white  bg-black",
                  "dark:bg-white lg:hover:dark:opacity-100 lg:hover:opacity-70 lg:w-40 lg:h-10",
                  " disabled:bg-l-2 disabled:text-l-1 lg:rounded-lg dark:text-black shadow-d3 hover:text-white lg:dark:hover:bg-cw1",
                  " hover:shadow-d7 disabled:shadow-none dark:disabled:bg-b-1 dark:disabled:text-b-2",
                  "lg:hover:dark:disabled:bg-none hover:disabled:shadow-none disabled:dark:hover:text-b-2 "
                )}
              >
                <PlusOutlined />
                <span className="ml-2 text-[14px]">New Grant</span>
              </button>
            )}
          </div>

          {userLoading || grantLoading ? null : (
            <div className="flex items-center justify-between my-4">
              <img
                src={theme === "dark" ? filterIcon : filterIcon2}
                className="object-contain w-10 h-10 cursor-pointer"
                onClick={() => {
                  setFilter(!filterOpen);
                }}
              />

              <div className="flex items-center bg-white rounded-lg dark:bg-black shadow-c12">
                <Select
                  options={sortList}
                  style={{ width: 214 }}
                  value={filters.sortBy}
                  onChange={(v) => {
                    dispatchFilter({
                      type: "sortBy",
                      payload: {
                        value: v,
                      },
                    });
                  }}
                />
                <img
                  src={displayType === 1 ? filterList2 : filterList}
                  className={clsx(
                    !authUser && "cursor-not-allowed",
                    "w-10 h-10 object-cover ml-3 cursor-pointer hover:opacity-70"
                  )}
                  onClick={() => authUser && setDisplayType(1)}
                />
                <img
                  src={displayType === 0 ? filterCard2 : filterCard}
                  className={clsx(
                    !authUser && "cursor-not-allowed",
                    "w-10 h-10 object-cover cursor-pointer hover:opacity-70"
                  )}
                  onClick={() => authUser && setDisplayType(0)}
                />
              </div>
            </div>
          )}

          <div className={clsx("grid gap-x-2 grid-cols-4")}>
            {filterOpen && (
              <div className="col-span-1">
                <FilterPanel
                  tipList={tipList}
                  filters={filters}
                  open={filterOpen}
                  setOpen={setFilter}
                  dispatch={dispatchFilter}
                />
              </div>
            )}
            <div className={clsx(filterOpen ? "col-span-3" : "col-span-full")}>
              {flatFilters.length > 0 && !(userLoading || grantLoading) && (
                <div className="flex flex-wrap mb-3 col-span-full">
                  {flatFilters.map((v) => (
                    <div
                      key={v.key + v.value}
                      className="flex items-center rounded text-c5 py-1.5 px-4 mr-4 mb-3 bg-[#f6fafe]  dark:bg-[#191919] dark:text-white"
                    >
                      {v.label}
                      <img
                        onClick={() => {
                          const list = filters[v.key];
                          const res = list.filter((i) => i.value !== v.value);
                          dispatchFilter({
                            type: v.key,
                            payload: {
                              value: res,
                            },
                          });
                        }}
                        className="w-2.5 h-2.5 object-contain ml-2.5 cursor-pointer"
                        src={theme === "dark" ? closeIcon : closeIcon2}
                      />
                    </div>
                  ))}

                  <div
                    className="flex items-center justify-center rounded text-c5 mr-4 mb-3 py-1.5 w-[120px]  cursor-pointer dark:shadow-d3 text-white hover:opacity-70 bg-black dark:bg-transparent"
                    onClick={() => {
                      dispatchFilter({
                        type: "clearAll",
                        payload: null,
                      });
                    }}
                  >
                    Clear All
                  </div>
                </div>
              )}

              {userLoading || grantLoading ? (
                <div className="flex items-center justify-center w-full h-[300px]">
                  <Spin />
                </div>
              ) : (
                <>
                  {displayType === 1 &&
                    (filterGrantList.length > 0 ? (
                      <GrantTable list={filterGrantList} filters={filters} />
                    ) : (
                      <div className="h-[272px] rounded-xl bg-[#f6f8fa] dark:bg-b-1 flex items-center justify-center">
                        <Empty />
                      </div>
                    ))}

                  {displayType === 0 && (
                    <div
                      className={clsx(
                        "grid gap-x-2 gap-y-3",
                        filterGrantList.length > 0 ? (filterOpen ? "grid-cols-3" : "grid-cols-4") : "grid-cols-1"
                      )}
                    >
                      {filterGrantList.length > 0 ? (
                        filterGrantList.map((grant) => <GrantCardV2 grant={grant} key={grant.grant.grantId} />)
                      ) : (
                        <div className="h-[272px] rounded-xl bg-[#f6f8fa] dark:bg-b-1 flex items-center justify-center">
                          <Empty />
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="block lg:hidden">
          {userLoading || grantLoading ? null : (
            <div className="flex items-center justify-between mt-6 mb-2">
              <button
                type="button"
                disabled={filters.plan.length !== 1}
                onClick={() => navigate(`/incentive/grant/${filters.plan[0]?.value}/create`)}
                className={clsx(
                  "flex items-center justify-center w-[240px] h-8  lg:w-40 lg:h-10 text-xs font-medium ",
                  "rounded-md lg:rounded-lg  shadow-d3",
                  "text-white  bg-black dark:text-black dark:bg-white  ",
                  "lg:hover:opacity-70 lg:hover:dark:opacity-100  lg:dark:bg-white lg:dark:bg-none  lg:dark:text-black lg:dark:hover:text-white lg:dark:hover:bg-cw1 lg:hover:shadow-d7",
                  " disabled:bg-l-2 disabled:text-l-1 d dark:disabled:bg-b-1 dark:disabled:text-b-2"
                )}
              >
                <PlusOutlined />
                <span className="ml-2 text-[14px]">New Grant</span>
              </button>

              <FilterPanel
                tipList={tipList}
                filters={filters}
                open={filterOpen}
                setOpen={setFilter}
                dispatch={dispatchFilter}
              />
            </div>
          )}

          <div className={clsx("grid gap-x-2 gap-y-2", filterGrantList.length > 0 ? "grid-cols-2" : "grid-cols-1")}>
            {userLoading || grantLoading ? (
              <Spin />
            ) : filterGrantList.length > 0 ? (
              filterGrantList.map((grant) => <GrantCard grant={grant} key={grant.grant.grantId} />)
            ) : (
              <div className="h-[222px] rounded-lg bg-[#f6f8fa]  dark:bg-b-1 shadow-l3 flex items-center justify-center">
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
