import { Outlet, useLoaderData } from 'react-router-dom'
import Header from '../common/Header'
import Footer from '../common/Footer'

export default function Layout () {
  const { isLightTheme } = useLoaderData();

  if (isLightTheme) {
    return (
      <div className='flex flex-col min-h-dvh bg-gradient-to-b from-[#FCFAFD]  to-[#F0E5F6]'>
        <Header type="light" />
        <div className='relative flex-auto overflow-x-hidden overflow-y-auto'>
          <Outlet />
        </div>
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