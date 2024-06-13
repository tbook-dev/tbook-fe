import { useState, useMemo, useCallback, useEffect } from 'react';
import { formatImpact } from '@tbook/utils/lib/conf';
import moduleConf from '../conf';
import Button from './ui/button';
import SocalSVG from '@/utils/social';
import useTonToolkit from '@/components/ton/useTon';
import TonToolTip from '@/components/ton/tooltip';
import { Tooltip, message } from 'antd';
import useSocial from '@/hooks/useSocial';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import WisescoreModal from './modal/wisescore';
import WisesSBTModal from './modal/wiseSBT';
import ScratchModal from './modal/scratch';
import Score from './ui/score';
import { cn } from '@/utils/conf';
import { useNavigate } from 'react-router-dom';
import { useUserRenaissanceKit, useLevel } from '@/hooks/useUserRenaissance';

export default function WisescoreCard () {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const {
    inviteTgUser,
    tpoints,
    friends,
    friendsCnt,
    hasInvited,
    level2Competed,
    luckyDrawCnt,
  } = useUserRenaissanceKit();
  const { userLevel, level2Mutation } = useLevel();
  const { getSocialByName } = useSocial();
  const { openTonModalLogin, disconnectTon, tonConnected, tonAddress } =
    useTonToolkit();
  const [tmpPass1, setTmpPass1] = useState(false);
  const [isWisescoreModalOpen, setIsWisescoreModalOpen] = useState(false);
  const [isWiseSBTmodalOpen, setIsWiseSBTmodalOpen] = useState(false);
  const [isScratchModalOpen, setIsScratchModalOpen] = useState(false);
  const [autoOpenScratchedModal, setAutoOpenScratchedModal] = useState(false);
  const tgUserName = getSocialByName('telegram').userName;
  const [isToggled, setToggle] = useState(false);
  const shakeAnimation = {
    x: [0, -10, 10, -10, 10, 0],
    transition: {
      duration: 0.2,
      onComplete: () => setToggle(false),
    },
  };
  const closeModal = useCallback(() => {
    setIsWisescoreModalOpen(false);
  }, []);

  const formatedFriends = useMemo(() => {
    if (friendsCnt >= 5) {
      return friends;
    } else {
      const inviteList = Array.from({ length: 5 - friendsCnt }).fill({
        type: 'uninvited',
      });
      return friends.map(v => ({ ...v, type: 'invited' })).concat(inviteList);
    }
  }, [friendsCnt, friends]);

  const handleGenerate = () => {
    if (tonConnected) {
      setIsWisescoreModalOpen(true);
    } else {
      setToggle(true);
    }
  };

  const handleJoin = async () => {
    level2Mutation
      .mutateAsync()
      .then(() => {
        setIsWiseSBTmodalOpen(true);
      })
      .catch(e => {
        messageApi.error(e.message);
      });
  };
  const handleImprove = () => {
    navigate(`/wise-score`);
  };

  useEffect(() => {
    if (luckyDrawCnt > 0 && !autoOpenScratchedModal) {
      setIsScratchModalOpen(true);
      setAutoOpenScratchedModal(true);
    }
  }, [luckyDrawCnt]);
  return (
    <>
      {contextHolder}
      {!userLevel ? (
        <div className='animate-pulse bg-[#1f1f1f]/10 h-[400px] rounded-2xl border border-[#FFEAB5]/30' />
      ) : (
        <div
          className={cn(
            'relative flex flex-col items-center gap-5 py-4 px-5 rounded-2xl border border-[#FFEAB5]/30',
            userLevel === 3 ? 'mt-3' : 'mt-1'
          )}
        >
          <div className='space-y-2 w-full'>
            {[1, 2].includes(userLevel) && (
              <div className='flex justify-between items-center w-full'>
                <div className='text-[#FFDFA2] bg-[#F8C685]/5 rounded-md py-1 px-2'>
                  <span className='mr-1 font-syne font-bold'>TPoints</span>
                  {formatImpact(tpoints)}
                </div>
                <div className='text-[#F2A85D]/60 bg-[#F8C685]/5 rounded-md font-medium py-1 px-2'>
                  {moduleConf.endTime}
                </div>
              </div>
            )}

            <div className='flex flex-col items-center gap-1 text-center'>
              {[1, 2].includes(userLevel) && (
                <span className='font-syne text-xl font-bold text-color4'>
                  {userLevel === 1 && moduleConf.wisescore}
                  {userLevel === 2 &&
                    (level2Competed ? (
                      moduleConf.wisesbt
                    ) : (
                      <>
                        {moduleConf.wisesbt}
                        <br />
                        {moduleConf.wisesbt2}
                      </>
                    ))}
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
          {userLevel === 3 && (
            <div className='grid grid-cols-3 gap-x-3'>
              {moduleConf.prize.map((v, i) => {
                return (
                  <div
                    key={i}
                    className='flex justify-center items-center w-[96px] h-[122px] bg-cover'
                    style={{ backgroundImage: `url(${moduleConf.prizebg})` }}
                  >
                    <img src={v} className='h-[72px]' />
                  </div>
                );
              })}
            </div>
          )}

          <div className='flex flex-col gap-y-2 items-center justify-center'>
            {/* invite logic，invited link but be clicked, after click finisged,tpiont gets, thus it can generate，but generate must connect ton wallect */}
            {/* userLevl 1 */}
            {userLevel === 1 &&
              (hasInvited || tmpPass1 ? (
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
                  <Button
                    className='w-[120px]'
                    onClick={handleJoin}
                    isLoading={level2Mutation.isLoading}
                  >
                    Join
                  </Button>
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

            {userLevel === 3 && (
              <Button onClick={handleImprove}>Improve WISE Score</Button>
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
      )}
      <>
        <button
          className='fixed top-20 left-2.5 flex flex-col'
          onClick={() => {
            setIsScratchModalOpen(true);
          }}
        >
          {moduleConf.svg.scratchButton}
          <img src={moduleConf.url.dog} className='relative -top-1 size-12' />
        </button>
        <WisescoreModal
          open={isWisescoreModalOpen}
          closeModal={() => {
            setTmpPass1(true);
            closeModal();
          }}
        />
        <WisesSBTModal
          open={isWiseSBTmodalOpen}
          closeModal={() => {
            setIsWiseSBTmodalOpen(false);
          }}
        />
        <ScratchModal
          inviteTgUser={inviteTgUser}
          handleGenerate={handleGenerate}
          handleJoin={handleJoin}
          open={isScratchModalOpen}
          openModal={() => {
            setIsScratchModalOpen(true);
          }}
          closeModal={() => {
            setIsScratchModalOpen(false);
          }}
        />
      </>
    </>
  );
}
