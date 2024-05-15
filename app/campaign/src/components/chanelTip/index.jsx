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
      {({ open, close }) => (
        <>
          <Popover.Button
            className={clsx(
              open && 'invisible',
              'active:outline-none focus-within:outline-none size-12'
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
              className='absolute  -translate-x-[calc(100%_-_50px)] lg:-translate-x-[calc(100%_-_70px)] -translate-y-full flex flex-col backdrop-blur-md'
            >
              <div className='flex gap-x-3 border-white/20  border shadow-lg w-[300px] lg:w-[340px] p-4 rounded-2xl bg-white/5 '>
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='group flex-none cursor-pointer'
                  onClick={close}
                >
                  <path
                    d='M4.375 3.75L10.625 10L4.375 16.25M9.375 3.75L15.625 10L9.375 16.25'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='stroke-[#A1A1A2] hover:stroke-white'
                  />
                </svg>
                <div className='text-sm'>
                  <p className='text-white'>{moduleConf.message}</p>
                  <a
                    href={moduleConf.link}
                    target='_blank'
                    className='underline text-[#A1A1A2] hover:text-white'
                  >
                    {moduleConf.link}
                  </a>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
