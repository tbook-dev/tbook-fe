import arrowIcon from '@/images/icon/arrow.svg'
import clsx from 'clsx'

export default function Accordion ({ title, children, fixedAreo }) {
  const [open, setOpen] = useState(false)
  return (
    <div className='border-b border-gray-300'>
      <div
        className='flex items-center cursor-pointer gap-x-2'
        onClick={() => setOpen(!open)}
      >
        <img
          src={arrowIcon}
          className={clsx(
            'w-4 h-4 object-contain transform',
            open && 'rotate-90'
          )}
        />
        <span className='text-xl font-bold'>{title}</span>
      </div>
      <div className='mb-2.5'>{fixedAreo}</div>
      {open && children}
    </div>
  )
}
