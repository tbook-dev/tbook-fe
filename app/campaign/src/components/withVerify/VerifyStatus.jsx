import dataJSON from '@/images/social/verified.json';
import verifiedSvg from '@/images/social/verified.svg';
import { lazy, Suspense } from 'react';

export const verifyStatusEnum = {
  NotStarted: 0,
  Pending: 1,
  Sucess: 2,
};
const Lottie = lazy(() => import('lottie-react'));

export default function VerifyStatus({ status }) {
  return (
    <>
      {status === verifyStatusEnum.NotStarted && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M8.00008 4.00033V6.00033L10.6667 3.33366L8.00008 0.666992V2.66699C5.05341 2.66699 2.66675 5.05366 2.66675 8.00033C2.66675 9.04699 2.97341 10.0203 3.49341 10.8403L4.46675 9.86699C4.16675 9.31366 4.00008 8.67366 4.00008 8.00033C4.00008 5.79366 5.79341 4.00033 8.00008 4.00033ZM12.5067 5.16033L11.5334 6.13366C11.8267 6.69366 12.0001 7.32699 12.0001 8.00033C12.0001 10.207 10.2067 12.0003 8.00008 12.0003V10.0003L5.33341 12.667L8.00008 15.3337V13.3337C10.9467 13.3337 13.3334 10.947 13.3334 8.00033C13.3334 6.95366 13.0267 5.98033 12.5067 5.16033Z"
            fill="black"
          />
        </svg>
      )}

      {status === verifyStatusEnum.Pending && (
        <Suspense>
          <Lottie
            loop
            autoplay={true}
            animationData={dataJSON}
            style={{ height: '24px', width: '24px' }}
          />
        </Suspense>
      )}

      {status === verifyStatusEnum.Sucess && (
        <img src={verifiedSvg} className="w-4 h-4" alt="sucess" />
      )}
    </>
  );
}
