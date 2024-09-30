import clsx from 'clsx';

export default function LeaderboardSkeleton() {

  const getBgColor = (index) => {
    switch (index) {
      case 1: return 'bg-[#9A81E6]  h-[70px]';
      case 2: return 'bg-[#C0ACFD]  h-[70px]';
      case 3: return 'bg-[#D5C8FF]  h-[70px]';
      default: return 'bg-white  h-[60px]';
    }
  };
  return (
    <div className="space-y-2 " >
      {new Array(8).fill().map((_, idx) => {
        return (
          <div key={ (_, idx) } className={ clsx("flex items-center px-5 gap-x-2 rounded-2xl animate-pulse", getBgColor(idx + 1))}>
          </div>
        );
      })}
    </div>
  );
}