import { useTelegram } from '@/hooks/useTg';
import { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

window.sessionRoutesCount = 0;
export default function WatchRouter() {
  const { isTMA, webApp } = useTelegram();
  const navigate = useNavigate();
  const location = useLocation();
  const backHandle = useCallback(() => {
    navigate(-1);
    window.sessionRoutesCount = window.sessionRoutesCount - 2;
  }, []);

  useEffect(() => {
    if (isTMA) {
      window.sessionRoutesCount += 1;
      // console.log({ sessionRoutesCount: window.sessionRoutesCount });
      if (window.sessionRoutesCount > 1) {
        // 点击了其他的
        if (!webApp.BackButton.isVisible) {
          webApp.BackButton.show();
        }
      } else {
        // 初始化
        webApp.BackButton.hide();
      }
    }
  }, [location]);
  useEffect(() => {
    if (isTMA) {
      webApp.enableClosingConfirmation();
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
