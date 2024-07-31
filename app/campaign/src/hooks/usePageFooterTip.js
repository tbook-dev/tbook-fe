import { setFooterTip } from '@/store/global';
import { useDispatch } from 'react-redux';
import { useLayoutEffect } from 'react';

export default function usePageFooterTip() {
  const dispath = useDispatch();

  useLayoutEffect(() => {
    dispath(setFooterTip(true));
    return () => {
      dispath(setFooterTip(false));
    };
  }, []);
}
