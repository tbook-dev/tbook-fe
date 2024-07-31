import { cn } from '@/utils/conf';
import { LoadingOutlined } from '@ant-design/icons';

export default function Button({
  className,
  disabled,
  children,
  isLoading,
  ...props
}) {
  return (
    <button
      disabled={disabled}
      className={cn(
        'text-white font-medium text-sm bg-[#904BF6] rounded px-3 py-1.5',
        disabled ? 'disabled:opacity-50' : 'btn-click',
        className
      )}
      {...props}
    >
      {children}
      {isLoading && <LoadingOutlined className="ms-1" />}
    </button>
  );
}
