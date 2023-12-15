import clsx from 'clsx'

export default function TabList ({ disabled, tabs, value, onSelect }) {
  return (
    <div className='flex items-center justify-center gap-x-6 text-xs lg:text-lg font-medium'>
      {tabs.map(m => {
        return (
          <button
            key={m.name}
            disabled={disabled}
            className={clsx(
              m.value === value
                ? 'font-bold text-white lg:font-medium'
                : 'text-[#C4C4C4]',
              !disabled && 'hover:opacity-80'
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
