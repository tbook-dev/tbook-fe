import { Outlet } from 'react-router-dom'
import Header from './HeaderShare'
import Footer from './Footer'

export default function Layout () {
  return (
    <div className='flex flex-col  min-h-screen dark:bg-black dark:text-white bg-[#F1F3F4]'>
      <Header />
      <div className='relative flex-auto overflow-x-hidden overflow-y-auto'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}