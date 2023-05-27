import clsx from 'clsx'

const clsMap = {
  primary: 'bg-cw1 text-white',
  default: 'text-white bg-gray'
}
export default function Button ({ type = 'default', className, ...props }) {
  return (
    <button
      className={clsx(
        'h-10 px-10 rounded-button  hover:opacity-70',
        clsMap[type],
        className
      )}
      {...props}
    ></button>
  )
}
