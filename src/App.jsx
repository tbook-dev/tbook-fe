import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useAsyncEffect } from "ahooks";

import "./css/style.css";

import "./charts/ChartjsConfig";
import { useDispatch } from "react-redux";
import { fetchUserInfo } from "./store/user";
import { match } from "path-to-regexp";

// Import pages
import Dashboard from "./pages/Dashboard";

import PlanList from "./pages/incentive/PlanList";
import PlanCreate from "./pages/incentive/PlanCreate";

import PageNotFound from "./pages/utility/PageNotFound";
// import Signin from "./pages/Signin";
import CreateProject from "./pages/CreateProject";

import PlanDetail from "./pages/incentive/PlanDetail";
import GrantCreate from "./pages/incentive/GrantCreate";

import Login from "./pages/Login";
import GrantSign from "./pages/incentive/GrantSign";
import ProtectedRoute from "./components/ProtectedRoute";
import Project from "./pages/settings/Project";
import Member from "./pages/settings/Member";
import Feedback from "./pages/settings/Feedback";

import GrantDetail from "./pages/incentive/GrantDetail";
import GrantsSchedule from "./pages/incentive/GrantsSchedule";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";

    // const whileList = ["/signin", "/logins"];

    // if (!whileList.includes(location.pathname)) {
    //   dispatch(fetchUserInfo());
    // }
  }, [location.pathname]); // triggered on route change
  useAsyncEffect(async () => {
    // console.log('useAsyncEffect')
    const whileList = ["/signin", "/logins", "/grants/:grantId/sign"].map(
      match
    );

    if (!whileList.find((match) => match(location.pathname))) {
      dispatch(fetchUserInfo());
    }
  }, []);

  return (
    <>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/incentive"
          element={
            <ProtectedRoute>
              <PlanList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/incentive/create"
          element={
            <ProtectedRoute>
              <PlanCreate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/incentive/:id"
          element={
            <ProtectedRoute>
              <PlanDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/incentive/grant/:tipId/create"
          element={
            <ProtectedRoute>
              <GrantCreate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/incentive/grant/:tipId/:grantId/detail"
          element={
            <ProtectedRoute>
              <GrantDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/incentive/grant/:tipId/:grantId/schedule"
          element={
            <ProtectedRoute>
              <GrantsSchedule />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/grants/:grantId/sign"
          element={
            <ProtectedRoute>
              <GrantSign />
            </ProtectedRoute>
          }
        />

        {/* <Route path="/signin" element={<Signin />} /> */}
        <Route path="/logins" element={<Login />} />
        <Route
          path="/new-project"
          element={
            <ProtectedRoute>
              <CreateProject />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings/project"
          element={
            <ProtectedRoute>
              <Project />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings/member"
          element={
            <ProtectedRoute>
              <Member />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings/feedback"
          element={
            <ProtectedRoute>
              <Feedback />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
