import { useTelegram } from '@/hooks/useTg';
import Page from './page';
import Layout from '@/layout/ton/Layout';
import { useNavigate } from 'react-router-dom';
import { useLayoutEffect, useState } from 'react';
import PageFallBack from '@/components/pageFallback';
import { safeParse, supportTMATypes } from '@/utils/tma';

let openFromDirectLink = true;
export default function TonExplore () {
  const { webApp } = useTelegram();
  const navigate = useNavigate();
  const [isSubpage, setSubpage] = useState(false);
  useLayoutEffect(() => {
    if (webApp?.initDataUnsafe.start_param) {
      const { type, projectUrl, campaignId } = safeParse(
        webApp?.initDataUnsafe.start_param
      );

      if (supportTMATypes.includes(type) && openFromDirectLink) {
        setSubpage(true);
        window.sessionRoutesCount -= 1;
        // direct link can open only once!
        openFromDirectLink = false;
        if (type === 'campaign') {
          navigate(`/${projectUrl}/${campaignId}`);
        } else if (type === 'project') {
          navigate(`/${projectUrl}/`);
        } else if (type === 'wiseScore') {
          navigate(`/wise-score`);
        } else if (type === 'renaissance') {
          navigate(`/event/renaissance`);
        }
      }
    }
  }, []);

  return !isSubpage ? (
    <Layout>
      <Page />
    </Layout>
  ) : (
    <PageFallBack />
  );
}
