import { useResponsive } from 'ahooks';

export default function AvatarSkeleton () {
  const { pc } = useResponsive();
  return pc ? (
    <div className='w-8 h-8 rounded-full bg-[#1f1f1f] animate-pulse' />
  ) : (
    <div className='w-8 h-8 rounded-full bg-[#1f1f1f] animate-pulse' />
  );
}
