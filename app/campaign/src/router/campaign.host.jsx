import MyLayout from "@/layout/my/Layout";
import { Suspense, lazy } from "react";
import PageFallBack from "@/components/pageFallback";
import { getProjectId } from "@/api/incentive";
import queryClient from "../query-client";
import logo from "@/images/icon/logo.svg";
import App from "@/pages/app";
import commonRoutes from "./common";

const HomeV2 = lazy(() => import("@/pages/home-v2"));
const Snapshot = lazy(() => import("@/pages/snapshot"));
const Asset = lazy(() => import("@/pages/my/Asset"));
const Campaign = lazy(() => import("@/pages/my/campaign"));
const NFT = lazy(() => import("@/pages/my/nft"));

const getProjectIdFn = async () => {
  const host = location.hostname;
  const subDomain = host.split(".")?.[0];
  const projectName = subDomain;

  const defaultValues = {
    projectName,
    isUsingSubdomain: true,
    projectId: "",
    project: {
      projectName: projectName,
      avatarUrl: logo,
    },
  };

  try {
    const res = await queryClient.fetchQuery(
      ["project", projectName],
      () => getProjectId(projectName),
      {
        staleTime: Infinity,
        cacheTime: Infinity,
      }
    );
    return {
      projectName,
      isUsingSubdomain,
      projectId: res?.projectId,
      project: res,
    };
  } catch (e) {
    return defaultValues;
  }
};

const routes = [
  {
    path: "/",
    element: <MyLayout />,
    loader: getProjectIdFn,
    children: [
      {
        index: true,
        loader: getProjectIdFn,
        element: (
          <Suspense fallback={<PageFallBack />}>
            <HomeV2 />
          </Suspense>
        ),
      },
      {
        path: "/asset",
        loader: getProjectIdFn,
        element: (
          <Suspense fallback={<PageFallBack />}>
            <Asset />
          </Suspense>
        ),
      },
      {
        path: "/campaign",
        loader: getProjectIdFn,
        element: (
          <Suspense fallback={<PageFallBack />}>
            <Campaign />
          </Suspense>
        ),
      },
      {
        // path: ':projectId?/campaign/:campaignId',
        path: "/:campaignId",
        loader: getProjectIdFn,
        element: <App />,
      },
      {
        path: "/nft/:groupId/:nftId",
        loader: getProjectIdFn,
        element: (
          <Suspense fallback={<PageFallBack />}>
            <NFT />
          </Suspense>
        ),
      },
      {
        path: "/snapshot/:campaignId/:credentialId/:snapshotId",
        loader: getProjectIdFn,
        element: (
          <Suspense fallback={<PageFallBack />}>
            <Snapshot />
          </Suspense>
        ),
      },
    ],
  },
];

export default [...routes, ...commonRoutes];
