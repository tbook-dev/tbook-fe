import Page404 from '@/pages/404';
import { useTelegram } from '@/hooks/useTg';
import Page from './page';
import Layout from '@/layout/ton/Layout';
import { useNavigate } from 'react-router-dom';
import { useLayoutEffect, useState } from 'react';
import PageFallBack from '@/components/pageFallback';
import { safeParse, supportTMATypes } from '@/utils/tma';

let openFromDirectLink = true;
export default function TonExplore () {
  const { isTMA, webApp } = useTelegram();
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
        }
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

// src =
//   'https://campaign-staging.tbook.com/ton-explore?tgWebAppStartParam=eyJ0eXBlIjoid2lzZVNjb3JlIn0%3D#tgWebAppData=user%3D%257B%2522id%2522%253A5084124324%252C%2522first_name%2522%253A%2522lake%2522%252C%2522last_name%2522%253A%2522hu%2522%252C%2522username%2522%253A%2522lake_hu%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D-4403476571853435417%26chat_type%3Dsender%26start_param%3DeyJ0eXBlIjoid2lzZVNjb3JlIn0%253D%26auth_date%3D1716452770%26hash%3D6c6829ad99fde195b5a4619dc8c93d2c8433bf125f0cef708371bd3228807466&tgWebAppVersion=7.2&tgWebAppPlatform=weba&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23212121%22%2C%22text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23aaaaaa%22%2C%22link_color%22%3A%22%238774e1%22%2C%22button_color%22%3A%22%238774e1%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22secondary_bg_color%22%3A%22%230f0f0f%22%2C%22header_bg_color%22%3A%22%23212121%22%2C%22accent_text_color%22%3A%22%238774e1%22%2C%22section_bg_color%22%3A%22%23212121%22%2C%22section_header_text_color%22%3A%22%23aaaaaa%22%2C%22subtitle_text_color%22%3A%22%23aaaaaa%22%2C%22destructive_text_color%22%3A%22%23e53935%22%7D';
