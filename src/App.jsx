import React, { Suspense, useLayoutEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useAsyncEffect } from "ahooks";
import "./css/style.css";
import "./charts/ChartjsConfig";
import { useDispatch } from "react-redux";
import { fetchUserInfo } from "@/store/user";
import { match } from "path-to-regexp";

import PageNotFound from "./pages/utility/PageNotFound";
import LayoutV1 from "./layout/Layout.admin";
import LayoutV2 from "./layout/Layout.grante";

import routes from "./router";
import { Spin } from "antd";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [layoutVersion, setLayoutVersion] = useState("v1");
  const Layout = layoutVersion === "v1" ? LayoutV1 : LayoutV2;

  useLayoutEffect(() => {
    const currentConf = routes.find(v => match(v.path)(location.pathname))
    setLayoutVersion(currentConf?.layout || 'v1')
  }, [location]);

  useAsyncEffect(async () => {
    dispatch(fetchUserInfo());
  }, []);

  return (
    <Layout>
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
    </Layout>
  );
}

export default App;
