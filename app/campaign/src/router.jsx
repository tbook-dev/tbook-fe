//https://github.com/remix-run/react-router/blob/main/examples/lazy-loading-router-provider/src/App.tsx
// 只有首页不需要登录，其他的都需要登录
import LayoutAdmin from './layout/Layout'
import Home from '@/pages/home'

const routes = [
  {
    path: '/',
    element: <LayoutAdmin />,
    children: [
      {
        index: true,
        element: <Home />
      }
    ]
  }
  // {
  //   path: "*",
  //   element: <NoMatch />,
  // },
]

export default routes
