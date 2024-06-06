import { Fragment } from 'react';
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import {
  disConnectSocialAccount,
  disConnectTonAddcount,
} from '@/api/incentive';
import { useState } from 'react';
import { Spin, message } from 'antd';
import useUserInfo from '@/hooks/useUserInfoQuery';
import { shortAddress } from '@tbook/utils/lib/conf';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { setShowDistoryTon } from '@/store/global';
import { logout } from '@/utils/web3';
import { addQueryParameter, logoutRedirecrtKey } from '@/utils/tma';
import { useTelegram } from '@/hooks/useTg';

const moduleConf = {
  title: 'Confirm to disconnect?',
  button: ['Cancel', 'Continue to disconnect'],
  desc: [
    'The TON address is the last identity that can log in to this incentive passport. After disconnecting, your incentive passport will be disabled.',
    'We recommend binding a social account before disconnecting.',
    'Do you confirm to disconnect the TON address and disable the incentive passport?',
  ],
  successTip: 'Successfully disconnect',
  errorTip: 'Failed to disconnect',
};

export default function UnbindTonModal () {
  const [messageApi, contextHolder] = message.useMessage();
  const showDistoryTon = useSelector(s => s.global.showDistoryTon);
  const { isTMA } = useTelegram();
  const { tonAddress } = useUserInfo();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const onCancal = useCallback(() => {
    dispatch(setShowDistoryTon(false));
  }, []);
  const handleDisconnect = () => {
    setLoading(true);
    // api
    const fd = {
      address: tonAddress,
    };
    disConnectTonAddcount(fd)
      .then(async res => {
        // console.log(res);
        if (res.code === 200) {
          messageApi.success(res.message ?? moduleConf.successTip);
          onCancal();
          await logout();
          const newUrl = addQueryParameter(
            location.href,
            isTMA ? logoutRedirecrtKey : 't',
            Date.now()
          );
          window.location.href = newUrl;
        } else {
          messageApi.error(res.message);
        }
      })
      .catch(() => {
        messageApi.error(moduleConf.errorTip);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Transition show={showDistoryTon} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={onCancal}>
        <TransitionChild
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-75 backdrop-blur transition-opacity' />
        </TransitionChild>

        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div className='flex min-h-full justify-center p-4 text-center items-center sm:p-0'>
            <TransitionChild
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <DialogPanel className='relative transform overflow-hidden rounded-lg bg-linear2 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                <div className='px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                  <div className='sm:flex sm:items-start'>
                    <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[rgb(69,10,10)]/[0.25] sm:mx-0 sm:h-10 sm:w-10'>
                      <svg
                        width='40'
                        height='40'
                        viewBox='0 0 40 40'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <rect
                          width='40'
                          height='40'
                          rx='20'
                          fill='#450A0A'
                          fillOpacity='0.25'
                        />
                        <path
                          d='M20 17V19M20 23H20.01M13.0718 27H26.9282C28.4678 27 29.4301 25.3333 28.6603 24L21.7321 12C20.9623 10.6667 19.0378 10.6667 18.268 12L11.3398 24C10.57 25.3333 11.5322 27 13.0718 27Z'
                          stroke='#DC2626'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </div>
                    <div className='mt-3 sm:ml-4 sm:mt-0'>
                      <DialogTitle
                        as='h3'
                        className='text-lg font-medium text-white text-center lg:text-left'
                      >
                        {moduleConf.title}
                      </DialogTitle>
                      <div className='mt-2 text-[#C0ABD9] text-sm space-y-4'>
                        {moduleConf.desc.map((p, key) => {
                          return <p key={key}>{p}</p>;
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                <div className='px-4 py-3 flex flex-col-reverse gap-y-3 lg:px-6 lg:flex-row lg:justify-end lg:gap-x-3'>
                  <button
                    type='button'
                    className='inline-flex w-full justify-center rounded-md border border-white px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-70 sm:w-auto'
                    onClick={onCancal}
                  >
                    {moduleConf.button[0]}
                  </button>
                  <button
                    type='button'
                    disabled={loading}
                    className='inline-flex w-full justify-center items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-black shadow-sm sm:w-auto hover:opacity-70'
                    onClick={handleDisconnect}
                  >
                    {moduleConf.button[1]}
                    {loading && <Spin spinning size='small' className='ml-1' />}
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
        {contextHolder}
      </Dialog>
    </Transition>
  );
}
