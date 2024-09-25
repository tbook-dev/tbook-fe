import Header from './Header'
import BottomNav from './BottomNav'
// import { useParams } from 'react-router-dom'

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
