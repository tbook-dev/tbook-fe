import clsx from 'clsx'

export default function TagRadio ({ value, onChange, options }) {
  return (
    <div className='flex flex-wrap'>
      {options.map(v => {
        return (
          <div
            className={clsx(
              'flex items-center  justify-center cursor-pointer h-8 px-6 rounded-md relative bg-b-1 mr-6 mb-3 text-c-9 hover:text-white',
              value === v.value && 'text-white'
            )}
            key={v.value}
            onClick={() => {
              onChange(v.value)
            }}
          >
            {v.label}
          </div>
        )
      })}
    </div>
  )
}
