import React from 'react';
import clsx from 'clsx';
import { useLoaderData } from 'react-router-dom';

export default function AssetTabList ({ disabled, tabs, value, onSelect, className }) {
  const { isLightTheme } = useLoaderData();

  const colorConfig = {
    light: {
      defaultTextColor: '#6D6C6E',
      activeTextColor: '#000000',
      bottomLineColor: '#000000',
      hoverTextColor: '#000000',
      activeBackgroundColor: 'rgba(0, 0, 0)',
    },
    dark: {
      defaultTextColor: '#c4c4c4',
      activeTextColor: '#904bf6',
      bottomLineColor: '#904bf6',
      hoverTextColor: '#904bf6',
      activeBackgroundColor: 'rgba(255, 255, 255, 0.1)',
    }
  };

  const theme = isLightTheme ? 'light' : 'dark';
  const colors = colorConfig[ theme ];

  const getStyles = (tabValue) => {
    const baseStyles = 'lg:px-4 lg:py-1 rounded relative lg:w-max flex-grow text-center transition-colors duration-200';
    const activeStyles = tabValue === value
      ? 'lg:bg-opacity-10 lg:after:hidden after:absolute after:inset-x-0 after:bottom-[-8px] after:h-0.5'
      : '';
    const hoverStyles = !disabled ? 'hover:opacity-80' : '';

    return clsx(
      baseStyles,
      activeStyles,
      hoverStyles,
      className
    );
  };

  return (
    <div className='flex items-center justify-around text-md font-md lg:justify-start gap-x-6'>
      { tabs.map(tab => (
        <button
          key={ tab.name }
          disabled={ disabled }
          className={ getStyles(tab.value) }
          onClick={ () => onSelect(tab.value) }
          style={ {
            color: tab.value === value ? colors.activeTextColor : colors.defaultTextColor,
            '--bottom-line-color': colors.bottomLineColor, // CSS custom property
          } }
        >
          { tab.name }
          { tab.value === value && (
            <span
              className="absolute inset-x-0 bottom-[-8px] h-0.5"
              style={ { backgroundColor: 'var(--bottom-line-color)' } }
            />
          ) }
        </button>
      )) }
    </div>
  );
}