import React, { useState, useReducer, useMemo, useCallback } from "react";
import { getTotalGrantInfo } from "@/api/incentive";
import GrantTable from "./GrantTable";
import { Empty } from "@tbook/ui";
import { useAsyncEffect, useResponsive } from "ahooks";
import { useCurrentProjectId, useUserInfoLoading } from "@tbook/hooks";
import _ from "lodash";

import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import GrantCard from "./grantCard";
import GrantCardV2 from "./grantCard/v2";
import FilterPanel from "./filter";
import { Spin } from "antd";
import { filterReducer, initialFilters } from "@/store/parts";
import NoConnect from "./planTip/NoConnect";
import { conf } from "@tbook/utils";

const { formatDollar } = conf;

function PlanList() {
  const [grantList, updateGrantList] = useState([]);
  const [grantInfoLoading, setGrantInfoLoading] = useState(false);
  const [grantTotal, updateGrantTotal] = useState({});
  const userLoading = useUserInfoLoading();
  const projectId = useCurrentProjectId();
  const authUser = useSelector((state) => state.user.authUser);
  const [drawerOpen, setDrawer] = useState(false);
  const { pc } = useResponsive();
  const [filters, dispatchFilter] = useReducer(filterReducer, initialFilters);
  // type, 0是卡片，1是表格
  const [displayType, setDisplayType] = useState(0);

  // console.log("authUser", authUser);
  useAsyncEffect(async () => {
    if (!projectId) return;
    setGrantInfoLoading(true);
    const total = await getTotalGrantInfo(projectId);
    updateGrantTotal(total?.projectInfo || {});
    updateGrantList(total?.grants || []);
    setGrantInfoLoading(false);
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

  const infoList = useMemo(() => {
    return [
      {
        name: "Vested Token Value",
        value: () => (
          <span className="font-bold text-c14 lg:text-c13">
            {grantTotal?.vestedTokenValue ? `${formatDollar(grantTotal?.vestedTokenValue)} USD` : "-"}
          </span>
        ),
      },
      {
        name: "Total Token Value",
        value: () => (
          <span className="font-bold text-c14 lg:text-c13">
            {grantTotal?.totalTokenValue ? `${formatDollar(grantTotal?.totalTokenValue)} USD` : "-"}
          </span>
        ),
      },
      {
        name: "Grants",
        value: () => (
          <span className="font-medium text-c14 lg:text-c13">{`${formatDollar(grantTotal?.grantsCnt || "-")}`}</span>
        ),
      },
      {
        name: "Vested Token",
        value: () => (
          <span className="font-medium text-c14 lg:text-c13">{`${formatDollar(grantTotal?.vestedToken || "-")}`}</span>
        ),
      },
      {
        name: "Total Amount",
        value: () => (
          <span className="font-medium text-c14 lg:text-c13">{`${formatDollar(grantTotal?.totalAmount || "-")}`}</span>
        ),
      },
    ];
  }, [grantTotal]);

  // console.log("filters.plan", filters.Plan);
  // console.log({ authUser });
  return (
    <div className="w-full mb-5 px-4 pt-3 lg:pt-16 lg:px-0 lg:w-[936px] mx-auto">
      <div className="w-full mb-10 h-[240px] lg:h-64">
        {userLoading || grantInfoLoading ? (
          <div className="flex items-center justify-center w-full h-full">
            <Spin />
          </div>
        ) : !authUser ? (
          <NoConnect pc={pc} list={infoList} projectName={grantTotal?.project?.projectName} />
        ) : (
          <div className="flex flex-col justify-between h-full px-4 pt-6 pb-3 text-black rounded-xl lg:rounded-2xl lg:p-10 bg-cw1 lg:shadow-d6">
            <div className="flex">
              <h2 className="font-bold text-cwh5 lg:ch2">{grantTotal?.project?.projectName}</h2>
            </div>

            <div className="block space-y-1 lg:space-y-0 lg:flex lg:justify-between">
              {infoList.map((info, idx) => (
                <div className="flex flex-row-reverse items-center justify-between lg:block" key={idx}>
                  <div>
                    <info.value />
                  </div>
                  <div className="text-c1">{info.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {pc ? (
        <div className="hidden lg:block">
          {displayType === 1 && <GrantTable list={filterGrantList(grantList)} loading={grantInfoLoading} />}

          {displayType === 0 && (
            <div
              className={clsx(
                "grid gap-x-2 gap-y-3",
                filterGrantList(grantList).length > 0 ? "grid-cols-4" : "grid-cols-1"
              )}
            >
              {userLoading || grantInfoLoading ? (
                <Spin />
              ) : filterGrantList(grantList).length > 0 ? (
                filterGrantList(grantList).map((grant) => <GrantCardV2 grant={grant} key={grant.grant.grantId} />)
              ) : (
                <div className="h-[272px] rounded-xl bg-white dark:bg-b-1 flex items-center justify-center">
                  <Empty />
                </div>
              )}
            </div>
          )}
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
              filterGrantList(grantList).length > 0 ? "grid-cols-2" : "grid-cols-1"
            )}
          >
            {userLoading || grantInfoLoading ? (
              <Spin />
            ) : filterGrantList(grantList).length > 0 ? (
              filterGrantList(grantList).map((grant) => <GrantCard grant={grant} key={grant.grant.grantId} />)
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
