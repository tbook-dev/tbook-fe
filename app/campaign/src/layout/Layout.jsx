import { Outlet } from 'react-router-dom'
export default function Layout () {
  return (
    <div className='flex flex-col  min-h-screen dark:bg-black dark:text-white bg-[#FBFDFF]'>
      <div className='relative flex-auto overflow-x-hidden overflow-y-auto'>
        <Outlet />
      </div>
    </div>
  )
}
