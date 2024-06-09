import React from 'react';
import useUserRenaissance from '@/hooks/useUserRenaissance';
import { formatImpact } from '@tbook/utils/lib/conf';
import moduleConf from '../conf';
import Button from './ui/button';

export default function WisescoreCard () {
  const { isLoading, data } = useUserRenaissance();
  console.log({ data });
  return (
    <div className='-mt-1 relative flex flex-col items-center gap-5 py-4 px-5 rounded-2xl border border-[#FFEAB5]/30'>
      <div className='space-y-2 w-full'>
        <div className='flex justify-between items-center w-full'>
          <div className='text-[#FFDFA2] bg-[#F8C685]/5 rounded-md py-1 px-2'>
            <span className='mr-1'>TPoints</span> {formatImpact(data?.TPoints)}
          </div>
          <div className='text-[#F2A85D]/60 bg-[#F8C685]/5 rounded-md font-medium py-1 px-2'>
            {moduleConf.endTime}
          </div>
        </div>

        <div className='flex flex-col items-center gap-1'>
          {moduleConf.svg.wisescoreText}
          {moduleConf.inviteTip}
        </div>
      </div>

      <img src={moduleConf.url.wisescoreRadar} className='w-full' />

      <div className='flex flex-col gap-y-2 items-center'>
        <Button />
        {moduleConf.inviteTip2}
      </div>
    </div>
  );
}
