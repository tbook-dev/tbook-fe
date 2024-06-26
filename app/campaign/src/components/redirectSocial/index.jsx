import redirectJSON from '@/images/social/redirect.json';
import failedSvg from '@/images/social/logo-error.svg';
import sucessSvg from '@/images/social/logo-ok.svg';
import useSocial from '@/hooks/useSocial';
import { useNavigate } from 'react-router-dom';
import { redirectLocalStorageOnce } from '@/pages/social/conf';
import Address from '@tbook/ui/src/Address';
import { useDispatch } from 'react-redux';
import {
  setShowMergeAccountModal,
  resetMergeAccountData,
} from '@/store/global';
import { useCallback } from 'react';
import { lazy, Suspense } from 'react';

const Lottie = lazy(() => import('lottie-react'));
const Result = ({ title, desc }) => {
  return (
    <div className='px-7 pt-4 text-center w-[320px] mx-auto'>
      {title && (
        <h2 className='text-white text-lg font-medium mb-2'>{title}</h2>
      )}
      <p className='text-xs text-[#A1A1A2]'>{desc}</p>
    </div>
  );
};

// loading, sucess, failed, occupied
export default function RedirectSocial ({
  status = 'loading',
  desc = '',
  type,
}) {
  const navigate = useNavigate();

  const { getfnByName } = useSocial();
  const { failText, loginFn } = getfnByName(type);
  const dispath = useDispatch();

  const handleMergeAccount = useCallback(() => {
    dispath(setShowMergeAccountModal(true));
  }, []);
  return (
    <div className='pt-[100px] lg:pt-[200px]'>
      {status === 'loading' && (
        <div className='flex flex-col items-center'>
          <div className='w-14 lg:w-20 h-14 lg:h-20  mb-4 lg:mb-8'>
            <Suspense>
              <Lottie animationData={redirectJSON} loop={true} />
            </Suspense>
          </div>
          <Result desc='We are verifying the account connection results...' />
        </div>
      )}

      {status === 'sucess' && (
        <div className='flex flex-col items-center'>
          <img src={sucessSvg} className='w-14 lg:w-20 h-14 lg:h-20' />
          <Result title='Account authorized successfully!' desc={desc} />
        </div>
      )}
      {status === 'failed' && (
        <div className='flex flex-col items-center'>
          <img src={failedSvg} className='w-14 lg:w-20 h-14 lg:h-20' />
          <Result
            title='Failed to authorize'
            desc={failText || 'Please try again later.'}
          />
          <div className='w-[312px] mx-auto text-white mt-8 space-y-3'>
            <button
              className='bg-[#904BF6] h-[42px] w-full shadow-s4 rounded hover:opacity-70'
              onClick={() => {
                loginFn(true);
              }}
            >
              Try again
            </button>
            <button
              className='h-[42px] w-full shadow-s4 rounded border border-[rgb(255,255,255)]/[0.2] hover:opacity-70'
              onClick={() => redirectLocalStorageOnce(navigate)}
            >
              Back
            </button>
          </div>
        </div>
      )}
      {status === 'occupied' && (
        <div className='flex flex-col items-center'>
          <img src={failedSvg} className='w-14 lg:w-20 h-14 lg:h-20' />
          <Result title='Failed to authorize' desc={'Account occupied!'} />
          <div className='w-[312px] mx-auto text-white mt-8 space-y-3'>
            <button
              className='bg-[#904BF6] h-[42px] w-full shadow-s4 rounded hover:opacity-70'
              onClick={() => redirectLocalStorageOnce(navigate)}
            >
              Back
            </button>
          </div>
        </div>
      )}
      {status === 'occupied-merge' && (
        <div className='flex flex-col items-center'>
          <img src={failedSvg} className='w-14 lg:w-20 h-14 lg:h-20' />
          <Result title='Account Occupied' desc={desc || 'Account Occupied!'} />
          <div className='w-[312px] mx-auto text-white mt-8 space-y-3'>
            <button
              className='bg-[#904BF6] h-[42px] w-full shadow-s4 rounded hover:opacity-70'
              onClick={handleMergeAccount}
            >
              I want to merge
            </button>
            <button
              className='h-[42px] w-full shadow-s4 rounded border border-[rgb(255,255,255)]/[0.2] hover:opacity-70'
              onClick={() => redirectLocalStorageOnce(navigate)}
            >
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
