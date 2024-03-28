import Page404 from '@/pages/404';
import { useTelegram } from '@/hooks/useTg';
import Page from './page';
import Layout from '@/layout/ton/Layout';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function safeParse(start_param) {
  try {
    const str = atob(start_param);
    return JSON.parse(str);
  } catch (error) {
    return {};
  }
}
export default function TonExplore() {
  const { isTMA, webApp } = useTelegram();
  const navigate = useNavigate();
  console.log({ webApp, initDataUnsafe: webApp?.initDataUnsafe });

  useEffect(() => {
    if (webApp?.initDataUnsafe.start_param) {
      const { type, projectUrl, campaignId } = safeParse(
        webApp?.initDataUnsafe.start_param
      );
      if (type === 'campaign' && !redirected) {
        navigate(`/${projectUrl}/${campaignId}`);
      }
    }
  }, []);

  return isTMA ? (
    <Layout>
      <Page />
    </Layout>
  ) : (
    <Page404 />
  );
}
