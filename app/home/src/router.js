import { lazy } from "react";

const routes = [
  {
    path: "/",
    component: lazy(() => import("@/pages/home")),
  },
  {
    path: "/about",
    component: lazy(() => import("@/pages/about")),
  },
  {
    path: "/solution",
    component: lazy(() => import("@/pages/solution")),
  },
];

export default routes;
