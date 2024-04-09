// import { Outlet } from 'react-router-dom';
import Header from '../common/Header';
import Footer from '../common/Footer';
import clsx from 'clsx';

export default function Layout({ children, className }) {
  return (
    <div className="flex flex-col  min-h-dvh bg-black text-white ">
      <Header type="ton" />
      <div
        className={clsx(
          'relative flex-auto overflow-x-hidden overflow-y-auto',
          className
        )}
      >
        {children}
      </div>
      <Footer />
    </div>
  );
}
