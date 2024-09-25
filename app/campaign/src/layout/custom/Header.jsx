
import CompanyHeader from './CompanyHeader';
import { Suspense, lazy } from 'react';

import { useLoaderData, Link, useParams } from 'react-router-dom';

import WatchRouter from '../common/WatchRouter';
const Modals = lazy(() => import('../common/Modals'));

export default function Header ({ title }) {
  const { companyId } = useLoaderData()
  const link = `/company/${companyId}`
  return (
    <>
      <CompanyHeader backgroundColor='bg-[#FCFAFD]' textColor="text-black" borderColor="border-black" link={ link } title={ title } />
      <WatchRouter />
      <Suspense>
        <Modals />
      </Suspense>
    </>
  );
}
