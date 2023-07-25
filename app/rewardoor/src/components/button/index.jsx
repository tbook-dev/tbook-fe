import clsx from 'clsx'
import { Spin } from 'antd'

const clsMap = {
  primary: 'bg-cw2 text-white',
  default: 'bg-gray text-white'
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
