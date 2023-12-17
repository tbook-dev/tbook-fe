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
const Snapshot = lazy(() => import('@/pages/snapshot'))

// import SocialConnect from '@/pages/social/index'

const routes = [
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Home />
      }
    ]
  },
  {
    path: '/explore',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Explore />
      }
    ]
  },
  {
    path: 'app',
    element: <MyLayout />,
    children: [
      {
        path: ':projectId/asset',
        element: <Asset />
      },
      {
        path: ':projectId/campaign',
        element: <Campaign />
      },
      {
        path: ':projectId/campaign/:campaignId',
        element: <App />
      },
      {
        path: ':projectId/nft/:groupId/:nftId',
        element: <NFT />
      },
      {
        path: ':projectId/snapshot/:campaignId/:credentialId/:snapshotId',
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
    element: <MyLayout />,
    children: [
      {
        index: true,
        element: <TwitterCallback />
      }
    ]
  },
  {
    path: '/twitter/login/callback',
    element: <MyLayout />,
    children: [
      {
        index: true,
        element: <TwitterLoginCallback />
      }
    ]
  },
  {
    path: '/tw_login',
    element: <MyLayout />,
    children: [
      {
        index: true,
        element: <TwLoginIndex />
      }
    ]
  },
  {
    path: '/tg_callback',
    element: <MyLayout />,
    children: [
      {
        index: true,
        element: <TgCallback />
      }
    ]
  },
  {
    path: '/dc_callback',
    element: <MyLayout />,
    children: [
      {
        index: true,
        element: <DcCallback />
      }
    ]
  },
  {
    path: '*',
    element: <div className='w-full h-screen bg-black text-t-1'>404</div>
  }
]

export default routes
