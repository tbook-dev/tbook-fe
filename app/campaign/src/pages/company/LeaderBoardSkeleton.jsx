export default function LeaderboardSkeleton({size = 2, height}) {
  const getBgColor = (rank) => {
    console.log('rank', rank);
    switch (rank) {
      case 1: return 'bg-[#9A81E6]';
      case 2: return 'bg-[#C0ACFD]';
      case 3: return 'bg-[#D5C8FF]';
      default: return 'bg-white';
    }
  };
  return (
    <div className="space-y-2">
      {new Array(size).fill().map((_, idx) => {
        return (
          <div key={(_, idx)} className="flex items-center px-5 gap-x-2" style={{height}}>
            <div className="animate-pulse bg-[#9A81E6] w-[100px] rounded" />
          </div>
        );
      })}
    </div>
  );
}


            // <div className="animate-pulse bg-[#9A81E6] size-9 rounded" />
            // <div className="animate-pulse bg-[#C0ACFD] rounded-full size-10" />
            // <div className="animate-pulse bg-[#D5C8FF] h-10 rounded flex-auto" />