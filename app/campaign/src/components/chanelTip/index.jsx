import tipImg from '@/images/tip.svg';
import { Popover, Transition } from '@headlessui/react';
import clsx from 'clsx';

const moduleConf = {
  message: `  For any inquiries or feedbacks of TBook products, please don't
    hesitate to reach out to us via Telegram:`,
  link: ' https://t.me/tbookincentive',
};
export default function ChanelTip () {
  return (
    <Popover className='group relative'>
      {({ open }) => (
        <>
          <Popover.Button
            className={clsx(
              open && 'invisible',
              'active:outline-none focus-within:outline-none'
            )}
          >
            <img
              className='rounded-full backdrop-blur-md'
              src={tipImg}
              alt='tip img'
            />
          </Popover.Button>

          <Transition
            enter='transition ease-out duration-200'
            enterFrom='opacity-0 translate-y-1'
            enterTo='opacity-100 translate-y-0'
            leave='transition ease-in duration-150'
            leaveFrom='opacity-100 translate-y-0'
            leaveTo='opacity-0 translate-y-1'
          >
            <Popover.Panel
              anchor='bottom'
              className='absolute -translate-x-[calc(100%_-_70px)] -translate-y-full flex flex-col backdrop-blur-md'
            >
              <div className='flex gap-x-3 border-white/20  border shadow-lg w-[300px] lg:w-[340px] p-4 rounded-2xl bg-white/5 '>
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='flex-none'
                >
                  <path
                    d='M4.375 3.75L10.625 10L4.375 16.25M9.375 3.75L15.625 10L9.375 16.25'
                    stroke='white'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
                <div className='text-sm'>
                  <p className='text-white'>{moduleConf.message}</p>
                  <a
                    className='underline text-[#A1A1A2] hover:text-white'
                    href={moduleConf.link}
                    target='_blank'
                  >
                    {moduleConf.link}
                  </a>
                </div>
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='flex-none'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M6.87503 3.125H16.25C16.4158 3.125 16.5748 3.19085 16.692 3.30806C16.8092 3.42527 16.875 3.58424 16.875 3.75V13.125C16.875 13.2908 16.8092 13.4497 16.692 13.5669C16.5748 13.6842 16.4158 13.75 16.25 13.75C16.0843 13.75 15.9253 13.6842 15.8081 13.5669C15.6909 13.4497 15.625 13.2908 15.625 13.125V5.25833L4.1917 16.6917C4.07322 16.8021 3.91652 16.8622 3.7546 16.8593C3.59268 16.8565 3.43819 16.7909 3.32368 16.6764C3.20917 16.5618 3.14358 16.4074 3.14072 16.2454C3.13787 16.0835 3.19797 15.9268 3.30837 15.8083L14.7417 4.375H6.87503C6.70927 4.375 6.5503 4.30915 6.43309 4.19194C6.31588 4.07473 6.25003 3.91576 6.25003 3.75C6.25003 3.58424 6.31588 3.42527 6.43309 3.30806C6.5503 3.19085 6.70927 3.125 6.87503 3.125Z'
                    fill='white'
                  />
                </svg>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
