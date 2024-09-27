import React from 'react';
import { useLoaderData } from 'react-router-dom';
import MyLayout from '@/layout/my/Layout';
import TMALayout from '@/layout/ton/Layout';
import HomeLayout from '@/layout/fixed/Layout';
import { Suspense, lazy } from 'react';
import PageFallBack from '@/components/pageFallback';
import { getProjectId, getCompanyProjects } from '@/api/incentive';
import queryClient from '../query-client';

import commonRoutes from './common';
import GlobalError from '@/components/errorBoundary/GlobalError';
import TonExplore from '@/pages/ton-explore';

import CompanyHome from '@/pages/company/Home';
import CompanyLeaderboard from '@/pages/company/Leaderboard';
import CompanyAbout from '@/pages/company/About';

import CompanyAsset from '@/pages/company/Asset';

import CompanyProjects from '@/pages/company/ProjectList';

import { keptProjectUrls, defaultProjectInfo } from './conf';

const App = lazy(() => import('@/pages/app'));
const AppV3 = lazy(() => import('@/pages/app-v3'));

const HomeV2 = lazy(() => import('@/pages/home-v2'));
const HomeV3 = lazy(() => import('@/pages/home-v3'));

const Home = lazy(() => import('@/pages/home'));
const Asset = lazy(() => import('@/pages/my/Asset'));
const Campaign = lazy(() => import('@/pages/my/campaign'));
const NFT = lazy(() => import('@/pages/my/nft'));
const Snapshot = lazy(() => import('@/pages/snapshot'));
const WiseCredit = lazy(() => import('@/pages/ton-wise'));
const ScoreDetail = lazy(() => import('@/pages/ton-wise/detail'));
const WiseLeaderboard = lazy(() => import('@/pages/ton-wise/leaderboard'));
const WiseInvite = lazy(() => import('@/pages/ton-wise/invite'));
const InviteBy = lazy(() => import('@/pages/ton-wise/inviteBy'));
const WiseJoin = lazy(() => import('@/pages/ton-wise/join'));
const Renaissance = lazy(() => import('@/pages/renaissance'));
const RenaissanceDetail = lazy(() => import('@/pages/renaissance/detail'));
const Boost = lazy(() => import('@/pages/renaissance/boost'));
const Earn = lazy(() => import('@/pages/renaissance/earn'));
const Abtain = lazy(() => import('@/pages/ton-wise/coin/abtain'));
const Ranger = lazy(() => import('@/pages/ton-wise/coin/ranger'));
const SBT = lazy(() => import('@/pages/ton-wise/sbt'));
const SBTDetail = lazy(() => import('@/pages/ton-wise/sbt-detail'));
const AmbassadorApply = lazy(() => import('@/pages/ton-wise/ambassador-apply'));
const Ambassador = lazy(() => import('@/pages/ton-wise/ambassador'));
const Attestation = lazy(() => import('@/pages/attestation'));
const AirDrop = lazy(() => import('@/pages/airdrop'));

const DeFiGuide = lazy(() => import('@/pages/defi/guide'));

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
    const theme = res?.theme || 0;
    return {
      // mock 
      companyId: res.companyId || 1,
      companyName: res?.companyName || 'GameBuild',
      projectUrl,
      isUsingSubdomain: false,
      projectId: res?.projectId,
      project: res,
      isLightTheme: theme === 1,
    };
  } catch (e) {
    return defaultProjectInfo;
  }
};
const getCompanyIdFn = async ({ params }) => {
  let companyId = params.companyId;

  // if (!companyId && keptProjectUrls.includes(projectUrl)) {
  //   return defaultProjectInfo;
  // }
  try {
    const res = await queryClient.fetchQuery(
      [ 'company-projects', companyId ],
      () => getCompanyProjects(companyId),
      {
        staleTime: Infinity,
        cacheTime: Infinity,
      }
    );
    // const theme = res?.theme || 0;
    console.log('res', res)
    const { company } = res?.data || {};
    if (company?.companyId)  {
      return {
        // mock 
        companyId: company?.companyId || 0,
        companyName: company?.companyName,
        isLightTheme: company?.companyId > 0
      };
    } return {

    }
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
        element: (
          <Suspense fallback={<PageFallBack />}>
            <WiseCredit />
          </Suspense>
        ),
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
        path: 'invite',
        loader: getTbookfn,
        element: (
          <Suspense fallback={<PageFallBack />}>
            <WiseInvite />
          </Suspense>
        ),
      },
      {
        path: 'join',
        loader: getTbookfn,
        element: (
          <Suspense fallback={<PageFallBack />}>
            <WiseJoin />
          </Suspense>
        ),
      },
      {
        path: 'inviteBy',
        loader: getTbookfn,
        element: (
          <Suspense fallback={<PageFallBack />}>
            <InviteBy />
          </Suspense>
        ),
      },
      {
        path: 'ambassador',
        loader: getTbookfn,
        element: (
          <Suspense fallback={<PageFallBack />}>
            <Ambassador />
          </Suspense>
        ),
      },
      {
        path: 'ambassador-apply',
        loader: getTbookfn,
        element: (
          <Suspense fallback={<PageFallBack />}>
            <AmbassadorApply />
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
      {
        path: 'defi',
        loader: getTbookfn,
        element: (
          <Suspense fallback={<PageFallBack />}>
            <DeFiGuide />
          </Suspense>
        ),
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
        element: React.createElement(() => {
          const { isLightTheme } = useLoaderData();
          return (
            <Suspense fallback={<PageFallBack />}>
              {isLightTheme ? <HomeV3 /> : <HomeV2 />}
            </Suspense>
          );
        }),
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
        element: React.createElement(() => {
          const { isLightTheme } = useLoaderData();
          return (
            <Suspense fallback={<PageFallBack />}>
              {isLightTheme ? <AppV3 /> : <App />}
            </Suspense>
          );
        }),
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
        path: ':projectName/air-drop',
        element: (
          <Suspense fallback={<PageFallBack />}>
            <AirDrop />
          </Suspense>
        ),
        errorElement: <GlobalError />,
      },
    ],
  },
  // company homepage
  {
    path: '/company/:companyId',
    loader: getCompanyIdFn,
    element: (
      <Suspense fallback={ <PageFallBack /> }>
        <CompanyHome />
      </Suspense>
    ),
    errorElement: <GlobalError />,
  },
  // company leaderBoard
  {
    path: '/company/:companyId/leaderboard',
    loader: getCompanyIdFn,
    element: (
      <Suspense fallback={ <PageFallBack /> }>
        <CompanyLeaderboard />
      </Suspense>
    ),
    errorElement: <GlobalError />,
  },
  // company project list
  // {
  //   path: '/company/:companyId/projects',
  //   loader: getTbookfn,
  //   element: (
  //     <Suspense fallback={ <PageFallBack /> }>
  //       <CompanyProjects />
  //     </Suspense>
  //   ),
  //   errorElement: <GlobalError />,
  // },
  // company about page
  {
    path: '/company/:companyId/about',
    loader: getTbookfn,
    element: (
      <Suspense fallback={ <PageFallBack /> }>
        <CompanyAbout />
      </Suspense>
    ),
  },
  {
    path: '/company/:companyId/asset',
    loader: getCompanyIdFn,
    element: (
      <Suspense fallback={ <PageFallBack /> }>
        <CompanyAsset />
      </Suspense>
    ),
  },
];

export default [...routes, ...commonRoutes];
