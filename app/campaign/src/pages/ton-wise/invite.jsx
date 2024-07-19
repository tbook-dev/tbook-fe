import BottomNav from './components/bottomNav';
import InviteFriends from './components/inviteFriends';
import Button from './components/button';
import TgIcon from '@/images/icon/svgr/tg.svg?react';

export default function Invite() {
  return (
    <div className="flex-auto w-full  pb-20  px-5 mt-3 lg:px-0 mx-auto">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl">Invite friends to</h2>
          <h2 className="text-2xl">Earn more Rewards</h2>
        </div>
        <InviteFriends />
      </div>
      <Button className="h-10 w-[310px] absolute bottom-20 inset-x-0 mx-auto z-10 flex justify-center items-center gap-x-1.5 px-2 text-xs btn-click">
        <TgIcon width="16px" height="16px" />
        Invite friends
      </Button>
      <BottomNav />
    </div>
  );
}
