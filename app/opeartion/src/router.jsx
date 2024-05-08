import LayoutAdmin from './layout';
import LeftNavLayout from './layout/LeftNavLayout';
import Home from '@/pages/home-TMA';

const routes = [
  {
    path: '/',
    element: <LayoutAdmin />,
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
        path: 'aboard',
        async lazy () {
          const { default: Component } = await import('@/pages/aboard');
          return { Component };
        },
      },
    ],
  },
];

export default routes;
