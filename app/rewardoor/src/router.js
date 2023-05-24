import { lazy } from 'react'

const routes = [
  {
    path: '/',
    component: lazy(() => import('@/pages/home'))
  }
]

export default routes
