import BottomNav from './components/bottomNav';
import InviteFriends from './components/inviteFriends';
import Button from './components/button';
import TgIcon from '@/images/icon/svgr/tg.svg?react';
import {
  useWiseCreditInvite,
  useWiseCreditInviteFriends,
} from '@/hooks/useWiseScore';
import ShareDrawer from '@/components/drawer/share';
import { useState } from 'react';
import tpointIcon from '@/images/wise/prize/tpoint.png';

export default function Invite() {
  const [open, setOpen] = useState(false);
  const { shareToChat, inviteLink, rawText, inviteTgUser } =
    useWiseCreditInvite();
  const { invitedList } = useWiseCreditInviteFriends();
  return (
    <div className="flex-auto w-full pb-48  px-5 mt-3 lg:px-0 mx-auto">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl">Invite friends to</h2>
          <h2 className="text-2xl">Earn more Rewards</h2>
        </div>
        <InviteFriends />

        {invitedList.length > 0 && (
          <div className="space-y-5">
            <h2 className="text-base font-medium">Your rewards</h2>
            {invitedList.map((v) => {
              return (
                <div
                  key={v.userId}
                  className="flex items-center justify-between"
                >
                  <div className="flex gap-x-2 items-center">
                    <img src={v.avatar} className="size-8 rounded-full" />
                    <div className="text-sm">
                      @{v.useName}
                      <p className="text-white/40 text-xs">New invitee</p>
                    </div>
                  </div>
                  <h4 className="text-sm font-medium">+5,000 TPoints</h4>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Button
        onClick={() => {
          setOpen(true);
        }}
        className="h-10 w-[310px] fixed bottom-32 inset-x-0 mx-auto z-10 flex justify-center items-center gap-x-1.5 px-2 text-xs btn-click"
      >
        <TgIcon width="16px" height="16px" />
        Invite friends
      </Button>
      <BottomNav />

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

          <InviteFriends />

          <div className="text-center text-base">
            The invite code is valid for 3 users.Each invitee generating WISE
            Credit, you’ll get 5,000
            <img src={tpointIcon} className="size-5 ms-1 inline" />
          </div>
        </div>
      </ShareDrawer>
    </div>
  );
}
