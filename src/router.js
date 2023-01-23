import { lazy } from "react";

const routes =[
    {
        path: '/',
        component: lazy(() => import('@/pages/Dashboard'))
    },
    {
        path: '/incentive',
        component: lazy(() => import('@/pages/incentive/PlanList'))
    },
    {
        path: '/create',
        component: lazy(() => import('@/pages/incentive/ProjectPlanCreate'))
    },
    {
        path: '/incentive/create',
        component: lazy(() => import('@/pages/incentive/PlanCreate'))
    },
    {
        path: '/incentive/:id',
        component: lazy(() => import('@/pages/incentive/PlanDetail'))
    },
    {
        path: '/incentive/grant/:tipId/create',
        component: lazy(() => import('@/pages/incentive/GrantCreate'))
    },
    {
        path: '/incentive/grant/:tipId/:grantId/detail',
        component: lazy(() => import('@/pages/incentive/GrantDetail'))
    },
    {
        path: '/incentive/grant/:tipId/:grantId/schedule',
        component: lazy(() => import('@/pages/incentive/GrantsSchedule'))
    },
    {
        path: '/grants/:grantId/sign',
        component: lazy(() => import('@/pages/incentive/GrantSign'))
    },
    {
        path: '/new-project',
        component: lazy(() => import('@/pages/CreateProject'))
    },
    {
        path: '/my-grants',
        component: lazy(() => import('@/pages/incentive/PersonalProperty'))
    },
    {
        path: '/settings/project',
        component: lazy(() => import('@/pages/settings/Project'))
    },
    {
        path: '/settings/member',
        component: lazy(() => import('@/pages/settings/Member'))
    },
    
]

export default routes;
