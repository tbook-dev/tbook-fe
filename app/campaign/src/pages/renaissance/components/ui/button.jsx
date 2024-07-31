import React from 'react';
import { cn } from '@/utils/conf';
import { LoadingOutlined } from '@ant-design/icons';

const Button = ({ className, isLoading, children = null, ...props }) => (
  <button
    disabled={isLoading}
    className={cn(
      'group relative font-syne border border-[#FFEAB5] inline-flex items-center justify-center overflow-hidden rounded-lg gap-x-1 bg-linear9 px-4 py-1.5 transition-all duration-75 ease-in group-active:[transform:translate3d(0,1px,0)] text-white',
      className
    )}
    {...props}
  >
    {children} {isLoading && <LoadingOutlined />}
  </button>
);

export default Button;
