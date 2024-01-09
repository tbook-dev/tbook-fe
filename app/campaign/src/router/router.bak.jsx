import MyLayout from '@/layout/my/Layout'
import Layout from '@/layout/normal/Layout'
import HomeLayout from '@/layout/fixed/Layout'
import Home from '@/pages/home'
import App from '@/pages/app'
import Asset from '@/pages/my/Asset'
import Campaign from '@/pages/my/campaign'
import NFT from '@/pages/my/nft'
import Explore from '@/pages/explore'
import { Suspense, lazy } from 'react'
import TwitterCallback from '@/pages/twitter/callback'
import TgCallback from '@/pages/social/tg'
import DcCallback from '@/pages/social/dc'
import TwitterLoginCallback from '@/pages/twitter/login_callback'
import TwLoginIndex from '@/pages/twitter/tw_login'
import PageFallBack from '@/components/pageFallback'
import { getProjectId } from '@/api/incentive'
import queryClient from '../query-client'
import logo from '@/images/icon/logo.svg'

const Snapshot = lazy(() => import('@/pages/snapshot'))

const selfSubDomain = ['campaign-staging', 'i']
const getProjectIdFn = async ({ params }) => {
  let projectName = params.projectName
  let subDomain = null
  let isUsingSubdomain = false
  if (!projectName) {
    const host = location.hostname
    subDomain = host.split('.')?.[0]
    projectName = subDomain
    if (!selfSubDomain.includes(subDomain)) {
      isUsingSubdomain = true
    }
  }
  const defaultValues = {
    projectName: 'tbook',
    isUsingSubdomain,
    projectId: '',
    project: {
      projectName: 'tbook',
      avatarUrl: logo
    }
  }

  if (!selfSubDomain.includes(subDomain)) {
    try {
      const res = await queryClient.fetchQuery(
        ['project', projectName],
        () => getProjectId(projectName),
        {
          staleTime: Infinity,
          cacheTime: Infinity
        }
      )
      return {
        projectName,
        isUsingSubdomain,
        projectId: res?.projectId,
        project: res
      }
    } catch (e) {
      return defaultValues
    }
  } else {
    return defaultValues
  }
}

// import SocialConnect from '@/pages/social/index'

const routes = [
  {
    path: '/',
    loader: getProjectIdFn,
    element: <HomeLayout />,
    children: [
      {
        index: true,
        loader: getProjectIdFn,
        element: <Home />
      }
    ]
  },
  {
    path: '/explore',
    loader: getProjectIdFn,
    element: <Layout />,
    children: [
      {
        index: true,
        loader: getProjectIdFn,
        element: <Explore />
      }
    ]
  },
  {
    path: '/',
    element: <MyLayout />,
    loader: getProjectIdFn,
    children: [
      {
        path: ':projectName?/asset',
        loader: getProjectIdFn,
        element: <Asset />
      },
      {
        path: ':projectName?/campaign',
        loader: getProjectIdFn,
        element: <Campaign />
      },
      {
        // path: ':projectId?/campaign/:campaignId',
        path: ':projectName?/:campaignId',
        loader: getProjectIdFn,
        element: <App />
      },
      {
        path: ':projectName?/nft/:groupId/:nftId',
        loader: getProjectIdFn,
        element: <NFT />
      },
      {
        path: ':projectName?/snapshot/:campaignId/:credentialId/:snapshotId',
        loader: getProjectIdFn,
        async lazy () {
          return {
            Component: () => (
              <Suspense fallback={<PageFallBack />}>
                <Snapshot />
              </Suspense>
            )
          }
        }
      }
    ]
  },
  {
    path: '/twitter/callback',
    loader: getProjectIdFn,
    element: <MyLayout />,
    children: [
      {
        index: true,
        loader: getProjectIdFn,
        element: <TwitterCallback />
      }
    ]
  },
  {
    path: '/twitter/login/callback',
    loader: getProjectIdFn,
    element: <MyLayout />,
    children: [
      {
        index: true,
        loader: getProjectIdFn,
        element: <TwitterLoginCallback />
      }
    ]
  },
  {
    path: '/tw_login',
    loader: getProjectIdFn,
    element: <MyLayout />,
    children: [
      {
        index: true,
        loader: getProjectIdFn,
        element: <TwLoginIndex />
      }
    ]
  },
  {
    path: '/tg_callback',
    loader: getProjectIdFn,
    element: <MyLayout />,
    children: [
      {
        index: true,
        loader: getProjectIdFn,
        element: <TgCallback />
      }
    ]
  },
  {
    path: '/dc_callback',
    loader: getProjectIdFn,
    element: <MyLayout />,
    children: [
      {
        index: true,
        loader: getProjectIdFn,
        element: <DcCallback />
      }
    ]
  },
  {
    path: '*',
    element: <div className='w-full h-screen bg-black text-white'>404</div>
  }
]

export default routes
