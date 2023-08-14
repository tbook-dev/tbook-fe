import LayoutAdmin from './layout/Layout'
import LeftNavLayout from './layout/LeftNavLayout'
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
        element: <LeftNavLayout />,
        children: [
          {
            index: true,
            async lazy () {
              const { default: Component } = await import(
                '@/pages/dashboard/campaign'
              )
              return { Component }
            }
          },
          {
            path: 'new',
            async lazy () {
              const { default: Component } = await import(
                '@/pages/dashboard/new-campaign'
              )
              return { Component }
            }
          },
          {
            path: ':id',
            // lazy: () => import('@/pages/dashboard/campaign-detail')
            async lazy () {
              const { default: Component } = await import(
                '@/pages/dashboard/campaign-detail'
              )
              return { Component }
            }
          },
          {
            path: ':id/edit',
            async lazy () {
              const { default: Component } = await import(
                '@/pages/dashboard/new-campaign'
              )
              return { Component }
            }
          }
        ]
      },
      {
        path: 'assets',
        element: <LeftNavLayout />,
        children: [
          {
            index: true,
            async lazy () {
              const { default: Component } = await import(
                '@/pages/dashboard/assets'
              )
              return { Component }
            }
          }
        ]
      },
      {
        path: '/new-project',
        async lazy () {
          const { default: Component } = await import('@/pages/project')
          return { Component }
        }
      },
      {
        path: 'aboard',
        async lazy () {
          const { default: Component } = await import('@/pages/aboard')
          return { Component }
        }
      },

      /*------------------------------------------------------------------------------------------*/

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
        path: '/nft',
        // lazy: () => import('@/pages/nft'),
        async lazy () {
          const { default: Component } = await import('@/pages/nft')
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
