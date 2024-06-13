import MyLayout from '@/layout/my/Layout';
import TMALayout from '@/layout/ton/Layout';
import HomeLayout from '@/layout/fixed/Layout';
import { Suspense, lazy } from 'react';
import PageFallBack from '@/components/pageFallback';
import { getProjectId } from '@/api/incentive';
import queryClient from '../query-client';
import App from '@/pages/app';
import commonRoutes from './common';
import GlobalError from '@/components/errorBoundary/GlobalError';
import { keptProjectUrls, defaultProjectInfo } from './conf';

const Home = lazy(() => import('@/pages/home'));
// const Explore = lazy(() => import('@/pages/explore'));
const HomeV2 = lazy(() => import('@/pages/home-v2'));
const Asset = lazy(() => import('@/pages/my/Asset'));
const Campaign = lazy(() => import('@/pages/my/campaign'));
const NFT = lazy(() => import('@/pages/my/nft'));
const Snapshot = lazy(() => import('@/pages/snapshot'));
const TonExplore = lazy(() => import('@/pages/ton-explore'));
const WiseScore = lazy(() => import('@/pages/ton-wise/wise-score'));
const WiseLeaderboard = lazy(() => import('@/pages/ton-wise/wise-leaderboard'));
const Renaissance = lazy(() => import('@/pages/renaissance'));
const Attestation = lazy(() => import('@/pages/attestation'));

const getTbookfn = async () => {
  return defaultProjectInfo;
};
const getProjectIdFn = async ({ params }) => {
  let projectUrl = params.projectName;

  if (!projectUrl && keptProjectUrls.includes(projectUrl)) {
    return defaultProjectInfo;
  }
  try {
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
      isUsingSubdomain: false,
      projectId: res?.projectId,
      project: res,
    };
  } catch (e) {
    return defaultProjectInfo;
  }
};

const routes = [
  {
    path: '/',
    loader: getTbookfn,
    element: <HomeLayout />,
    errorElement: <GlobalError />,
    children: [
      {
        index: true,
        loader: getTbookfn,
        element: (
          <Suspense fallback={<PageFallBack />}>
            <Home />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '/ton-explore',
    loader: getTbookfn,
    element: (
      <Suspense fallback={<PageFallBack />}>
        <TonExplore />
      </Suspense>
    ),
    errorElement: <GlobalError />,
  },
  {
    path: '/wise-score',
    loader: getTbookfn,
    element: (
      <Suspense fallback={<PageFallBack />}>
        <WiseScore />
      </Suspense>
    ),
    errorElement: <GlobalError />,
  },
  {
    path: '/wise-leaderboard',
    loader: getTbookfn,
    element: (
      <Suspense fallback={<PageFallBack />}>
        <WiseLeaderboard />
      </Suspense>
    ),
    errorElement: <GlobalError />,
  },
  {
    path: '/event',
    loader: getTbookfn,
    element: <TMALayout layout />,
    children: [
      {
        path: 'renaissance',
        loader: getTbookfn,
        element: (
          <Suspense fallback={<PageFallBack />}>
            <Renaissance />
          </Suspense>
        ),
      },
    ],
    errorElement: <GlobalError />,
  },
  {
    path: '/',
    element: <MyLayout />,
    loader: getProjectIdFn,
    errorElement: <GlobalError />,
    children: [
      {
        path: ':projectName',
        loader: getProjectIdFn,
        element: (
          <Suspense fallback={<PageFallBack />}>
            {/* <ErrorBoundary fallbackComponent={<GlobalError/>}> */}
            <HomeV2 />
            {/* </ErrorBoundary> */}
          </Suspense>
        ),
      },
      {
        path: ':projectName/asset',
        loader: getProjectIdFn,
        element: (
          <Suspense fallback={<PageFallBack />}>
            <Asset />
          </Suspense>
        ),
      },
      {
        path: ':projectName/campaign',
        loader: getProjectIdFn,
        element: (
          <Suspense fallback={<PageFallBack />}>
            <Campaign />
          </Suspense>
        ),
      },
      {
        path: ':projectName/:campaignId',
        loader: getProjectIdFn,
        element: <App />,
      },
      {
        path: ':projectName/nft/:groupId/:nftId',
        loader: getProjectIdFn,
        element: (
          <Suspense fallback={<PageFallBack />}>
            <NFT />
          </Suspense>
        ),
      },
      {
        path: ':projectName/snapshot/:campaignId/:credentialId/:snapshotId',
        loader: getProjectIdFn,
        element: (
          <Suspense fallback={<PageFallBack />}>
            <Snapshot />
          </Suspense>
        ),
      },
      {
        path: ':projectName/edit-attestation',
        element: (
          <Suspense fallback={<PageFallBack />}>
            <Attestation />
          </Suspense>
        ),
      },
    ],
  },
];

export default [...routes, ...commonRoutes];
