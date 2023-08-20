import Layout from './layout/Layout'
import Home from '@/pages/home'
import TwitterCallback from '@/pages/twitter/callback'

const routes = [
  {
    path: 'app',
    element: <Layout />,
    children: [
      {
        path: ":campaignId",
        element: <Home />
      }
    ]
  },
  {
    path: '/twitter/callback',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <TwitterCallback />
      }
    ]
  },
  {
    path: "*",
    element: <div className='w-full h-screen bg-black text-t-1'>404</div>,
  },
]

export default routes
