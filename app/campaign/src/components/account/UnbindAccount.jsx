import { useCallback, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUnbindAccountModal } from '@/store/global';
import { Dialog, Transition } from '@headlessui/react';

import MergePassportCard from './MergePassportCard';

const moduleConf = {
  title: 'Account  occupied',
  desc: [
    `This account  has been bound to another incentive passport.`,
    `You could unbind and try again.`,
  ],
  link: {
    text: 'How to unbind?',
    url: 'https://tbookcommunity.medium.com/social-attestation-in-tbook-incentive-passport-disconnecting-feature-is-now-live-66f29ce42bef',
  },
};
export default function MergeAccount () {
  const showUnbindAccountModal = useSelector(
    s => s.global.showUnbindAccountModal
  );
  const unbindAccountData = useSelector(s => s.global.unbindAccountData);
  const dispath = useDispatch();
  const hideMergeAccountModal = useCallback(() => {
    dispath(setUnbindAccountModal(false));
  }, []);

  return (
    <Transition.Root show={showUnbindAccountModal} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-10'
        onClose={hideMergeAccountModal}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-75 backdrop-blur transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div className='flex min-h-full justify-center p-4 text-center items-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-linear2 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                <div className='pt-4'>
                  <div className='space-y-2 pb-3  px-4 border-b border-white/10'>
                    <Dialog.Title
                      as='h3'
                      className='text-lg font-medium text-white text-left'
                    >
                      {moduleConf.title}
                    </Dialog.Title>
                    <div>
                      {moduleConf.desc.map(c => {
                        return (
                          <p key={c} className='text-[#C0ABD9] text-xs'>
                            {c}
                          </p>
                        );
                      })}
                    </div>

                    <a
                      href={moduleConf.link.url}
                      target='_blank'
                      className='text-[#C0ABD9] text-xs underline hover:text-white focus-within:outline-none'
                    >
                      {moduleConf.link.text}
                    </a>
                  </div>

                  <div className='px-4 divide-y divide-white/10  border-b border-white/10 text-[#C0ABD9]'>
                    <MergePassportCard
                      name='Current Incentive Passport'
                      account={unbindAccountData.passportA}
                    />
                    <MergePassportCard
                      name='Incentive Passport you want to connect'
                      account={unbindAccountData.passportB}
                    />
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
