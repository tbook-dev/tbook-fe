import clsx from 'clsx';
import { Spin } from 'antd';

const clsMap = {
  primary: 'bg-cw2 text-white',
  default: 'text-c-9 font-medium border border-c-3',
  text: 'text-c-9 px-0 font-medium',
  gost: 'text-[#A1A1A2] border-[#A1A1A2] border text-base font-medium',
  danger: 'bg-[#DC2626] text-white',
  white: 'border border-white text-white',
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
      className={clsx(
        'h-10 px-10 rounded-3xl  text-base hover:opacity-70 flex justify-center items-center',
        clsMap[type],
        disabledClsMap[type],
        className
      )}
      {...props}
    >
      {props.children}
      {loading && (
        <Spin
          className={clsx('ml-2', {
            'text-white': type === 'danger',
          })}
        />
      )}
    </button>
  );
}
