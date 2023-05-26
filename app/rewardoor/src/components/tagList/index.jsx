import clsx from 'clsx'
import closeIcon from '@tbook/share/images/icon/close4.svg'
import { useEffect, useState } from 'react'

export default function Switch ({ value, onChange, options }) {
  const [list, setList] = useState(options)
  useEffect(() => {
    setList(options)
  }, [options.length])
  useEffect(() => {
    onChange(list.map(v => v.value))
  }, [list.length])

  return (
    <div className='flex flex-wrap'>
      {list.map(v => {
        return (
          <div
            className={clsx(
              'flex items-center group justify-center h-8 px-6 rounded-md relative bg-b-1 mr-6 mb-3 text-c-9 hover:text-white'
            )}
            key={v.value}
          >
            {v.label}
            <img
              src={closeIcon}
              className='hidden absolute right-2 group-hover:block cursor-pointer'
              onClick={() => {
                setList(list.filter(i => i.value !== v.value))
              }}
            />
          </div>
        )
      })}
    </div>
  )
}
