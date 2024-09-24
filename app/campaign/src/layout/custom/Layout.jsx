
import Header from '../common/Header'
import BottomNav from './BottomNav'

export default function Layout ({ children }) {
  return (
    <div className='flex flex-col min-h-dvh bg-[#FCFAFD]'>
      <Header type="light" />
      <div className='relative flex-auto overflow-x-hidden overflow-y-auto'>
        { children }
        <BottomNav />
      </div>
    </div>
  )
}
