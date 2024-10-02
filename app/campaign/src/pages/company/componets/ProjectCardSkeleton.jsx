import clsx from 'clsx';
import { useLoaderData } from 'react-router-dom';

export default function ProjectCardSkeleton () {
  const { isLightTheme } = useLoaderData();
  return (
    <div className={ clsx("h-[237px] rounded-2xl border-[1px] my-4 block animate-pulse", isLightTheme ? "bg-white border-[#E0CEEE]" : "bg-[#1f1f1f] border-[#E0CEEE]/20") }>
      <div className={ clsx("h-[143px] bg-gray-200 rounded-t-2xl", isLightTheme ? "bg-[#D5C8FF]" : "bg-[#1f1f1f]") }></div>
      <div className="flex flex-col px-4 pt-2 pb-4 gap-y-2">
        <div className="flex items-center gap-x-3">
        </div>
        <div className="space-y-2">
        </div>
      </div>
    </div>
  );
}