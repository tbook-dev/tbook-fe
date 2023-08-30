import ShareLayout from './layout/ShareLayout'
import Layout from './layout/Layout'
import HomeLayout from './layout/HomeLayout'
import Home from '@/pages/home'
import App from '@/pages/app'
import TwitterCallback from '@/pages/twitter/callback'
import Expore from '@/pages/expore'

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
    element: <ShareLayout />,
    children: [
      {
        path: ':campaignId',
        element: <App />
      }
    ]
  },
  {
    path: '/expore',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Expore />
      }
    ]
  },

  {
    path: '/twitter/callback',
    element: <ShareLayout />,
    children: [
      {
        index: true,
        element: <TwitterCallback />
      }
    ]
  },
  {
    path: '*',
    element: <div className='w-full h-screen bg-black text-t-1'>404</div>
  }
]

export default routes
