import Button from './button';
import TgIcon from '@/images/icon/svgr/tg.svg?react';
import WebApp from '@twa-dev/sdk';
import { VITE_TBOOK_TG_CHANNEL } from '@/utils/tma';

export default function Invite() {
  return (
    <div className="py-3 px-4 bg-white/5 rounded-lg space-y-1.5">
      <h2 className="text-base font-medium">TBook Community</h2>
      <p className="text-xs font-thin">Keep updated for your WISE Credit!</p>
      <Button
        className="flex items-center gap-x-1.5 px-2 text-xs btn-click"
        onClick={() => {
          WebApp.openTelegramLink(VITE_TBOOK_TG_CHANNEL);
        }}
      >
        <TgIcon width="16px" height="16px" />
        Join
      </Button>
    </div>
  );
}
