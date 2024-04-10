import LeaderboardSkeleton from './leaderBoard-skeleton';
import { formatImpact, shortAddressV1 } from '@tbook/utils/lib/conf';

export default function UserScore({ user }) {
  return user ? (
    <div className="flex items-center justify-between px-5 py-2 bg-[rgba(144,75,246)]/[0.10]">
      <div className="flex items-center gap-x-2.5">
        <span className="w-10 text-black text-xs text-center">{user.rank}</span>
        <img src={user.avatar} className="size-[42px] rounded-full" />
        <span className="bg-gradient-to-r text-transparent bg-clip-text font-medium text-sm from-[#2D83EC] to-[#1AC9FF]">
          {shortAddressV1(user.address)}
        </span>
      </div>

      <span className="text-[#904BF6] text-sm">
        {formatImpact(user.totalScore)}
      </span>
    </div>
  ) : (
    <LeaderboardSkeleton size={1} />
  );
}
