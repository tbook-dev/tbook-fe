import Header from './Header'
import BottomNav from './BottomNav'

export default function Layout ({ children }) {
  return (
    <div className='flex flex-col min-h-dvh bg-[#FCFAFD]'>
      <Header />
      <div className='relative flex-auto overflow-x-hidden overflow-y-auto'>
        { children }
        <BottomNav />
      </div>
    </div>
  )
}
