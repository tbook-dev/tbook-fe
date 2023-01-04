import React, { useState } from "react";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import WelcomeBanner from "../partials/dashboard/WelcomeBanner";
import GrantStatic from "../partials/dashboard/GrantStatic";
import DashboardCard02 from "../partials/dashboard/DashboardCard02";
import DashboardCard03 from "../partials/dashboard/DashboardCard03";
import DashboardCard04 from "../partials/dashboard/DashboardCard04";
import DashboardCard05 from "../partials/dashboard/DashboardCard05";
import DashboardCard06 from "../partials/dashboard/DashboardCard06";
import DashboardCard07 from "../partials/dashboard/DashboardCard07";
import DashboardCard08 from "../partials/dashboard/DashboardCard08";
import DashboardCard09 from "../partials/dashboard/DashboardCard09";
import DashboardCard10 from "../partials/dashboard/DashboardCard10";
import DashboardCard11 from "../partials/dashboard/DashboardCard11";
import { useSelector } from "react-redux";
import { useAsyncEffect } from "ahooks";
import { getDashboardOverview, getDashboardGrants} from "../api/incentive";


function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const userStore = useSelector((state) => state.user);
  const [overView, setOverView] = useState({});
  const [grantList, setGrantList] = useState([]);
  const projectId = userStore?.projects?.[0]?.projectId;
  const userId = userStore?.user?.userId

  useAsyncEffect(async () => {
    if (projectId) {
      const overView = await getDashboardOverview(
        projectId,
        userId
      );
      setOverView(overView)
    }
  }, [projectId]);
  useAsyncEffect(async () => {
    if (projectId) {
      const res = await getDashboardGrants(
        projectId,
        userId
      );
      setGrantList(res)
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
                {/* Line chart (Acme Plus) */}
                <GrantStatic value={overView.totalGrants} percent={10} title="Total Grants"/>
                {/* Line chart (Acme Advanced) */}
                <GrantStatic value={overView.vestedGrants} percent={10} title="Vested"/>

                {/* Line chart (Acme Professional) */}
                <DashboardCard03 />
                {/* Bar chart (Direct vs Indirect) */}
                <DashboardCard04 />
                {/* Line chart (Real Time Value) */}
                <DashboardCard05 />
                {/* Doughnut chart (Top Countries) */}
                <DashboardCard06 />
                {/* Table (Top Channels) */}
                <DashboardCard07 />
                {/* Line chart (Sales Over Time) */}
                <DashboardCard08 />
                {/* Stacked bar chart (Sales VS Refunds) */}
                <DashboardCard09 />
                {/* Card (Recent Activity) */}
                <DashboardCard10 />
                {/* Card (Income/Expenses) */}
                <DashboardCard11 />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
