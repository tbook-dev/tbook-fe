import Page404 from '@/pages/404';
import { useTelegram } from '@/hooks/useTg';
import Page from './page';
import Layout from '@/layout/ton/Layout';

export default function TonExplore () {
  const { isTMA } = useTelegram();
  return isTMA ? (
    <Layout>
      <Page />
    </Layout>
  ) : (
    <Page404 />
  );
}
