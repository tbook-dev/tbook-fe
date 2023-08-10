//https://github.com/remix-run/react-router/blob/main/examples/lazy-loading-router-provider/src/App.tsx
// 只有首页不需要登录，其他的都需要登录
import LayoutAdmin from './layout/Layout'
import Home from '@/pages/dashboard/overview'
import NewCompaign from '@/pages/dashboard/new-campaign'
import Aboard from '@/pages/aboard'

const routes = [
  {
    path: '/',
    element: <LayoutAdmin />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'campaign',
        async lazy () {
          const { default: Campaign } = await import(
            '@/pages/dashboard/campaign'
          )
          console.log({ Campaign }, '....')
          return { Component: Campaign }
        }
      },
      {
        path: 'new-campaign',
        element: <NewCompaign />
        // lazy: () => import('@/pages/dashboard/new-campaign')
      },
      {
        path: '/campaign/:id',
        lazy: () => import('@/pages/dashboard/campaign-detail')
      },
      {
        path: '/assets',
        lazy: () => import('@/pages/dashboard/assets')
      },
      {
        path: '/twitter/callback',
        lazy: () => import('@/pages/twitter/callback')
      },
      {
        path: '/nft/deploy',
        lazy: () => import('@/pages/nft/deploy')
      },
      {
        path: '/old-login',
        lazy: () => import('@/pages/home')
      },
      {
        path: '/new-project',
        lazy: () => import('@/pages/project')
      },
      {
        path: '/nft',
        lazy: () => import('@/pages/nft')
      },
      {
        path: '/draft/:campaignId',
        lazy: () => import('@/pages/campaign')
      },
      {
        path: 'credential',
        lazy: () => import('@/pages/credential')
      },
      {
        path: 'aboard',
        element: <Aboard />
        // lazy: () => import('@/pages/aboard')
        // async lazy () {
        //   const { default: Aboard } = await import('@/pages/aboard')
        //   console.log({ Aboard }, '....')
        //   return { Component: Aboard }
        // }
      }
    ]
  }
  // {
  //   path: "*",
  //   element: <NoMatch />,
  // },
]

export default routes
