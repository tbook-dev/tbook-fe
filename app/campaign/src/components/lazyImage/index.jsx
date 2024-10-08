import { useState, useEffect } from 'react';
import clsx from 'clsx';

const imgStatusMap = {
  loading: 0,
  loaded: 1,
  error: 2,
};
export default function LazyImage({
  src,
  alt,
  className,
  loadingComponent,
  fallbackSrc,
  theme = 'dark',
  themeBgColor,
  ...props
}) {
  const [status, setStatus] = useState(imgStatusMap.loading);
  const getBackgroundColor = () => {
    if (themeBgColor) return themeBgColor;
    return theme === 'light' ? 'bg-[#fff]' : 'bg-[#1f1f1f]';
  };
  const Loading = loadingComponent || (
    <div className={ clsx('animate-pulse', getBackgroundColor(), className)} />
  );
  useEffect(() => {
    if (src) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setStatus(imgStatusMap.loaded);
      };
      img.onerror = () => {
        if (fallbackSrc) {
          setStatus(imgStatusMap.error);
        }
      };
    }
  }, [src]);
  return (
    <>
      {status === imgStatusMap.loading && Loading}
      {status === imgStatusMap.error && (
        <img
          src={fallbackSrc}
          className={className}
          alt="fallback image"
          {...props}
        />
      )}
      {status === imgStatusMap.loaded && (
        <img
          src={src}
          className={className}
          alt={(alt ?? '') + '/ origin image'}
          {...props}
        />
      )}
    </>
  );
}
