import { useState, useMemo, useCallback } from 'react';
import useUserRenaissance, { useLevel } from '@/hooks/useUserRenaissance';
import { formatImpact } from '@tbook/utils/lib/conf';
import moduleConf from '../conf';
import Button from './ui/button';
import SocalSVG from '@/utils/social';
import useTonToolkit from '@/components/ton/useTon';
import TonToolTip from '@/components/ton/tooltip';
import { Tooltip } from 'antd';
import useSocial from '../../../hooks/useSocial';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import WisescoreModal from './modal/wisescore';
import Score from './ui/score';

export default function WisescoreCard () {
  const { isLoading, data } = useUserRenaissance();
  const { hasInvited, userLevel, updateUserLevel, inviteTgUser } = useLevel();
  const { getSocialByName } = useSocial();
  const { openTonModalLogin, disconnectTon, tonConnected, tonAddress } =
    useTonToolkit();
  const [isWisescoreModalOpen, setIsWisescoreModalOpen] = useState(false);
  const tgUserName = getSocialByName('telegram').userName;
  const [isToggled, setToggle] = useState(false);
  const shakeAnimation = {
    x: [0, -10, 10, -10, 10, 0],
    transition: {
      duration: 0.2,
      onComplete: () => setToggle(false),
    },
  };
  const invitedFriends = data?.friends ?? [];
  const level2Competed = invitedFriends.length === 5;
  const closeModal = useCallback(() => {
    setIsWisescoreModalOpen(false);
  }, []);

  const formatedFriends = useMemo(() => {
    const invitedNum = data?.friends?.length ?? 0;
    const inviteList = Array.from({ length: 5 - invitedNum }).fill({
      type: 'uninvited',
    });
    return (data?.friends ?? [])
      .map(v => ({ ...v, type: 'invited' }))
      .concat(inviteList);
  }, [data]);

  const handleGenerate = () => {
    if (tonConnected) {
      console.log(
        'connected, generate  wise score ,and report leverl 1 finish'
      );
      setIsWisescoreModalOpen(true);
    } else {
      setToggle(true);
    }
  };

  const handleJoin = () => {
    console.log('handleJoin');
  };
  console.log({ userLevel });
  return (
    <>
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

          <div className='flex flex-col items-center gap-1 text-center'>
            {[1, 2].includes(userLevel) && (
              <span className='font-syne text-xl font-bold text-color4'>
                {userLevel === 1 && moduleConf.wisescore}
                {userLevel === 2 && level2Competed ? (
                  moduleConf.wisesbt
                ) : (
                  <>
                    {moduleConf.wisesbt}
                    <br />
                    {moduleConf.wisesbt2}
                  </>
                )}
              </span>
            )}
            {userLevel === 3 && (
              <div className='text-color5 text-lg font-bold font-syne'>
                {moduleConf.wiseTitle}
              </div>
            )}

            {moduleConf.getInviteTip(userLevel, level2Competed)}
          </div>
        </div>

        {userLevel === 1 && <Score />}

        {userLevel === 2 && (
          <div className='flex flex-col items-center gap-y-8'>
            <img src={moduleConf.sbtUrl} className='size-[120px]' />
            <div
              className={clsx(
                'flex items-center',
                level2Competed ? '-space-x-2' : 'justify-between w-[280px]'
              )}
            >
              {formatedFriends.map((v, i) => {
                return v.type === 'invited' ? (
                  <img
                    key={i}
                    src={v.avatar}
                    className='size-10 rounded-full'
                  />
                ) : (
                  <img
                    key={i}
                    src={moduleConf.url.invite}
                    className='size-10 rounded-full cursor-pointer'
                    onClick={inviteTgUser}
                  />
                );
              })}
            </div>
          </div>
        )}

        <div className='flex flex-col gap-y-2 items-center justify-center'>
          {/* invite logic，invited link but be clicked, after click finisged,tpiont gets, thus it can generate，but generate must connect ton wallect */}
          {/* userLevl 1 */}
          {userLevel === 1 &&
            (hasInvited ? (
              <Button className='gap-x-1.5' onClick={handleGenerate}>
                {moduleConf.generateBtn}
              </Button>
            ) : (
              <>
                <Button className='gap-x-1.5' onClick={inviteTgUser}>
                  {<SocalSVG.tg className='fill-white' />}
                  {moduleConf.inviteBtn}
                </Button>
                {moduleConf.inviteTip2}
              </>
            ))}

          {userLevel === 2 && (
            <>
              {level2Competed ? (
                <>
                  <Button className='gap-x-1.5' onClick={handleJoin}>
                    Join
                  </Button>
                </>
              ) : (
                <>
                  <Button className='gap-x-1.5' onClick={inviteTgUser}>
                    {<SocalSVG.tg className='fill-white' />}
                    {moduleConf.inviteBtn}
                  </Button>
                  {moduleConf.inviteTip2}
                </>
              )}
            </>
          )}

          {hasInvited && (
            <div className='flex items-center gap-x-4'>
              {
                <Tooltip title={tgUserName} trigger='click'>
                  <span className='cursor-pointer'>
                    <SocalSVG.tg className='fill-[#F8C685]' />
                  </span>
                </Tooltip>
              }

              {tonConnected ? (
                <TonToolTip address={tonAddress} disconnect={disconnectTon}>
                  <SocalSVG.ton className='fill-[#F8C685]' />
                </TonToolTip>
              ) : (
                <motion.button
                  className='flex items-center gap-x-1'
                  onClick={openTonModalLogin}
                  animate={isToggled ? shakeAnimation : ''}
                >
                  {<SocalSVG.ton className='fill-white' />}
                  <span className='underline text-sm'>Connect</span>
                </motion.button>
              )}
            </div>
          )}
        </div>
      </div>
      <WisescoreModal
        open={isWisescoreModalOpen}
        closeModal={closeModal}
        onComplete={updateUserLevel}
      />
    </>
  );
}
