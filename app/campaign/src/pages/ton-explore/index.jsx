import Page404 from '@/pages/404';
import { useTelegram } from '@/hooks/useTg';
import Page from './page';
import Layout from '@/layout/ton/Layout';
import { useNavigate } from 'react-router-dom';
import { useLayoutEffect, useState } from 'react';
import PageFallBack from '@/components/pageFallback';
import { safeParse } from '@/utils/tma';

export default function TonExplore () {
  const { isTMA, webApp } = useTelegram();
  const navigate = useNavigate();
  const [isSubpage, setSubpage] = useState(false);
  useLayoutEffect(() => {
    if (webApp?.initDataUnsafe.start_param) {
      const { type, projectUrl, campaignId } = safeParse(
        webApp?.initDataUnsafe.start_param
      );
      if (type === 'campaign') {
        setSubpage(true);
        window.sessionRoutesCount -= 1;
        navigate(`/${projectUrl}/${campaignId}`);
      } else if (type === 'project') {
        setSubpage(true);
        window.sessionRoutesCount -= 1;
        navigate(`/${projectUrl}/`);
      }
    }
  }, []);
  // console.log({ isTMA, isSubpage });
  return isTMA ? (
    !isSubpage ? (
      <Layout>
        <Page />
      </Layout>
    ) : (
      <PageFallBack />
    )
  ) : (
    <Page404 />
  );
}
