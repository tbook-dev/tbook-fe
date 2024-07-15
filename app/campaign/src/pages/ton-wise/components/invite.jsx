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
const { Paragraph } = Typography;

export default function Invite() {
  const [open, setOpen] = useState(false);
  const { inviteCode, invitedList, isLoading } = useWiseCreditInviteFriends();
  const { shareToChat, inviteLink, rawText, inviteTgUserFn } =
    useWiseCreditInvite();
  return (
    <>
      <div className="space-y-2">
        <h2 className="text-sm text-white/40">
          Invite Friends to Generate WISE Credit
        </h2>
        <div className="py-3 px-4 bg-white/5 rounded-lg space-y-1.5">
          <div className="flex items-center justify-between">
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
            <Button
              className="flex items-center gap-x-1.5 px-2 text-xs btn-click"
              onClick={() => {
                setOpen(true);
              }}
            >
              <TgIcon width="16px" height="16px" />
              Invite
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center -space-x-3">
              {invitedList.map((v) => {
                return (
                  <img
                    src={v.avator}
                    className="size-7 rounded-full object-center"
                    key={v.userId}
                  />
                );
              })}
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
        </div>
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
      >
        <div>xxxxxxx</div>
      </ShareDrawer>
    </>
  );
}
