import MyLayout from '@/layout/my/Layout'
import logo from '@/images/icon/logo.svg'
import { isUsingSubdomain } from '@/utils/common'
import PageFallBack from '@/components/pageFallback'
import { Suspense, lazy } from 'react'
import queryClient from '../query-client'
import { getProjectId } from '@/api/incentive'

const TwitterCallback = lazy(() => import('@/pages/twitter/callback'))
const TgCallback = lazy(() => import('@/pages/social/tg'))
const DcCallback = lazy(() => import('@/pages/social/dc'))
const TwitterLoginCallback = lazy(() =>
  import('@/pages/twitter/login_callback')
)
const TwLoginIndex = lazy(() => import('@/pages/twitter/tw_login'))
const ZkLoginIndex = lazy(() => import("@/pages/zklogin/zk_login"));
const ZkLoginCallback = lazy(() => import("@/pages/zklogin/zk_login_callback"));
const ZkLoginEnoki = lazy(() => import("@/pages/zklogin/zk_login_with_enoki"));

const getProjectIdFn = async () => {
  const defaultValues = {
    projectUrl: 'tbook',
    isUsingSubdomain,
    projectId: '',
    project: {
      projectUrl: 'tbook',
      avatarUrl: logo
    }
  }

  if (isUsingSubdomain) {
    try {
      const host = location.hostname
      const subDomain = host.split('.')?.[0]
      const projectUrl = subDomain
      const res = await queryClient.fetchQuery(
        ['project', projectUrl],
        () => getProjectId(projectUrl),
        {
          staleTime: Infinity,
          cacheTime: Infinity
        }
      )
      return {
        projectUrl,
        isUsingSubdomain: true,
        projectId: res?.projectId,
        project: res
      }
    } catch (error) {
      return defaultValues
    }
  } else {
    return defaultValues
  }
}

// import SocialConnect from '@/pages/social/index'

const routes = [
  {
    path: '/twitter/callback',
    loader: getProjectIdFn,
    element: <MyLayout />,
    children: [
      {
        index: true,
        loader: getProjectIdFn,
        element: (
          <Suspense fallback={<PageFallBack />}>
            <TwitterCallback />
          </Suspense>
        )
      }
    ]
  },
  {
    path: '/twitter/login/callback',
    loader: getProjectIdFn,
    element: <MyLayout />,
    children: [
      {
        index: true,
        loader: getProjectIdFn,
        element: (
          <Suspense fallback={<PageFallBack />}>
            <TwitterLoginCallback />
          </Suspense>
        )
      }
    ]
  },
  {
    path: '/tw_login',
    loader: getProjectIdFn,
    element: <MyLayout />,
    children: [
      {
        index: true,
        loader: getProjectIdFn,
        element: (
          <Suspense fallback={<PageFallBack />}>
            <TwLoginIndex />
          </Suspense>
        )
      }
    ]
  },
  {
    path: '/tg_callback',
    loader: getProjectIdFn,
    element: <MyLayout />,
    children: [
      {
        index: true,
        loader: getProjectIdFn,
        element: (
          <Suspense fallback={<PageFallBack />}>
            <TgCallback />
          </Suspense>
        )
      }
    ]
  },
  {
    path: '/dc_callback',
    loader: getProjectIdFn,
    element: <MyLayout />,
    children: [
      {
        index: true,
        loader: getProjectIdFn,
        element: (
          <Suspense fallback={<PageFallBack />}>
            <DcCallback />
          </Suspense>
        )
      }
    ]
  },
  {
    path: "/zklogin",
    loader: getProjectIdFn,
    element: <MyLayout />,
    children: [
      {
        index: true,
        loader: getProjectIdFn,
        element: (
          <Suspense fallback={<PageFallBack />}>
            <ZkLoginEnoki />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/zklogin/callback",
    loader: getProjectIdFn,
    element: <MyLayout />,
    children: [
      {
        index: true,
        loader: getProjectIdFn,
        element: (
          <Suspense fallback={<PageFallBack />}>
            <ZkLoginCallback />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <div className='w-full h-screen bg-black text-white'>404</div>
  }
]
export default routes
