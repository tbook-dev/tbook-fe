import Header from './Header'
import BottomNav from './BottomNav'
import clsx from 'clsx'
import { Outlet, useLoaderData, useLocation } from 'react-router-dom'

const routeTitleMap = [
  { pattern: /\/about$/, getTitle: (companyName) => `About ${companyName}` },
  { pattern: /\/leaderboard$/, getTitle: (companyName) => `${companyName}` },
  { pattern: /\/asset$/, getTitle: (companyName) => `Assets` },
  { pattern: /\/projects$/, getTitle: (companyName) => `${companyName}` },
  { pattern: /.*/, getTitle: (companyName) => companyName }
];

export default function Layout () {
  const { pathname } = useLocation()
  const { companyName, isLightTheme } = useLoaderData()

  const getTitleForRoute = (path, name) => {
    const route = routeTitleMap.find(r => r.pattern.test(path));
    return route ? route.getTitle(name) : name;
  };

  const title = getTitleForRoute(pathname, companyName);
  
  return (
    <div className={ clsx("flex flex-col min-h-dvh", isLightTheme ? 'bg-[#FCFAFD]' : 'bg-black')}>
      <Header title={ title } />
      <div className='relative flex-auto overflow-x-hidden overflow-y-auto'>
        <Outlet />
        <BottomNav />
      </div>
    </div>
  )
}
