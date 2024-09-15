import React from 'react';
import { useLoaderData } from 'react-router-dom';

const App = React.lazy(() => import('@/pages/app'));
const AppV3 = React.lazy(() => import('@/pages/app-v3'));

export default function ProjectPageWrap () {
  const projectInfo = useLoaderData();
  console.log('projectInfo', projectInfo)

  const { theme = 'light' } = projectInfo;

  const isLightTheme = theme === 'light';
  const Component = isLightTheme ? AppV3 : App;

  return (
    <Component />

  );
}
