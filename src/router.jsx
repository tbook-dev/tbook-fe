import { lazy, Suspense } from "react";
import { json } from "react-router-dom";
import * as API from "@/api/incentive";
import App from "./App";
import { Spin } from "antd";
import PageNotFound from "./pages/utility/PageNotFound";

// component: lazy(() => import("@/pages/Dashboard")),

const RouterWrap = ({ Comp }) => {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center h-screen">
          <Spin />
        </div>
      }
    >
      <Comp />
    </Suspense>
  );
};

const routes = [
  {
    path: "/",
    layout: "v1",
    element: <App />,
    children: [
      {
        path: "incentive",
        element: (
          <RouterWrap Comp={lazy(() => import("@/pages/incentive/PlanList"))} />
        ),
        loader: async ({ params }) => {
          console.log("---->", params);

          // const v = await API.getIncentiveList();
          // console.log("---->", v);
          // return json(v);
          return json({ a: 1 });
        },
      },
    ],
  },

  //   {
  //     path: "/incentive",
  //     layout: "v1",
  //     component: lazy(() => import("@/pages/incentive/PlanList")),
  //     loader: async ({ params }) => {
  //       console.log("---->", params);

  //       const v = await API.getIncentiveList();
  //       console.log("---->", v);
  //       return json(v);
  //     },
  //   },
  //   {
  //     path: "/create",
  //     layout: "v1",
  //     component: lazy(() => import("@/pages/incentive/ProjectPlanCreate")),
  //   },
  //   {
  //     path: "/incentive/create",
  //     layout: "v1",
  //     component: lazy(() => import("@/pages/incentive/PlanCreate")),
  //   },
  //   {
  //     path: "/incentive/:id",
  //     layout: "v1",
  //     component: lazy(() => import("@/pages/incentive/PlanDetail")),
  //   },
  //   {
  //     path: "/incentive/grant/:tipId/create",
  //     component: lazy(() => import("@/pages/incentive/GrantCreate")),
  //   },
  //   {
  //     path: "/incentive/grant/:tipId/:grantId/detail",
  //     component: lazy(() => import("@/pages/incentive/GrantDetail")),
  //   },
  //   {
  //     path: "/incentive/grant/:tipId/:grantId/schedule",
  //     component: lazy(() => import("@/pages/incentive/GrantsSchedule")),
  //   },
  //   {
  //     path: "/grants/:grantId/sign",
  //     layout: "v2",
  //     component: lazy(() => import("@/pages/incentive/GrantSign")),
  //   },
  //   {
  //     path: "/new-project",
  //     layout: "v2",
  //     component: lazy(() => import("@/pages/CreateProject")),
  //   },
  //   {
  //     path: "/my-grants",
  //     layout: "v2",
  //     component: lazy(() => import("@/pages/incentive/PersonalProperty")),
  //   },
  //   {
  //     path: "/settings/project",
  //     component: lazy(() => import("@/pages/settings/Project")),
  //   },
  //   {
  //     path: "/settings/member",
  //     component: lazy(() => import("@/pages/settings/Member")),
  //   },
];

export default routes;
