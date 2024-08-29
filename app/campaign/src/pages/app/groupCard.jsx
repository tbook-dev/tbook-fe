import { memo } from 'react';
import Credential from './credential';
import { cn } from '@/utils/conf';
import { motion } from 'framer-motion';
import GiftIcon from '@/images/icon/svgr/gift.svg?react';

const getBgColor = (group) => {
  const colors = [
    'bg-gradient-to-b from-[#0FD9B4] via-[#0082F9] via-30% to-black',
  ];
  // 内置多个背景色，以groupId获取背景色
  //   console.log({ group });
  return colors[0];
};
const GroupCard = ({ group, showVerify }) => {
  const bg = getBgColor(group);
  console.log({ bg, group });
  const verifyCnt =
    group.credentialList?.filter((c) => c.isVerified).length ?? 0;
  const totalCnt = group.credentialList?.length ?? 1;
  return (
    <div className={cn('rounded-2xl', bg)}>
      <div className={cn('p-4 rounded-2xl')}>
        <div className={cn('w-[210px] h-20', 'flex flex-col justify-between')}>
          <p className="text-base font-sf-bold font-bold text-black">
            {group.groupCategory ?? 'Complete Tasks'}
          </p>
          <div className="text-[#12172F] text-xs">
            {verifyCnt}/{totalCnt}
            <div>
              <div className="h-2 relative w-[180px] rounded-full bg-[#12172F]/10">
                <motion.div
                  className="h-2 absolute inset-y-0 left-0 bg-[#12172F] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(verifyCnt * 100) / totalCnt}%` }}
                />
                <GiftIcon className="absolute -right-1 -bottom-2" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4 rounded-2xl bg-black/10 backdrop-blur-2xl">
        {group.credentialList?.map((credential) => (
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
