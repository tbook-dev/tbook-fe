import { useResponsive } from 'ahooks';
import Guide from './Guide';
import Main from './Layout';

export default function Layout () {
  const { pc } = useResponsive();
  return pc ? <Main /> : <Guide />;
}
