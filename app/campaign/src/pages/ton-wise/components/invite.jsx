import Button from './button';
import TgIcon from '@/images/icon/svgr/tg.svg?react';
import SBTIcon from '@/images/icon/svgr/sbt.svg?react';
import WebApp from '@twa-dev/sdk';
import { VITE_TBOOK_TG_CHANNEL } from '@/utils/tma';

export default function Invite() {
  return (
    <div className="py-3 px-4 bg-white/5 rounded-lg relative overflow-hidden">
      <h2 className="text-base mb-6">Join our channel for more surprises!</h2>
      <Button
        className="flex items-center gap-x-1.5 px-2 text-xs btn-click"
        onClick={() => {
          WebApp.openTelegramLink(VITE_TBOOK_TG_CHANNEL);
        }}
      >
        <TgIcon width="16px" height="16px" />
        Join
      </Button>
      <SBTIcon className="size-[120px] absolute -bottom-4 right-1 rotate-[-13deg] opacity-20" />
    </div>
  );
}
