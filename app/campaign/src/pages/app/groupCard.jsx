import { useMemo, memo, useState } from 'react';
import Credential from './credential';
import { cn } from '@/utils/conf';
import { motion } from 'framer-motion';
import GiftIcon from '@/images/icon/svgr/gift.svg?react';
import ArrowIcon from '@/images/icon/svgr/arrow3.svg?react';
import TonSocietyIcon from '@/images/icon/svgr/ton-society.svg?react';
import Button from '@/pages/ton-wise/components/button';

const defiLableTypes = [14, 15, 16, 17, 18, 19, 20];

const getSchema = (labelTypes = [], index) => {
  const defiColorsMap = {
    14: ['bg-[#DBFAFF]', true, 'Tonstakers'],
    15: [
      'bg-gradient-to-b from-[#A434E9] via-[#3D95EA] via-30% to-[#3D95EA]',
      true,
      'Bemo',
    ],
    16: [
      'bg-gradient-to-b from-[#0FD9B4] via-[#0082F9] via-30% to-[#0082F9]',
      true,
      'EVAA',
    ],
    17: [
      'bg-gradient-to-b from-[#0FD9B4] via-[#0082F9] via-30% to-[#0082F9]',
      false,
      'STON.fi',
    ],
    18: [
      'bg-gradient-to-b from-[#0FD9B4] via-[#0082F9] via-30% to-[#0082F9]',
      true,
      'DeDust',
    ],
    19: [
      'bg-gradient-to-b from-[#0FD9B4] via-[#0082F9] via-30% to-[#0082F9]',
      true,
      'Storm Trade',
    ],
    20: [
      'bg-gradient-to-b from-[#0FD9B4] via-[#0082F9] via-30% to-[#0082F9]',
      true,
      'Storm Trade',
    ],
  };
  const defiTypes = labelTypes.filter((v) => defiLableTypes.includes(v));
  const renderType = defiTypes.length > 0 ? defiTypes[0] : index;
  const conf = defiColorsMap[renderType];
  console.log({ renderType, conf });
  return {
    bg: conf[0],
    isDark: conf[1],
    title: conf[2],
  };
};

const GroupCard = ({ group, index, showVerify }) => {
  const { bg, isDark, title } = getSchema(
    // group.credentialList?.map(c => c.labelType),
    [14],
    index
  );
  console.log({ bg, isDark, group });
  const verifyCnt =
    group.credentialList?.filter((c) => c.isVerified).length ?? 0;
  const totalCnt = group.credentialList?.length ?? 1;
  const isGroupVerified = verifyCnt === totalCnt;
  const [showCredential, setShowCredential] = useState(false);
  const showRewardButton = useMemo(() => {
    if (isGroupVerified) return false;
    return showCredential;
  }, [showCredential, isGroupVerified]);
  return (
    <div className={cn('rounded-2xl overflow-hidden relative shadow-xl', bg)}>
      <div
        className={cn(
          'relative p-4 rounded-2xl',
          'flex items-center justify-between gap-x-3'
        )}
      >
        <div
          className={cn(
            'flex-auto h-20',
            'flex flex-col justify-between',
            isDark ? 'text-[#12172F]' : 'text-white'
          )}
        >
          <p className="text-base font-sf-bold font-bold text-black">
            {title ? `Complete Tasks On ${title}` : 'Complete Tasks'}
          </p>
          <div className="text-[#12172F] text-xs space-y-0.5 w-full">
            <div>
              {verifyCnt}/{totalCnt}
            </div>
            <div
              className={cn(
                isDark ? 'bg-[#12172F]/10' : 'bg-white',
                'h-2 relative calc(100%_-_40px) rounded-full'
              )}
            >
              <motion.div
                className={cn(
                  'h-2 absolute inset-y-0 left-0  rounded-full',
                  isDark ? 'bg-[#12172F]' : 'bg-white'
                )}
                initial={{ width: 0 }}
                animate={{ width: `${(verifyCnt * 100) / totalCnt}%` }}
              />
              <GiftIcon
                className="absolute -right-1 -bottom-2"
                fill={isDark ? '#12172F' : '#fff'}
              />
            </div>
          </div>
        </div>
        <div className="size-20 bg-fuchsia-500 flex-none"></div>
      </div>

      {showRewardButton ? (
        <div className="p-4 rounded-t-2xl bg-black/90 backdrop-blur-2xl flex flex-col gap-y-2">
          <button
            className="flex items-center gap-x-2"
            onClick={() => {
              setShowCredential(true);
            }}
          >
            <ArrowIcon />
            <p className="text-sm font-medium">
              {totalCnt} Credentials Verified
            </p>
          </button>
          <Button className="flex items-center justify-center gap-x-1 h-10">
            Mint SBT on <TonSocietyIcon />
          </Button>
        </div>
      ) : (
        <div className="p-4 space-y-4 rounded-t-2xl bg-gradient-to-b from-black/65 to-black/85">
          {group.credentialList?.map((credential) => (
            <Credential
              credential={credential}
              key={credential.credentialId}
              showVerify={showVerify}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(GroupCard);
