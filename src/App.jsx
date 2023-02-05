import React from "react";
import { Outlet } from "react-router-dom";
import { useAsyncEffect } from "ahooks";
import "./css/style.css";
import { useDispatch } from "react-redux";
import { fetchUserInfo } from "@/store/user";

import LayoutV1 from "./layout/Layout.admin";
import { configResponsive } from 'ahooks';


configResponsive({
  pc: 1120,
})

function App() {
  const dispatch = useDispatch();
  const Layout = LayoutV1
  // useLayoutEffect(() => {
  //   const currentConf = routes.find(v => match(v.path)(location?.pathname))
  //   setLayoutVersion(currentConf?.layout || 'v1')
  // }, [location]);

  useAsyncEffect(async () => {
    dispatch(fetchUserInfo());
  }, []);

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

export default App;
