import React, { useState } from "react";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import WelcomeBanner from "../partials/dashboard/WelcomeBanner";
import GrantStatic from "../partials/dashboard/GrantStatic";
import DashboardCard02 from "../partials/dashboard/DashboardCard02";
import DashboardCard03 from "../partials/dashboard/DashboardCard03";
import DashboardCard04 from "../partials/dashboard/DashboardCard04";
import DashboardCard05 from "../partials/dashboard/DashboardCard05";
import DashboardCicle from "../partials/dashboard/DashboardCicle";
import DashboardCard07 from "../partials/dashboard/DashboardCard07";
import DashboardCard08 from "../partials/dashboard/DashboardCard08";
import DashboardCard09 from "../partials/dashboard/DashboardCard09";
import DashboardCard10 from "../partials/dashboard/DashboardCard10";
import DashboardCard11 from "../partials/dashboard/DashboardCard11";
import { useSelector } from "react-redux";
import { useAsyncEffect } from "ahooks";
import { getDashboardOverview, getDashboardGrants } from "../api/incentive";

import GrantTable from "./incentive/GrantTable";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const userStore = useSelector((state) => state.user);
  const [overView, setOverView] = useState({});
  const [grantList, setGrantList] = useState([]);
  const projectId = userStore?.projects?.[0]?.projectId;
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

  console.log("overView", overView);
  console.log("grantList", grantList);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Welcome banner */}
            <WelcomeBanner userName={userStore?.user?.name} />

            {/* Dashboard actions */}

            {/* Cards */}
            <div>
              <h2 className="text-[#1E293B] text-3xl	font-bold mb-2">
                Overview
              </h2>
              <div className="grid grid-cols-12 gap-6">
                <GrantStatic
                  value={overView.totalGrants}
                  percent={10}
                  title="Total Grants"
                />
                <GrantStatic
                  value={overView.vestedGrants}
                  percent={10}
                  title="Vested"
                />
                <DashboardCicle
                  title="Target Audience Distribution"
                  data={overView.targetAudienceDistribution}
                />

                <DashboardCard10 />
                <DashboardCard11 />

                <div className="col-span-full">
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
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
