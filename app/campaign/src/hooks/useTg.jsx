import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { tgTMAAuth } from '@/api/incentive';
import PageFallBack from '@/components/pageFallback';
import {
  getQueryParameter,
  logoutRedirecrtKey,
  removeQueryParameter,
} from '@/utils/tma';
import WebApp from '@twa-dev/sdk';

gtag('config', 'G-TE15FGNTC4', {
  userId: WebApp.initDataUnsafe?.user?.id,
});

export const TelegramContext = createContext({});
const evmPlatformList = ['weba', 'webk', 'unknown'];
export const TelegramProvider = ({ children }) => {
  // const [webApp, setWebApp] = useState(window.Telegram?.WebApp ?? null);
  const [tgAuthed, setTgAuthed] = useState(false);
  const redirectMode = !!getQueryParameter(
    window.self.location.href,
    logoutRedirecrtKey
  );
  // const app = window.Telegram?.WebApp;

  useEffect(() => {
    if (!redirectMode) {
      tgLogin();
    }
  }, []);

  const tgLogin = useCallback(async () => {
    if (WebApp?.initData) {
      WebApp.ready();
      WebApp.expand();
      // setWebApp(app);
      await tgTMAAuth({ payload: WebApp?.initData });
      setTgAuthed(true);
      removeQueryParameter(window.self.location.href, logoutRedirecrtKey);
    }
  }, []);

  const value = useMemo(() => {
    return WebApp?.initData
      ? {
          webApp: WebApp,
          unsafeData: WebApp.initDataUnsafe,
          user: WebApp.initDataUnsafe.user,
          isTMA: true,
          canConnectEvm: evmPlatformList.includes(WebApp.platform),
          tgAuthed,
          tgLogin,
        }
      : {
          isTMA: false,
          tgAuthed,
          canConnectEvm: evmPlatformList.includes(WebApp.platform),
          tgLogin,
        };
  }, [tgAuthed]);
  return (
    <TelegramContext.Provider value={value}>
      {/* nomal mode */}
      {/* {webApp?.initData ? tgAuthed ? children : <PageFallBack /> : children} */}
      {/* redirect mode */}
      {/* children */}

      {redirectMode ? (
        children
      ) : WebApp?.initData ? (
        tgAuthed ? (
          children
        ) : (
          <PageFallBack />
        )
      ) : (
        children
      )}
    </TelegramContext.Provider>
  );
};

export const useTelegram = () => useContext(TelegramContext);
