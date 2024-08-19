import { useTelegram } from '@/hooks/useTg';
import Page from './page';
import Layout from '@/layout/ton/Layout';
import { useNavigate } from 'react-router-dom';
import { useLayoutEffect, useState } from 'react';
import PageFallBack from '@/components/pageFallback';
import { safeParse, supportTMATypes } from '@/utils/tma';

export default function TonExplore() {
  const { webApp } = useTelegram();
  const navigate = useNavigate();
  const [isSubpage, setSubpage] = useState(false);
  useLayoutEffect(() => {
    if (webApp?.initDataUnsafe.start_param) {
      const { type, projectUrl, campaignId, ...p } = safeParse(
        webApp?.initDataUnsafe.start_param
      );
      if (supportTMATypes.includes(type)) {
        setSubpage(true);
        window.sessionRoutesCount -= 1;
        if (type === 1) {
          navigate(`/${projectUrl}/${campaignId}`);
        } else if (type === 2) {
          navigate(`/${projectUrl}/`);
        } else if (type === 3) {
          const inviteCode = p.inviteCode;
          if (inviteCode) {
            navigate(`/wise-score/join?inviteCode=${inviteCode}`);
          } else {
            navigate(`/wise-score`);
          }
        } else if (type === 4) {
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
