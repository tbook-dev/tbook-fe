//https://github.com/remix-run/react-router/blob/main/examples/lazy-loading-router-provider/src/App.tsx
// 只有首页不需要登录，其他的都需要登录
import LayoutAdmin from './layout/Layout'
import Home from '@/pages/dashboard/overview'

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
          const { default: Component } = await import(
            '@/pages/dashboard/campaign'
          )
          return { Component }
        }
      },
      {
        path: 'new-campaign',
        async lazy () {
          const { default: Component } = await import(
            '@/pages/dashboard/campaign'
          )
          return { Component }
        }
      },
      {
        path: '/campaign/:id',
        // lazy: () => import('@/pages/dashboard/campaign-detail')
        async lazy () {
          const { default: Component } = await import(
            '@/pages/dashboard/campaign-detail'
          )
          return { Component }
        }
      },
      {
        path: '/assets',
        // lazy: () => import('@/pages/dashboard/assets')
        async lazy () {
          const { default: Component } = await import(
            '@/pages/dashboard/assets'
          )
          return { Component }
        }
      },
      {
        path: '/twitter/callback',
        // lazy: () => import('@/pages/twitter/callback'),
        async lazy () {
          const { default: Component } = await import(
            '@/pages/twitter/callback'
          )
          return { Component }
        }
      },
      {
        path: '/nft/deploy',
        // lazy: () => import('@/pages/nft/deploy'),
        async lazy () {
          const { default: Component } = await import('@/pages/nft/deploy')
          return { Component }
        }
      },
      {
        path: '/old-login',
        // lazy: () => import('@/pages/home'),
        async lazy () {
          const { default: Component } = await import('@/pages/home')
          return { Component }
        }
      },
      {
        path: '/new-project',
        // lazy: () => import('@/pages/project'),
        async lazy () {
          const { default: Component } = await import('@/pages/project')
          return { Component }
        }
      },
      {
        path: '/nft',
        // lazy: () => import('@/pages/nft'),
        async lazy () {
          const { default: Component } = await import('@/pages/nft')
          return { Component }
        }
      },
      {
        path: '/draft/:campaignId',
        // lazy: () => import('@/pages/campaign'),
        async lazy () {
          const { default: Component } = await import('@/pages/campaign')
          return { Component }
        }
      },
      {
        path: 'credential',
        async lazy () {
          const { default: Component } = await import('@/pages/credential')
          return { Component }
        }
      },
      {
        path: 'aboard',
        async lazy () {
          const { default: Component } = await import('@/pages/aboard')
          return { Component }
        }
      }
    ]
  }
  // {
  //   path: "*",
  //   element: <NoMatch />,
  // },
]

export default routes
