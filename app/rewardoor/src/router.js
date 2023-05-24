import { lazy } from 'react'

const routes = [
  {
    path: '/',
    component: lazy(() => import('@/pages/home'))
  },
  {
    path: '/new-project',
    component: lazy(() => import('@/pages/project'))
  },
  {
    path: '/nft',
    component: lazy(() => import('@/pages/nft'))
  }
]

export default routes
