import clsx from 'clsx'
import { useLoaderData } from 'react-router-dom'

export default function AssetTabList ({ disabled, tabs, value, onSelect, className }) {

  const colorConfig = {
    light: {
      defaultTextColor: '#6D6C6E',
      activeTextColor: '#000000',
      bottomLineColor: '#000000',
    },
    dark: {
      defaultTextColor: '#c4c4c4',
      activeTextColor: '#904bf6',
      bottomLineColor: '#904bf6',
    }
  }

  const getStyles = ({ value, m, disabled }) => {
    const { isLightTheme } = useLoaderData()
    const theme = isLightTheme ? 'light' : 'dark';
    const colors = colorConfig[ theme ];

    const baseStyles = 'lg:px-4 lg:py-1 rounded relative lg:w-max flex-grow text-center';
    
    const themeStyles = `text-[${colors.defaultTextColor}]`;

    const activeStyles = m.value === value
      ? `lg:bg-[rgb(255,255,255)]/[0.1] lg:after:hidden after:absolute after:inset-x-0 after:bottom-[-8px] after:h-0.5 after:bg-[${colors.bottomLineColor}] text-[${colors.activeTextColor}]`
      : `text-[${colors.defaultTextColor}]`;

    const hoverStyles = !disabled && `hover:text-[${colors.activeTextColor}]`;

    return clsx(
      baseStyles,
      themeStyles,
      activeStyles,
      hoverStyles,
      className
    );
  }

  return (
    <div className='flex items-center justify-around text-md font-md lg:justify-start gap-x-6'>
      { tabs.map(m => {
        return (
          <button
            key={ m.name }
            disabled={ disabled }
            className={ getStyles({ value, m, disabled }) }
            onClick={ () => {
              onSelect(m.value)
            } }
          >
            { m.name }
          </button>
        )
      }) }
    </div>
  )
}