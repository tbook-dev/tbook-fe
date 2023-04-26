import { lazy } from "react";

const routes = [
  {
    path: "/",
    component: lazy(() => import("@/pages/incentive/PlanList")),
  },
  // {
  //   path: "/t",
  //   component: lazy(() => import("@/components/liquidfill")),
  // },
  {
    path: "/create/project",
    component: lazy(() => import("@/pages/incentive/ProjectCreate")),
  },
  {
    path: "/create/plan",
    component: lazy(() => import("@/pages/incentive/PlanCreate")),
  },
  {
    path: "/incentive/grant/:tipId/create",
    component: lazy(() => import("@/pages/grant/GrantCreate")),
  },
  {
    path: "/grants/:grantId/sign",
    component: lazy(() => import("@/pages/sign/Grant")),
  },
  {
    path: "/tokenTable",
    component: lazy(() => import("@/pages/tokenTable")),
  },
  {
    path: "/record",
    component: lazy(() => import("@/pages/record")),
  },
  {
    path: "/allocation",
    component: lazy(() => import("@/pages/allocation")),
  },
];

export default routes;
