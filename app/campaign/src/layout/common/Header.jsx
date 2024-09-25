import WatchRouter from './WatchRouter';
import FixedHeader from '../fixed/Header';
import MyHeader from '../my/Header';
import TonHeader from '../ton/Header';
import NormalHeader from '../normal/Header';
import CompanyHeader from '../custom/CompanyHeader';
import { Suspense, lazy } from 'react';

const Modals = lazy(() => import('./Modals'));

export default function Header({ type }) {
  return (
    <>
      {type === 'fixed' && <FixedHeader />}
      {type === 'my' && <MyHeader />}
      {type === 'ton' && <TonHeader />}
      {type === 'normal' && <NormalHeader />}
      { type === 'light' && <MyHeader backgroundColor='bg-[#FCFAFD]' textColor="text-black" borderColor="border-black" /> }
      { type === 'company' && <CompanyHeader backgroundColor='bg-[#FCFAFD]' textColor="text-black" borderColor="border-black" /> }
      <WatchRouter />
      <Suspense>
        <Modals />
      </Suspense>
    </>
  );
}
