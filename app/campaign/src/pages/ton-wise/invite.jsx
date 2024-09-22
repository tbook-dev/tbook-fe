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
import { Link } from 'react-router-dom';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { cn } from '@/utils/conf';

export default function Invite() {
  const [open, setOpen] = useState(false);
  const { shareToChat, inviteLink, rawText, inviteTgUser } =
    useWiseCreditInvite();
  const { invitedList, totalTimes, inviteCode } = useWiseCreditInviteFriends();
  const hasNoData = !inviteCode;
  const hasInviter = invitedList.length > 0;
  return (
    <div className="flex-auto w-full pb-48  px-5 mt-3 lg:px-0 mx-auto">
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl">Send Invitations!</h2>
            {hasNoData ? (
              <div className="h-6 w-16 bg-[#1f1f1f] animate-pulse" />
            ) : hasInviter ? (
              <Popover>
                {({ open }) => (
                  <>
                    <PopoverButton
                      className={cn(
                        'flex items-center gap-x-1 text-xs text-white bg-white/10 px-2.5 py-1.5 rounded-lg relative',
                        open
                          ? 'text-white/60 outline outline-1 outline-white/60'
                          : 'outline-none'
                      )}
                    >
                      Your inviter{' '}
                      <img
                        className="size-5 rounded-full"
                        src={
                          'https://pbs.twimg.com/profile_images/1479058803748663298/Vb46S1fi_normal.jpg'
                        }
                      />
                      {open && (
                        <div className="size-4 rotate-[135deg] bg-[#333] absolute right-3 -bottom-5" />
                      )}
                    </PopoverButton>
                    <PopoverPanel
                      anchor={{
                        to: 'bottom',
                        gap: '10px',
                      }}
                      className="bg-[#333] rounded-xl max-w-max transition duration-200 ease-in-out"
                    >
                      <div className="flex items-center gap-x-2 text-sm p-3">
                        <img
                          className="size-8 rounded-full"
                          src={
                            'https://pbs.twimg.com/profile_images/1479058803748663298/Vb46S1fi_normal.jpg'
                          }
                        />
                        <span className="text-white">@Guy_Hawkins</span>
                        <span className="text-[#904BF6] italic ms-4">
                          #57709A
                        </span>
                      </div>
                    </PopoverPanel>
                  </>
                )}
              </Popover>
            ) : (
              <Link
                to="/wise-score/inviteBy"
                className="text-[#904BF6] text-xs font-medium bg-[#904BF6]/15 rounded-md px-2 py-1"
              >
                Enter your inviter
              </Link>
            )}
          </div>
          <InviteFriends openDrawer={() => setOpen(true)} />
        </div>

        <div className="space-y-5">
          <h2 className="text-base font-medium">Your invitees</h2>
          {hasNoData ? (
            <div className="flex items-center justify-between">
              <div className="flex gap-x-2 items-center">
                <div className="size-8 rounded-full bg-[#1f1f1f] animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 w-10 bg-[#1f1f1f] animate-pulse" />
                  <div className="h-3 w-16 bg-[#1f1f1f] animate-pulse" />
                </div>
              </div>
              <h4 className="h-5 w-16 bg-[#1f1f1f] animate-pulse" />
            </div>
          ) : invitedList.length > 0 ? (
            invitedList.map((v) => {
              return (
                <div
                  key={v.userId}
                  className="flex items-center justify-between"
                >
                  <div className="flex gap-x-2 items-center">
                    <img src={v.avatar} className="size-8 rounded-full" />
                    <div className="text-sm">
                      @{v.userName}
                      <p className="text-white/40 text-xs">New invitee</p>
                    </div>
                  </div>
                  <h4 className="text-sm font-medium">+1K WISE Score</h4>
                </div>
              );
            })
          ) : (
            <div className="text-sm font-thin text-center pt-5">
              <p>There's no invitee yet.</p>
              <p>You can invite {totalTimes} more friends. </p>
            </div>
          )}
        </div>
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

          <div className="text-center text-base">
            <p> You can invite 3 more friends.</p>
            <p>Each friend generating WISE Credit,</p>
            <p>you'll improve WISE Credit Score by 1K.</p>
          </div>
        </div>
      </ShareDrawer>
    </div>
  );
}
