import { useState } from 'react';
import ShareDrawer from '@/components/drawer/share';
import Button from './button';
import TgIcon from '@/images/icon/svgr/tg.svg?react';
import CopyIcon from '@/images/icon/svgr/copy.svg?react';
import { Typography } from 'antd';
import {
  useWiseCreditInviteFriends,
  useWiseCreditInvite,
} from '@/hooks/useWiseScore';
import { useCallback } from 'react';
import tpointIcon from '@/images/wise/prize/tpoint.png';

const { Paragraph } = Typography;

export default function Invite() {
  const [open, setOpen] = useState(false);
  const { inviteCode, invitedList, isLoading } = useWiseCreditInviteFriends();
  const { shareToChat, inviteLink, rawText, inviteTgUserFn } =
    useWiseCreditInvite();
  const Friends = useCallback(() => {
    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center -space-x-3">
          {isLoading ? (
            <span className="size-7 rounded-full bg-white/10 animate-spin" />
          ) : (
            invitedList.map((v) => {
              return (
                <img
                  src={v.avator}
                  className="size-7 rounded-full object-center"
                  key={v.userId}
                />
              );
            })
          )}
          {invitedList.length < 3 && (
            <span className="size-7 rounded-full bg-white/10 flex justify-center items-center">
              +
            </span>
          )}
        </div>

        <div className="text-xs font-thin">
          {invitedList.length}/3 Friends generated
        </div>
      </div>
    );
  }, [isLoading, invitedList]);
  return (
    <>
      <div className="py-3 px-4 bg-white/5 rounded-lg space-y-1.5">
        <h2 className="text-base font-medium">TBook Community</h2>
        <p className="text-xs font-thin">Keep updated for your WISE Credit!</p>
        <Button
          className="flex items-center gap-x-1.5 px-2 text-xs btn-click"
          onClick={() => {
            setOpen(true);
          }}
        >
          <TgIcon width="16px" height="16px" />
          Join
        </Button>
      </div>

      <ShareDrawer
        open={open}
        onCancel={() => {
          setOpen(false);
        }}
        shareToChat={shareToChat}
        inviteLink={inviteLink}
        rawText={rawText}
        inviteTgUserFn={inviteTgUserFn}
        ShareButton={
          <button
            onClick={() => {
              inviteTgUserFn();
            }}
            className="rounded-md bg-[#904BF6] btn-click w-full flex items-center justify-center gap-x-1.5 h-10 text-xs font-bold font-syne"
          >
            <TgIcon />
            Share invite link
          </button>
        }
      >
        <div className="space-y-6">
          <h2 className="text-3xl font-bold font-syne text-center">
            Invite & Earn
          </h2>

          <div className="py-3 px-4 bg-white/5 rounded-lg space-y-3">
            <Paragraph
              copyable={{
                text: rawText,
                icon: <CopyIcon />,
              }}
              className="flex justify-between gap-x-1"
              style={{
                marginBottom: 0,
              }}
            >
              {isLoading ? (
                <span className="animate-spin bg-[#1f1f1f] w-12 h-6">
                  {inviteCode}
                </span>
              ) : (
                <span className="text-base font-medium text-white">
                  {inviteCode}
                </span>
              )}
            </Paragraph>

            <Friends />
          </div>

          <div className="text-center text-base">
            The invite code is valid for 3 users.Each invitee generating WISE
            Credit, you’ll get 5,000
            <img src={tpointIcon} className="size-5 ms-1 inline" />
          </div>
        </div>
      </ShareDrawer>
    </>
  );
}
