import clsx from 'clsx'
import { useLoaderData } from 'react-router-dom'

export default function TabList ({ disabled, tabs, value, onSelect }) {
  const { isLightTheme } = useLoaderData()

  return (
    <div className='flex items-center justify-between text-lg font-medium lg:justify-start gap-x-6'>
      {tabs.map(m => {
        return (
          <button
            key={m.name}
            disabled={disabled}
            className={clsx(
              'lg:px-4 lg:py-1 rounded relative w-[100px] lg:w-max',
              isLightTheme ? 'text-[#904bf6]' : 'text-[#c4c4c4]',
              m.value === value
                ? 'lg:bg-[rgb(255,255,255)]/[0.1] lg:after:hidden after:absolute after:inset-x-0 after:bottom-[-17px] after:h-0.5 after:bg-[#904bf6]'
                : isLightTheme ? 'text-[#9a81e6]' : 'text-[#c4c4c4]',
              !disabled && (isLightTheme ? 'hover:text-[#904bf6]': 'hover:text-white')
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
