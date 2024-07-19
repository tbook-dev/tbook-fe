import BottomNav from './components/bottomNav';
import Friends from './components/friends';

export default function Invite() {
  return (
    <div className="flex-auto w-full  pb-20  px-5 mt-3 lg:px-0 mx-auto">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl">Invite friends to</h2>
          <h2 className="text-2xl">Earn more Rewards</h2>
        </div>
        <Friends />
      </div>

      <BottomNav />
    </div>
  );
}
