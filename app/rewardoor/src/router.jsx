import LayoutAdmin from './layout/Layout'
import LeftNavLayout from './layout/LeftNavLayout'
// import Home from '@/pages/dashboard/overview'
import Home from '@/pages/campaign/list'

const routes = [
  {
    path: '/',
    element: <LayoutAdmin />,
    // loader: async () => {
    //   return null
    // },
    children: [
      {
        index: true,
        element: (
          <LeftNavLayout>
            <Home />
          </LeftNavLayout>
        )
      },
      {
        path: 'campaign',
        element: <LeftNavLayout />,
        children: [
          // {
          //   index: true,
          //   async lazy () {
          //     const { default: Component } = await import(
          //       '@/pages/campaign/list'
          //     )
          //     return { Component }
          //   }
          // },
          {
            path: 'new',
            async lazy () {
              const { default: Component } = await import(
                '@/pages/campaign/create'
              )
              return { Component }
            }
          },
          {
            path: ':id/detail',
            async lazy () {
              const { default: Component } = await import(
                '@/pages/campaign/detail'
              )
              return { Component }
            }
          },
          {
            path: ':id/edit',
            async lazy () {
              const { default: Component } = await import(
                '@/pages/campaign/create'
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
              const { default: Component } = await import('@/pages/assets')
              return { Component }
            }
          },
          {
            path: 'nft/:nftId',
            async lazy () {
              const { default: Component } = await import(
                '@/pages/assets/nftDetail'
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
      {
        path: 'settings',
        element: <LeftNavLayout />,
        children: [
          {
            index: true,
            async lazy () {
              const { default: Component } = await import('@/pages/settings')
              return { Component }
            }
          }
        ]
      },
      /*------------------------------------------------------------------------------------------*/

      {
        path: '/twitter/callback',
        async lazy () {
          const { default: Component } = await import(
            '@/pages/twitter/callback'
          )
          return { Component }
        }
      },
      {
        path: '/nft/deploy',
        async lazy () {
          const { default: Component } = await import('@/pages/nft/deploy')
          return { Component }
        }
      },
      {
        path: '/old-login',
        async lazy () {
          const { default: Component } = await import('@/pages/home')
          return { Component }
        }
      },
      {
        path: '/nft',
        async lazy () {
          const { default: Component } = await import('@/pages/nft/deploy')
          return { Component }
        }
      },
      {
        path: '/dc_callback',
        async lazy () {
          const { default: Component } = await import('@/pages/social/dc')
          return { Component }
        }
      },
      {
        path: '/tg_callback',
        async lazy () {
          const { default: Component } = await import('@/pages/social/tg')
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
