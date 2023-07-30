import clsx from 'clsx'
import { Spin } from 'antd'

const clsMap = {
  primary: 'bg-cw2 text-white',
  default: 'text-c-9 font-medium text-sm border border-c-9',
  text: 'text-c-9 text-xs px-0 font-medium'
}

export default function Button ({
  type = 'default',
  loading = false,
  className,
  ...props
}) {
  return (
    <button
      disabled={loading}
      className={clsx(
        'h-12 px-10 rounded-3xl  hover:opacity-70 flex justify-center items-center',
        clsMap[type],
        className
      )}
      {...props}
    >
      {props.children}
      {loading && <Spin className='ml-2' />}
    </button>
  )
}
