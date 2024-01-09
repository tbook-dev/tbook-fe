import MyLayout from "@/layout/my/Layout";
import logo from "@/images/icon/logo.svg";
import { isUsingSubdomain } from "@/utils/common";
import PageFallBack from "@/components/pageFallback";
import { Suspense, lazy } from "react";


const TwitterCallback = lazy(() => import("@/pages/twitter/callback"));
const TgCallback = lazy(() => import("@/pages/social/tg"));
const DcCallback = lazy(() => import("@/pages/social/dc"));
const TwitterLoginCallback = lazy(() =>
  import("@/pages/twitter/login_callback")
);
const TwLoginIndex = lazy(() => import("@/pages/twitter/tw_login"));

const getProjectIdFn = async () => {
  return {
    projectName: "tbook",
    isUsingSubdomain,
    projectId: "",
    project: {
      projectName: "tbook",
      avatarUrl: logo,
    },
  };
};

// import SocialConnect from '@/pages/social/index'

const routes = [
  {
    path: "/twitter/callback",
    loader: getProjectIdFn,
    element: <MyLayout />,
    children: [
      {
        index: true,
        loader: getProjectIdFn,
        element: (
          <Suspense fallback={<PageFallBack />}>
            <TwitterCallback />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/twitter/login/callback",
    loader: getProjectIdFn,
    element: <MyLayout />,
    children: [
      {
        index: true,
        loader: getProjectIdFn,
        element: (
          <Suspense fallback={<PageFallBack />}>
            <TwitterLoginCallback />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/tw_login",
    loader: getProjectIdFn,
    element: <MyLayout />,
    children: [
      {
        index: true,
        loader: getProjectIdFn,
        element: (
          <Suspense fallback={<PageFallBack />}>
            <TwLoginIndex />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/tg_callback",
    loader: getProjectIdFn,
    element: <MyLayout />,
    children: [
      {
        index: true,
        loader: getProjectIdFn,
        element: (
          <Suspense fallback={<PageFallBack />}>
            <TgCallback />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/dc_callback",
    loader: getProjectIdFn,
    element: <MyLayout />,
    children: [
      {
        index: true,
        loader: getProjectIdFn,
        element: (
          <Suspense fallback={<PageFallBack />}>
            <DcCallback />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <div className="w-full h-screen bg-black text-white">404</div>,
  },
];

export default routes;
