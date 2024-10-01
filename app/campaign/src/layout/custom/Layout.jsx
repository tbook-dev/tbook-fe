import Header from './Header'
import BottomNav from './BottomNav'
import { Outlet, useLoaderData } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const routeTitleMap = [
  { pattern: /\/about$/, getTitle: (companyName) => `About ${companyName}` },
  { pattern: /\/leaderboard$/, getTitle: (companyName) => `Leaderboard` },
  { pattern: /\/asset$/, getTitle: (companyName) => `${companyName} Assets` },
  { pattern: /\/projects$/, getTitle: (companyName) => `${companyName} Projects` },
  { pattern: /.*/, getTitle: (companyName) => companyName }
];

export default function Layout () {
  const { pathname } = useLocation()
  const { companyName } = useLoaderData()

  const getTitleForRoute = (path, name) => {
    const route = routeTitleMap.find(r => r.pattern.test(path));
    return route ? route.getTitle(name) : name;
  };

  const title = getTitleForRoute(pathname, companyName);
  
  return (
    <div className='flex flex-col min-h-dvh bg-[#FCFAFD]'>
      <Header title={ title } />
      <div className='relative flex-auto overflow-x-hidden overflow-y-auto'>
        <Outlet />
        <BottomNav />
      </div>
    </div>
  )
}
