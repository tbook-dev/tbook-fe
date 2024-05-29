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

export const TelegramContext = createContext({});

export const TelegramProvider = ({ children }) => {
  const [webApp, setWebApp] = useState(window.Telegram?.WebApp ?? null);
  const [tgAuthed, setTgAuthed] = useState(false);
  const redirectMode = !!getQueryParameter(
    window.self.location.href,
    logoutRedirecrtKey
  );
  const app = window.Telegram?.WebApp;

  useEffect(() => {
    if (!redirectMode) {
      tgLogin();
    }
  }, []);

  const tgLogin = useCallback(async () => {
    if (app?.initData) {
      app.ready();
      app.expand();
      setWebApp(app);
      await tgTMAAuth({ payload: app?.initData });
      setTgAuthed(true);
      removeQueryParameter(window.self.location.href, logoutRedirecrtKey);
    }
  }, [app]);

  const value = useMemo(() => {
    return webApp?.initData
      ? {
          webApp,
          unsafeData: webApp.initDataUnsafe,
          user: webApp.initDataUnsafe.user,
          isTMA: true,
          tgAuthed,
          tgLogin,
        }
      : {
          isTMA: false,
          tgAuthed,
          tgLogin,
        };
  }, [webApp, tgAuthed]);
  return (
    <TelegramContext.Provider value={value}>
      {/* nomal mode */}
      {/* {webApp?.initData ? tgAuthed ? children : <PageFallBack /> : children} */}
      {/* redirect mode */}
      {/* children */}

      {redirectMode ? (
        children
      ) : webApp?.initData ? (
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
