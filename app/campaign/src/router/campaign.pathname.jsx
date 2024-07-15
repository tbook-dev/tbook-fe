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
import TonExplore from '@/pages/ton-explore';
import { keptProjectUrls, defaultProjectInfo } from './conf';

const Home = lazy(() => import('@/pages/home'));
const HomeV2 = lazy(() => import('@/pages/home-v2'));
const Asset = lazy(() => import('@/pages/my/Asset'));
const Campaign = lazy(() => import('@/pages/my/campaign'));
const NFT = lazy(() => import('@/pages/my/nft'));
const Snapshot = lazy(() => import('@/pages/snapshot'));
// const TonExplore = lazy(() => import('@/pages/ton-explore'));
const WiseCredit = lazy(() => import('@/pages/ton-wise'));
const ScoreDetail = lazy(() => import('@/pages/ton-wise/wise-score'));
const WiseLeaderboard = lazy(() => import('@/pages/ton-wise/wise-leaderboard'));
const Renaissance = lazy(() => import('@/pages/renaissance'));
const RenaissanceDetail = lazy(() => import('@/pages/renaissance/detail'));
const Boost = lazy(() => import('@/pages/renaissance/boost'));
const Earn = lazy(() => import('@/pages/renaissance/earn'));
const Abtain = lazy(() => import('@/pages/ton-wise/coin/abtain'));
const Ranger = lazy(() => import('@/pages/ton-wise/coin/ranger'));
const SBT = lazy(() => import('@/pages/ton-wise/sbt'));
const SBTDetail = lazy(() => import('@/pages/ton-wise/sbt'));

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
      {
        path: 'edit-attestation',
        loader: getTbookfn,
        element: (
          <Suspense fallback={<PageFallBack />}>
            <Attestation />
          </Suspense>
        ),
        errorElement: <GlobalError />,
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
    element: <TMALayout layout />,
    children: [
      {
        index: true,
        loader: getTbookfn,
        // element: (
        //   <Suspense fallback={<PageFallBack />}>
        //     <WiseCredit />
        //   </Suspense>
        // ),
        element: <WiseCredit />,
      },
      {
        path: 'detail',
        loader: getTbookfn,
        element: (
          <Suspense fallback={<PageFallBack />}>
            <ScoreDetail />
          </Suspense>
        ),
      },
      {
        path: 'leaderboard',
        loader: getTbookfn,
        element: (
          <Suspense fallback={<PageFallBack />}>
            <WiseLeaderboard />
          </Suspense>
        ),
      },
      {
        path: 'identity/:type/abtain',
        loader: getTbookfn,
        element: (
          <Suspense fallback={<PageFallBack />}>
            <Abtain />
          </Suspense>
        ),
      },
      {
        path: 'identity/:type/ranger',
        loader: getTbookfn,
        element: (
          <Suspense fallback={<PageFallBack />}>
            <Ranger />
          </Suspense>
        ),
      },
      {
        path: 'sbt',
        loader: getTbookfn,
        element: (
          <Suspense fallback={<PageFallBack />}>
            <SBT />
          </Suspense>
        ),
      },
      {
        path: 'sbt/:type',
        loader: getTbookfn,
        element: (
          <Suspense fallback={<PageFallBack />}>
            <SBTDetail />
          </Suspense>
        ),
      },
    ],
    errorElement: <GlobalError />,
  },
  {
    path: '/event',
    loader: getTbookfn,
    element: <TMALayout layout />,
    errorElement: <GlobalError />,
    children: [
      {
        path: 'renaissance',
        loader: getTbookfn,
        children: [
          {
            index: true,
            loader: getTbookfn,
            element: (
              <Suspense fallback={<PageFallBack />}>
                <Renaissance />
              </Suspense>
            ),
          },
          {
            path: 'detail',
            loader: getTbookfn,
            element: (
              <Suspense fallback={<PageFallBack />}>
                <RenaissanceDetail />
              </Suspense>
            ),
          },
          {
            path: 'boost',
            loader: getTbookfn,
            element: (
              <Suspense fallback={<PageFallBack />}>
                <Boost />
              </Suspense>
            ),
          },
          {
            path: 'earn',
            loader: getTbookfn,
            element: (
              <Suspense fallback={<PageFallBack />}>
                <Earn />
              </Suspense>
            ),
          },
        ],
      },
    ],
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
    ],
  },
];

export default [...routes, ...commonRoutes];
