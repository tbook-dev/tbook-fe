import arrowIcon from '@/images/icon/arrow.svg'
import { useState } from 'react'
import clsx from 'clsx'

export default function Accordion ({ title, children, fixedAreo }) {
  const [open, setOpen] = useState(true)
  return (
    <div>
      <div
        className='flex items-center cursor-pointer gap-x-2 mb-1 select-none'
        onClick={() => setOpen(!open)}
      >
        <div className='w-4 h-4 flex items-center justify-center'>
          <img
            src={arrowIcon}
            className={clsx(
              'w-full transform',
              open ? 'rotate-0' : '-rotate-90'
            )}
          />
        </div>
        {title}
      </div>
      <div className='pl-6 mb-1.5'>
        {fixedAreo}
        {open && children}
      </div>
    </div>
  )
}
