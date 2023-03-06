import { lazy } from "react";

const routes =[
    {
        path: '/',
        component: lazy(() => import('@/pages/list'))
    },
    {
        path: '/grants/:grantId/sign',
        component: lazy(() => import('@/pages/sign/Grant'))
    },
]

export default routes;
