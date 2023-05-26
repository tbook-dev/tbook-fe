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
  },
  {
    path: '/campain',
    component: lazy(() => import('@/pages/campain'))
  },
  {
    path: '/dashboard/campain/:id',
    component: lazy(() => import('@/pages/dashboard/campaign'))
  }
]

export default routes
