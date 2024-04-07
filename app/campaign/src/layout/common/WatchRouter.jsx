import { useTelegram } from '@/hooks/useTg';
import { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

let sessionRoutesCount = 0;
export default function WatchRouter() {
  const { isTMA, webApp } = useTelegram();
  const navigate = useNavigate();
  const location = useLocation();
  const backHandle = useCallback(() => {
    navigate(-1);
    sessionRoutesCount = sessionRoutesCount - 2;
  }, []);

  useEffect(() => {
    if (isTMA) {
      sessionRoutesCount += 1;
      console.log({ sessionRoutesCount });
      if (sessionRoutesCount > 1) {
        // 点击了其他的
        if (!webApp.BackButton.isVisible) {
          webApp.BackButton.show();
        }
      } else {
        // 初始化
        if (webApp.BackButton.isVisible) {
          webApp.BackButton.hide();
        }
      }
    }
  }, [location]);
  useEffect(() => {
    if (isTMA) {
      webApp.BackButton.onClick(backHandle);
    }
    return () => {
      if (isTMA) {
        webApp.BackButton.offClick(backHandle);
      }
    };
  }, []);

  return null;
}
