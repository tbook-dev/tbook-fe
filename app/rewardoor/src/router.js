import { lazy } from "react";

// 只有首页不需要登录，其他的都需要登录
const routes = [
  {
    path: "/",
    component: lazy(() => import("@/pages/home")),
  },
  {
    path: "/aboard",
    component: lazy(() => import("@/pages/aboard")),
  },
  {
    path: "/new-project",
    component: lazy(() => import("@/pages/project")),
  },
  {
    path: "/nft",
    component: lazy(() => import("@/pages/nft")),
  },
  {
    path: "/draft/:campaignId",
    component: lazy(() => import("@/pages/campaign")),
  },
  {
    path: "/credential",
    component: lazy(() => import("@/pages/credential")),
  },
  // dashboard 部分
  {
    path: "/dashboard/overview",
    component: lazy(() => import("@/pages/dashboard/overview")),
  },
  {
    path: "/new-campaign",
    component: lazy(() => import("@/pages/dashboard/new-campaign")),
  },
  {
    path: "/dashboard/campaign",
    component: lazy(() => import("@/pages/dashboard/campaign")),
  },
  {
    path: "/dashboard/campaign/:id",
    component: lazy(() => import("@/pages/dashboard/campaign-detail")),
  },
  {
    path: "/dashboard/assets",
    component: lazy(() => import("@/pages/dashboard/assets")),
  },
  {
    path: '/twitter/callback',
    component: lazy(() => import("@/pages/twitter/callback")),
  }
];

export default routes;
