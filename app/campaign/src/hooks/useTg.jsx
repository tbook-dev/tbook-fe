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
import WebApp from '@twa-dev/sdk';

gtag('config', 'G-TE15FGNTC4', {
  userId: WebApp.initDataUnsafe?.user?.id,
});

export const TelegramContext = createContext({});
const evmPlatformList = ['weba', 'webk', 'unknown'];
export const TelegramProvider = ({ children }) => {
  const [tgAuthed, setTgAuthed] = useState(false);

  useEffect(() => {
    tgLogin();
  }, []);

  const tgLogin = useCallback(async () => {
    if (WebApp?.initData) {
      WebApp.ready();
      WebApp.expand();
      await tgTMAAuth({ payload: WebApp?.initData });
      setTgAuthed(true);
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
          canConnectEvm: true,
          tgLogin,
        };
  }, [tgAuthed]);
  return (
    <TelegramContext.Provider value={value}>
      {WebApp?.initData ? tgAuthed ? children : <PageFallBack /> : children}
    </TelegramContext.Provider>
  );
};

export const useTelegram = () => useContext(TelegramContext);
