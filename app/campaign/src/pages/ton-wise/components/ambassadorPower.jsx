import { useMemo, useState } from 'react';
import TpointIcon from '@/images/icon/svgr/tpoint.svg?react';
import { ArrowIcon } from './ambassadorSwiper';
import ShareDrawer from '@/components/drawer/share';
import { useWiseCreditInvite } from '@/hooks/useWiseScore';
import TgIcon from '@/images/icon/svgr/tg.svg?react';

const AmbassadorPower = () => {
  const { shareToChat, inviteLink, rawText, inviteTgUser } =
    useWiseCreditInvite();
  const [open, setOpen] = useState(false);

  const list = useMemo(() => {
    return [
      {
        type: 'invite',
        content: '+6,000 TPoints',
        title: 'Invite 1 friends to generate WISE Score',
        arrowColor: '#CDE69E',
      },
    ];
  }, []);
  return (
    <div className="space-y-2 fixed px-5 pt-4 bottom-0 inset-x-0 h-[220px] overflow-auto rounded-t-2xl bg-black/40">
      <h2 className="text-base font-medium">Build Your Vanguard Crowd</h2>
      <div className="space-y-1">
        {list.map((v, i) => {
          return (
            <button
              key={i}
              onClick={() => {
                setOpen(true);
              }}
              className="w-full px-4 py-3 flex items-center justify-between gap-x-1 border border-white/10 rounded-lg bg-white/10"
            >
              <div>
                <div className="text-base"> {v.title}</div>
                <div className="text-sm flex items-center gap-x-1">
                  <TpointIcon className="size-3" />
                  {v.content}
                </div>
              </div>
              <ArrowIcon stroke={v.arrowColor} />
            </button>
          );
        })}
      </div>
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
            <p>For each successful invitation, you'll </p>
            <p>improve WISE Score and get 6,000 TPoints</p>
          </div>
        </div>
      </ShareDrawer>
    </div>
  );
};

export default AmbassadorPower;
