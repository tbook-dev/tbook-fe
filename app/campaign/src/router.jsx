//https://github.com/remix-run/react-router/blob/main/examples/lazy-loading-router-provider/src/App.tsx
// 只有首页不需要登录，其他的都需要登录
import Layout from './layout/Layout'
import Home from '@/pages/home'
import TwitterCallback from '@/pages/twitter/callback'

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
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
  }
  // {
  //   path: "*",
  //   element: <NoMatch />,
  // },
]

export default routes
