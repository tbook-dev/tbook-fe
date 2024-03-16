import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from '../common/Footer'
import Modals from '../common/Modals'

export default function Layout () {
  return (
    <div className='flex flex-col  min-h-dvh bg-black text-white'>
      <Modals />
      <Header />
      <div className='relative flex-auto overflow-x-hidden overflow-y-auto'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
