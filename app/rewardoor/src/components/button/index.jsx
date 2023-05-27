import clsx from 'clsx'

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
  console.log({ loading })
  return (
    <button
      disabled={loading}
      className={clsx(
        'h-10 px-10 rounded-button  hover:opacity-70',
        clsMap[type],
        className
      )}
      {...props}
    ></button>
  )
}
