import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { tgTMAAuth } from '@/api/incentive';
import PageFallBack from '@/components/pageFallback';

export const TelegramContext = createContext({});

export const TelegramProvider = ({ children }) => {
  const [webApp, setWebApp] = useState(window.Telegram?.WebApp ?? null);
  const [tgAuthed, setTgAuthed] = useState(false);
  useEffect(() => {
    const app = window.Telegram?.WebApp;
    if (app?.initData) {
      app.ready();
      app.expand();
      setWebApp(app);
      tgTMAAuth({payload: app?.initData}).then(res => {
        setTgAuthed(true)
      });
    }
  }, []);

  const value = useMemo(() => {
    return webApp?.initData
      ? {
          webApp,
          unsafeData: webApp.initDataUnsafe,
          user: webApp.initDataUnsafe.user,
          isTMA: true,
        }
      : {
          isTMA: false,
        };
  }, [webApp]);

  return (
    <TelegramContext.Provider value={value}>
      {
        webApp ?
          tgAuthed ? children: <PageFallBack />:
          children
      }
    </TelegramContext.Provider>
  );
};

export const useTelegram = () => useContext(TelegramContext);
