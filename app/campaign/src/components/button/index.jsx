import { LoadingOutlined } from '@ant-design/icons';
import { cn } from '@/utils/conf';

const clsMap = {
  primary: 'bg-cw2 text-white',
  default: 'text-c-9 font-medium text-sm border border-c-9',
  text: 'text-c-9 text-xs px-0 font-medium',
  purple: 'text-white font-medium text-sm bg-[#904BF6] rounded px-3 py-1.5',
  white: 'text-black bg-white',
};
const disabledClsMap = {
  primary:
    'disabled:bg-none disabled:text-[#333] disabled:bg-[#1A1A1A] disabled:hover:opacity-100',
};

export default function Button({
  type = 'default',
  loading = false,
  className,
  ...props
}) {
  return (
    <button
      disabled={loading}
      className={cn(
        'h-12 px-10 rounded-3xl  lg:hover:opacity-70 flex justify-center items-center',
        clsMap[type],
        disabledClsMap[type],
        className
      )}
      {...props}
    >
      {props.children}
      {loading && <LoadingOutlined className="ml-2" />}
    </button>
  );
}
