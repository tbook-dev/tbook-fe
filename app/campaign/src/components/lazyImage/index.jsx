import { useState, useEffect } from 'react';
import clsx from 'clsx';

const imgStatusMap = {
  loading: 0,
  loaded: 1,
  error: 2,
};
export default function ({
  src,
  alt,
  className,
  loadingComponent,
  fallbackSrc,
  ...props
}) {
  const [status, setStatus] = useState(imgStatusMap.loading);
  const Loading = loadingComponent || (
    <div className={clsx('animate-pulse bg-[#1f1f1f]', className)} />
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
          alt='fallback image'
          {...props}
        />
      )}
      {status === imgStatusMap.loaded && (
        <img
          src={src}
          className={className}
          alt={alt + '/ origin image'}
          {...props}
        />
      )}
    </>
  );
}
