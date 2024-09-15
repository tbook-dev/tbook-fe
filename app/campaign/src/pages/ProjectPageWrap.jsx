import React, { Suspense } from 'react';
import { useLoaderData } from 'react-router-dom';

const HomeV2 = React.lazy(() => import('@/pages/home-v2'));
const HomeV3 = React.lazy(() => import('@/pages/home-v3'));

const PageFallBack = React.lazy(() => import('@/components/PageFallBack'));

export default function ProjectPageWrap () {
  const projectInfo = useLoaderData();

  const { theme = 'light' } = projectInfo;

  const isLightTheme = theme === 'light';

  const Component = isLightTheme ? HomeV3 : HomeV2;

  return (
    <Suspense fallback={ <PageFallBack /> }>
      <Component />
    </Suspense>
  );
}
