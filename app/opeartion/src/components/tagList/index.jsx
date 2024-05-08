import clsx from 'clsx'
import closeIcon from '@tbook/share/images/icon/close4.svg'

export default function TagList ({ value = [], onChange, options }) {
  // console.log({ value, options },'TagList')
  return (
    <div className='flex flex-wrap'>
      {options
        .filter(op => value.includes(op.value))
        .map(v => {
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
                  onChange(value.filter(i => i !== v.value))
                }}
              />
            </div>
          )
        })}
    </div>
  )
}
