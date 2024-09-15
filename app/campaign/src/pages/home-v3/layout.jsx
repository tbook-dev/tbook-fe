// import { Outlet } from 'react-router-dom';
// import Header from '../common/Header';
// import Footer from '../common/Footer';

export default function Layout ({ children }) {
  return (
    <div className='flex flex-col min-h-screen h-full bg-gradient-to-b from-[#FCFAFD]  to-[#F0E5F6]'>
      {/* <Outlet /> */ }
      { children }
    </div>
  );
}

