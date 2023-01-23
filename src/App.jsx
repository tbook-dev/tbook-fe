import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { useAsyncEffect } from "ahooks";

import "./css/style.css";

import "./charts/ChartjsConfig";
import { useDispatch } from "react-redux";
import { fetchUserInfo } from "@/store/user";

import PageNotFound from "./pages/utility/PageNotFound";

import routes from "./router";
import { Spin } from "antd";

function App() {
  const dispatch = useDispatch();

  useAsyncEffect(async () => {
    dispatch(fetchUserInfo());
  }, []);

  return (
    <Routes>
      {routes.map((route) => {
        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              <Suspense
                fallback={
                  <div className="flex flex-col items-center justify-center h-screen">
                    <Spin />
                  </div>
                }
              >
                <route.component />
              </Suspense>
            }
          />
        );
      })}

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
