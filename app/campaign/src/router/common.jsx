import MyLayout from '@/layout/my/Layout';
import { isUsingSubdomain } from '@/utils/common';
import PageFallBack from '@/components/pageFallback';
import { Suspense, lazy } from 'react';
import queryClient from '../query-client';
import { getProjectId } from '@/api/incentive';
import GlobalError from '@/components/errorBoundary/GlobalError';
import { defaultProjectInfo } from './conf';

const TwitterCallback = lazy(() => import('@/pages/twitter/callback'));
const TgCallback = lazy(() => import('@/pages/social/tg'));
const DcCallback = lazy(() => import('@/pages/social/dc'));
const TwitterLoginCallback = lazy(() =>
  import('@/pages/twitter/login_callback')
);
const TwLoginIndex = lazy(() => import('@/pages/twitter/tw_login'));
// const ZkLoginIndex = lazy(() => import("@/pages/zklogin/zk_login"));
const ZkLoginCallback = lazy(() => import('@/pages/zklogin/zk_login_callback'));
const ZkLoginEnoki = lazy(() => import('@/pages/zklogin/zk_login_with_enoki'));
const Page404 = lazy(() => import('@/pages/404'));

const getProjectIdFn = async () => {
  if (isUsingSubdomain) {
    try {
      const host = location.hostname;
      const subDomain = host.split('.')?.[0];
      const projectUrl = subDomain;
      const res = await queryClient.fetchQuery(
        ['project', projectUrl],
        () => getProjectId(projectUrl),
        {
          staleTime: Infinity,
          cacheTime: Infinity,
        }
      );
      return {
        projectUrl,
        isUsingSubdomain: true,
        projectId: res?.projectId,
        project: res,
      };
    } catch (error) {
      return defaultProjectInfo;
    }
  } else {
    return defaultProjectInfo;
  }
};

// import SocialConnect from '@/pages/social/index'

const routes = [
  {
    path: '/twitter/callback',
    loader: getProjectIdFn,
    element: <MyLayout />,
    errorElement: <GlobalError />,
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
    path: '/twitter/login/callback',
    loader: getProjectIdFn,
    element: <MyLayout />,
    errorElement: <GlobalError />,
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
    path: '/tw_login',
    loader: getProjectIdFn,
    element: <MyLayout />,
    errorElement: <GlobalError />,
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
    path: '/tg_callback',
    loader: getProjectIdFn,
    element: <MyLayout />,
    errorElement: <GlobalError />,
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
    path: '/dc_callback',
    loader: getProjectIdFn,
    element: <MyLayout />,
    errorElement: <GlobalError />,
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
    path: '/zklogin',
    loader: getProjectIdFn,
    element: <MyLayout />,
    errorElement: <GlobalError />,
    children: [
      {
        index: true,
        loader: getProjectIdFn,
        element: (
          <Suspense fallback={<PageFallBack />}>
            <ZkLoginEnoki />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '/zklogin/callback',
    loader: getProjectIdFn,
    element: <MyLayout />,
    errorElement: <GlobalError />,
    children: [
      {
        index: true,
        loader: getProjectIdFn,
        element: (
          <Suspense fallback={<PageFallBack />}>
            <ZkLoginCallback />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<PageFallBack />}>
        <Page404 />
      </Suspense>
    ),
  },
  {
    path: '/404',
    element: (
      <Suspense fallback={<PageFallBack />}>
        <Page404 />
      </Suspense>
    ),
  },
  // {
  //   path: "/test-error/500",
  //   element: <RandomError />,
  //   errorElement: <GlobalError />,
  // },
];
export default routes;
