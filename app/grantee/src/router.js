import { lazy } from "react";

const routes =[
    {
        path: '/',
        component: lazy(() => import('@/pages/list'))
    }
]

export default routes;
