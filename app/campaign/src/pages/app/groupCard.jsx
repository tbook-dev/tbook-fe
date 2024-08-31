import { memo } from 'react';
import Credential from './credential';
import { cn } from '@/utils/conf';
import { motion } from 'framer-motion';
import GiftIcon from '@/images/icon/svgr/gift.svg?react';

const getColor = index => {
  const white = '#fff';
  const black = '#12172F';
  const defiColors = {
    tonstakers: ['bg-[#DBFAFF]', black],
  };
  const colors = [
    ['bg-[#DBFAFF]', black],
    ['bg-gradient-to-b from-[#A434E9] via-[#3D95EA] via-30% to-black', black],
    ['bg-gradient-to-b from-[#0FD9B4] via-[#0082F9] via-30% to-black', black],
  ];
  const color = colors[index % colors.length];
  return {
    bg: color[0],
    text: color[1],
  };
};
const GroupCard = ({ group, index, showVerify, isDefi }) => {
  const { bg } = getColor(index, isDefi);
  console.log({ bg, group });
  const verifyCnt = group.credentialList?.filter(c => c.isVerified).length ?? 0;
  const totalCnt = group.credentialList?.length ?? 1;
  return (
    <div className={cn('rounded-2xl', bg)}>
      <div className={cn('p-4 rounded-2xl')}>
        <div className={cn('w-[210px] h-20', 'flex flex-col justify-between')}>
          <p className='text-base font-sf-bold font-bold text-black'>
            {group.groupCategory ?? 'Complete Tasks'}
          </p>
          <div className='text-[#12172F] text-xs'>
            {verifyCnt}/{totalCnt}
            <div>
              <div className='h-2 relative w-[180px] rounded-full bg-[#12172F]/10'>
                <motion.div
                  className='h-2 absolute inset-y-0 left-0 bg-[#12172F] rounded-full'
                  initial={{ width: 0 }}
                  animate={{ width: `${(verifyCnt * 100) / totalCnt}%` }}
                />
                <GiftIcon className='absolute -right-1 -bottom-2' />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='p-4 space-y-4 rounded-2xl bg-gradient-to-b from-black/10 to-black/30 backdrop-blur-2xl'>
        {group.credentialList?.map(credential => (
          <Credential
            credential={credential}
            key={credential.credentialId}
            showVerify={showVerify}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(GroupCard);
