
import { Suspense, lazy } from 'react';
import { useLoaderData } from 'react-router-dom';

import CompanyHeader from './CompanyHeader';
import WatchRouter from '../common/WatchRouter';
const Modals = lazy(() => import('../common/Modals'));

export default function Header ({ title }) {
  const { companyId } = useLoaderData()
  const link = `/company/${companyId}`
  return (
    <>
      <CompanyHeader link={ link } title={ title } />
      <WatchRouter />
      <Suspense>
        <Modals />
      </Suspense>
    </>
  );
}
