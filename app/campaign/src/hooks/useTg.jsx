import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export const TelegramContext = createContext({});

export const TelegramProvider = ({ children }) => {
  const [webApp, setWebApp] = useState(window.Telegram?.WebApp ?? null);
  useEffect(() => {
    const app = window.Telegram?.WebApp;
    if (app?.initData) {
      app.ready();
      app.expand();
      setWebApp(app);
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
      {children}
    </TelegramContext.Provider>
  );
};

export const useTelegram = () => useContext(TelegramContext);
