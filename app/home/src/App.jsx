import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "@/css/style.css";

// import PageNotFound from "./pages/utility/PageNotFound";
import Layout from "./layout/Layout";
import { configResponsive } from "ahooks";
import routes from "./router";
import { Spin } from "antd";

configResponsive({
  pc: 1212,
});

function App() {
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

        {/* <Route path="*" element={<PageNotFound />} /> */}
      </Routes>
    </Layout>
  );
}

export default App;
