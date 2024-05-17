import { Outlet } from 'react-router-dom';
import Header from '../common/Header';
import Footer from '../common/Footer';

export default function Layout () {
  return (
    <div className='flex flex-col  min-h-dvh bg-black text-white'>
      <Header type='fixed' />
      <div className='relative flex-auto overflow-x-hidden overflow-y-auto flex flex-col'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
