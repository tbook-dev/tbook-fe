import { useResponsive } from 'ahooks';
import Page404 from '@/pages/404';
import Page from './page';

export default function Attestation () {
  const { pc } = useResponsive();

  return pc ? <Page /> : <Page404 />;
}
