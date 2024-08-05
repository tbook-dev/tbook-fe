import Button from './button';
import TgIcon from '@/images/icon/svgr/tg.svg?react';
import TpointIcon from '@/images/icon/svgr/tpoint.svg?react';
import ShareDrawer from '@/components/drawer/share';
import { useWiseCreditInvite } from '@/hooks/useWiseScore';
import { useState } from 'react';
export default function Invite() {
  const [open, setOpen] = useState(false);
  const { shareToChat, inviteLink, rawText, inviteTgUser } =
    useWiseCreditInvite();
  return (
    <>
      <button
        onClick={() => {
          setOpen(true);
        }}
        className="block w-full py-3 px-4 text-left bg-white/5 rounded-lg relative overflow-hidden"
      >
        <div className="mb-6">
          <h2 className="text-base">Invite Friends. Show your influence.</h2>
          <h2 className="text-base">Grow WISE Credit together. </h2>
        </div>

        <Button className="flex items-center gap-x-1.5 px-2 text-xs">
          <TgIcon width="16px" height="16px" />
          Invite
        </Button>
        <TpointIcon className="size-[120px] absolute -bottom-4 right-1 rotate-[-13deg] opacity-20" />
      </button>
      <ShareDrawer
        open={open}
        onCancel={() => {
          setOpen(false);
        }}
        shareToChat={shareToChat}
        inviteLink={inviteLink}
        rawText={rawText}
        inviteTgUserFn={inviteTgUser}
        ShareButton={
          <button
            onClick={() => {
              inviteTgUser();
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

          <div className="text-center text-base">
            <p> You can invite 3 more friends.</p>
            <p>Each friend generating WISE Credit,</p>
            <p>you'll improve WISE Credit Score by 1K.</p>
          </div>
        </div>
      </ShareDrawer>
    </>
  );
}
