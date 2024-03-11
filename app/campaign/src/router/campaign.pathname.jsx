import MyLayout from '@/layout/my/Layout'
import Layout from '@/layout/normal/Layout'
import HomeLayout from '@/layout/fixed/Layout'
import { Suspense, lazy } from 'react'
import PageFallBack from '@/components/pageFallback'
import { getProjectId } from '@/api/incentive'
import queryClient from '../query-client'
import logo from '@/images/icon/logo.svg'
import App from '@/pages/app'
import commonRoutes from './common'
import GlobalError from '@/components/errorBoundary/GlobalError';

const Home = lazy(() => import('@/pages/home'))
const Explore = lazy(() => import('@/pages/explore'))
const HomeV2 = lazy(() => import('@/pages/home-v2'))
const Asset = lazy(() => import('@/pages/my/Asset'))
const Campaign = lazy(() => import('@/pages/my/campaign'))
const NFT = lazy(() => import('@/pages/my/nft'))
const Snapshot = lazy(() => import('@/pages/snapshot'))

const getProjectIdFn = async ({ params }) => {
  let projectUrl = params.projectName
  const defaultValues = {
    projectUrl: 'tbook',
    isUsingSubdomain: false,
    projectId: '',
    project: {
      projectUrl,
      avatarUrl: logo
    }
  }
  if(!projectUrl){
    // official home 、explore
    return defaultValues
  }
  try {
    const res = await queryClient.fetchQuery(
      ['project', projectUrl],
      () => getProjectId(projectUrl),
      {
        staleTime: Infinity,
        cacheTime: Infinity
      }
    )
    return {
      projectUrl,
      isUsingSubdomain: false,
      projectId: res?.projectId,
      project: res
    }
  } catch (e) {
    return defaultValues
  }
}

const routes = [
  {
    path: '/',
    loader: getProjectIdFn,
    element: <HomeLayout />,
    errorElement: <GlobalError />,
    children: [
      {
        index: true,
        loader: getProjectIdFn,
        element: (
          <Suspense fallback={<PageFallBack />}>
            <Home />
          </Suspense>
        )
      }
    ]
  },
  {
    path: '/explore',
    loader: getProjectIdFn,
    element: <Layout />,
    errorElement: <GlobalError />,
    children: [
      {
        index: true,
        loader: getProjectIdFn,
        element: (
          <Suspense fallback={<PageFallBack />}>
            <Explore />
          </Suspense>
        )
      }
    ]
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
        )
      },
      {
        path: ':projectName/asset',
        loader: getProjectIdFn,
        element: (
          <Suspense fallback={<PageFallBack />}>
            <Asset />
          </Suspense>
        )
      },
      {
        path: ':projectName/campaign',
        loader: getProjectIdFn,
        element: (
          <Suspense fallback={<PageFallBack />}>
            <Campaign />
          </Suspense>
        )
      },
      {
        path: ':projectName/:campaignId',
        loader: getProjectIdFn,
        element: <App />
      },
      {
        path: ':projectName/nft/:groupId/:nftId',
        loader: getProjectIdFn,
        element: (
          <Suspense fallback={<PageFallBack />}>
            <NFT />
          </Suspense>
        )
      },
      {
        path: ':projectName/snapshot/:campaignId/:credentialId/:snapshotId',
        loader: getProjectIdFn,
        element: (
          <Suspense fallback={<PageFallBack />}>
            <Snapshot />
          </Suspense>
        )
      }
    ]
  }
]

export default [...routes, ...commonRoutes]
