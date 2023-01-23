import React, { useState } from "react";

import WelcomeBanner from "../partials/dashboard/WelcomeBanner";
import GrantStatic from "../partials/dashboard/GrantStatic";
import DashboardCicle from "../partials/dashboard/DashboardCicle";
import { useSelector } from "react-redux";
import { useAsyncEffect } from "ahooks";
import { getDashboardOverview, getDashboardGrants } from "../api/incentive";
import useCurrentProjectId from "@/hooks/useCurrentProjectId";
import GrantTable from "./incentive/GrantTable";


function Dashboard() {
  const userStore = useSelector((state) => state.user);
  const [overView, setOverView] = useState({});
  const [grantList, setGrantList] = useState([]);
  const projectId = useCurrentProjectId();
  const userId = userStore?.user?.userId;

  useAsyncEffect(async () => {
    if (projectId) {
      const overView = await getDashboardOverview(projectId, userId);
      setOverView(overView);
    }
  }, [projectId]);
  useAsyncEffect(async () => {
    if (projectId) {
      const res = await getDashboardGrants(projectId, userId);
      setGrantList(res);
    }
  }, [projectId]);

  // console.log("overView", overView);
  // console.log("grantList", grantList);

  return (
      <div className="w-full px-4 py-8 mx-auto sm:px-6 lg:px-8 max-w-9xl">
        {/* Welcome banner */}
        <WelcomeBanner userName={userStore?.user?.name} />

        {/* Dashboard actions */}

        {/* Cards */}
        <div>
          <h2 className="text-[#1E293B] text-3xl	font-bold mb-2">Overview</h2>
          <div className="grid grid-cols-12 gap-6">
            <GrantStatic
              value={overView.totalGrants}
              percent={overView.totalTokenPercent * 100}
              title="Total Granted Token"
            />
            <GrantStatic
              value={overView.vestedGrants}
              percent={overView.vestedTokenPercent * 100}
              title="Total Vested Token"
            />
            <DashboardCicle
              title="Target Audience Distribution"
              data={overView.targetAudienceDistribution}
              height={180}
            />
            <DashboardCicle
              title="Vested Token"
              data={{
                "Free Token": overView.freeTokens,
                "Granted Token": overView.totalGrants,
                "Vested Token": overView.vestedGrants,
              }}
              height={200}
            />
            {/* <DashboardCard11 /> */}

            <div className="col-span-full">
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
      </div>
  );
}

export default Dashboard;
