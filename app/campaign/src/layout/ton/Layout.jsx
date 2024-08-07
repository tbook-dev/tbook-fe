import { Outlet } from 'react-router-dom';
import Header from '../common/Header';
import Footer from '../common/Footer';
import clsx from 'clsx';
import { useTelegram } from '@/hooks/useTg';
import Page404 from '@/pages/404';

const isDev = import.meta.env.DEV;

export default function Layout({ children, className, layout = false }) {
  const { isTMA } = useTelegram();
  return isTMA || isDev ? (
    <div className="flex flex-col  min-h-dvh bg-black text-white ">
      <Header type="ton" />
      <div
        className={clsx(
          'relative flex-auto overflow-x-hidden overflow-y-auto',
          className
        )}
      >
        {layout ? <Outlet /> : children}
      </div>
      <Footer />
    </div>
  ) : (
    <Page404 />
  );
}
