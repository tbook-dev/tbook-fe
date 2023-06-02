import clsx from 'clsx'
import { Spin } from 'antd'

const clsMap = {
  primary: 'bg-cw1 text-white',
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
        'h-10 px-10 rounded-button  hover:opacity-70 flex justify-center items-center',
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
