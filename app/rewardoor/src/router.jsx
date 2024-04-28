import { Component } from 'react';
import LayoutAdmin from './layout';
import LeftNavLayout from './layout/LeftNavLayout';
// import Home from '@/pages/dashboard/overview'
import Home from '@/pages/campaign/list';
import { Suspense, lazy } from 'react';
import Loading from '@/components/loading';
import WaitListLayout from '@/pages/waitlist/Layout';

const WaitListApply = lazy(() => import('@/pages/waitlist'));
const WaitListVerify = lazy(() => import('@/pages/waitlist/verify'));

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
        ),
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
              );
              return { Component };
            },
          },
          {
            path: ':id/detail',
            async lazy () {
              const { default: Component } = await import(
                '@/pages/campaign/detail'
              );
              return { Component };
            },
          },
          {
            path: ':id/update',
            async lazy () {
              const { default: Component } = await import(
                '@/pages/campaign/create'
              );
              return { Component };
            },
          },
        ],
      },
      {
        path: 'assets',
        element: <LeftNavLayout />,
        children: [
          {
            index: true,
            async lazy () {
              const { default: Component } = await import('@/pages/assets');
              return { Component };
            },
          },
          {
            path: 'nft/:nftId/:groupId',
            async lazy () {
              const { default: Component } = await import(
                '@/pages/assets/nftDetail'
              );
              return { Component };
            },
          },
        ],
      },
      {
        path: '/new-project',
        async lazy () {
          const { default: Component } = await import('@/pages/project');
          return { Component };
        },
      },
      {
        path: 'aboard',
        async lazy () {
          const { default: Component } = await import('@/pages/aboard');
          return { Component };
        },
      },
      {
        path: 'settings',
        element: <LeftNavLayout />,
        children: [
          {
            index: true,
            async lazy () {
              const { default: Component } = await import('@/pages/settings');
              return { Component };
            },
          },
        ],
      },
      {
        path: '/waitlist',
        element: <WaitListLayout />,
        children: [
          {
            path: 'apply',
            element: (
              <Suspense fallback={<Loading />}>
                <WaitListApply />
              </Suspense>
            ),
          },
          {
            path: 'verify',
            element: (
              <Suspense fallback={<Loading />}>
                <WaitListVerify />
              </Suspense>
            ),
          },
        ],
      },

      /*------------------------------------------------------------------------------------------*/

      {
        path: '/twitter/callback',
        async lazy () {
          const { default: Component } = await import(
            '@/pages/twitter/callback'
          );
          return { Component };
        },
      },
      {
        path: '/nft/deploy',
        async lazy () {
          const { default: Component } = await import('@/pages/nft/deploy');
          return { Component };
        },
      },
      {
        path: '/nft',
        async lazy () {
          const { default: Component } = await import('@/pages/nft/deploy');
          return { Component };
        },
      },
      {
        path: '/dc_callback',
        async lazy () {
          const { default: Component } = await import('@/pages/social/dc');
          return { Component };
        },
      },
      {
        path: '/tg_callback',
        async lazy () {
          const { default: Component } = await import('@/pages/social/tg');
          return { Component };
        },
      },
    ],
  },
  // {
  //   path: "*",
  //   element: <NoMatch />,
  // },
];

export default routes;
