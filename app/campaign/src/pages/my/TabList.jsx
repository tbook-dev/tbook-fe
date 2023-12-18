import clsx from 'clsx'

export default function TabList ({ disabled, tabs, value, onSelect }) {
  return (
    <div className='flex items-center gap-x-6 text-xs lg:text-lg font-medium'>
      {tabs.map(m => {
        return (
          <button
            key={m.name}
            disabled={disabled}
            className={clsx(
              'lg:px-4 lg:py-1 rounded',
              m.value === value
                ? 'font-bold lg:font-medium lg:bg-[rgb(255,255,255)]/[0.1]'
                : 'text-[#c4c4c4]',
              !disabled && 'hover:text-white'
            )}
            onClick={() => {
              onSelect(m.value)
            }}
          >
            {m.name}
          </button>
        )
      })}
    </div>
  )
}
