import { Outlet, useLoaderData } from 'react-router-dom'
import Header from '../common/Header'
import Footer from '../common/Footer'
import BottomNav from '@/layout/custom/bottomNav'

export default function Layout () {
  const { isLightTheme, companyId } = useLoaderData();

  const showCompanyHomePage = companyId > 0;
  
  if (isLightTheme) {
    return (
      <div className='flex flex-col min-h-dvh bg-[#FCFAFD]'>
        <Header type="light" />
        <div className='relative flex-auto overflow-x-hidden overflow-y-auto'>
          <div className='pb-20'>
            <Outlet />
          </div>

          {/* TODO: has company 的再展示 bottom nav */}
          { showCompanyHomePage && <BottomNav /> }
          
        </div>
        { !showCompanyHomePage  && <Footer theme="light" /> }
      </div>
    )
  }
  return (
    <div className='flex flex-col text-white bg-black min-h-dvh'>
      <Header type="my" />
      <div className='relative flex-auto overflow-x-hidden overflow-y-auto'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}