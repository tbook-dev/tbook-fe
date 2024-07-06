import { cn } from '@/utils/conf';
export default function Button ({ className, ...props }) {
  return (
    <button
      className={cn(
        'text-white font-medium text-sm bg-[#904BF6] rounded px-3 py-1.5 btn-click',
        className
      )}
      {...props}
    />
  );
}
