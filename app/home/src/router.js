import Layout from './layout'
import Home from '@/pages/home'

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
            <Home />
        )
      },
      // {
      //   path: '/twitter/callback',
      //   async lazy () {
      //     const { default: Component } = await import(
      //       '@/pages/twitter/callback'
      //     )
      //     return { Component }
      //   }
      // },
    ]
  }
]

export default routes
