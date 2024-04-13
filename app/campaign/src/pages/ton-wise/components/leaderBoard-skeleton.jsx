export default function LeaderboardSkeleton({size = 2, height}) {
  return (
    <div className="space-y-2">
      {new Array(size).fill().map((_, idx) => {
        return (
          <div key={(_, idx)} className="flex items-center gap-x-2 px-5" style={{height}}>
            <div className="animate-pulse bg-[rgba(144,75,246)]/[0.10] size-9 rounded" />
            <div className="animate-pulse bg-[rgba(144,75,246)]/[0.10] rounded-full size-10" />
            <div className="animate-pulse bg-[rgba(144,75,246)]/[0.10] h-10 rounded flex-auto" />
          </div>
        );
      })}
    </div>
  );
}
