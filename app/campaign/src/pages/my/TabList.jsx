import clsx from 'clsx'

export default function TabList ({ disabled, tabs, value, onSelect }) {
  return (
    <div className='flex items-center justify-between lg:justify-start gap-x-6 text-lg font-medium'>
      {tabs.map(m => {
        return (
          <button
            key={m.name}
            disabled={disabled}
            className={clsx(
              'lg:px-4 lg:py-3 rounded relative',
              m.value === value
                ? 'lg:bg-[rgb(255,255,255)]/[0.1] lg:after:hidden after:absolute after:inset-x-0 after:bottom-[-17px] after:h-0.5 after:bg-white'
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
