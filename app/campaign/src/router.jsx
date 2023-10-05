import MyLayout from './layout/MyLayout'
import Layout from './layout/Layout'
import HomeLayout from './layout/HomeLayout'
import Home from '@/pages/home'
import App from '@/pages/app'
import My from '@/pages/my'
import NFT from '@/pages/my/nft'
import Explore from '@/pages/explore'

import TwitterCallback from '@/pages/twitter/callback'
import TgCallback from '@/pages/social/tg'
import DcCallback from '@/pages/social/dc'
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
    path: 'app',
    element: <MyLayout />,
    children: [
      {
        path: ':projectId',
        element: <My />
      },
      {
        path: ':projectId/:campaignId',
        element: <App />
      },
      {
        path: ':projectId/nft/:groupId/:nftId',
        element: <NFT />
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
