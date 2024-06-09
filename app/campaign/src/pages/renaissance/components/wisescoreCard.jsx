import React from 'react';
import useUserRenaissance from '@/hooks/useUserRenaissance';
import { formatImpact } from '@tbook/utils/lib/conf';
import moduleConf from '../conf';
import Button from './ui/button';
import SocalSVG from '@/utils/social';
import useTonToolkit from '@/components/ton/useTon';
import useUserInfo from '@/hooks/useUserInfoQuery';
import TonToolTip from '@/components/ton/tooltip';

export default function WisescoreCard () {
  const { tonConnected, tonAddress } = useUserInfo();
  const { isLoading, data } = useUserRenaissance();
  const { openTonModalLogin, disconnectTon } = useTonToolkit();

  return (
    <div className='mt-1 relative flex flex-col items-center gap-5 py-4 px-5 rounded-2xl border border-[#FFEAB5]/30'>
      <div className='space-y-2 w-full'>
        <div className='flex justify-between items-center w-full'>
          <div className='text-[#FFDFA2] bg-[#F8C685]/5 rounded-md py-1 px-2'>
            <span className='mr-1 font-syne font-bold'>TPoints</span>
            {formatImpact(data?.TPoints)}
          </div>
          <div className='text-[#F2A85D]/60 bg-[#F8C685]/5 rounded-md font-medium py-1 px-2'>
            {moduleConf.endTime}
          </div>
        </div>

        <div className='flex flex-col items-center gap-1'>
          <span className='font-syne text-xl font-bold text-color4'>
            {moduleConf.wisescoreText}
          </span>
          {moduleConf.inviteTip}
        </div>
      </div>

      <img src={moduleConf.url.wisescoreRadar} className='w-full' />

      <div className='flex flex-col gap-y-2 items-center justify-center'>
        {/* invite logic，invited link but be clicked, after click finisged,tpiont gets, thus it can generate，but generate must connect ton wallect */}
        {data?.TPoints > moduleConf.oneFriendTpoint ? (
          <>
            <Button className='gap-x-1.5'>{moduleConf.generateBtn}</Button>
            <div className='flex items-center gap-x-4'>
              {<SocalSVG.tg className='fill-[#F8C685]' />}

              {tonConnected ? (
                <TonToolTip address={tonAddress} disconnect={disconnectTon}>
                  <SocalSVG.ton className='fill-[#F8C685]' />
                </TonToolTip>
              ) : (
                <button
                  className='flex items-center gap-x-1'
                  onClick={openTonModalLogin}
                >
                  {<SocalSVG.ton className='fill-white' />}
                  <span className='underline text-sm'>Connect</span>
                </button>
              )}
            </div>
          </>
        ) : (
          <>
            <Button className='gap-x-1.5'>
              {<SocalSVG.tg className='fill-white' />}
              {moduleConf.inviteBtn}
            </Button>
            {moduleConf.inviteTip2}
          </>
        )}
      </div>
    </div>
  );
}
