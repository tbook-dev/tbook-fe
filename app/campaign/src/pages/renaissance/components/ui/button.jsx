import React from 'react';
import { cn } from '@/utils/conf';

const Button = ({ className, ...props }) => (
  <button
    className={cn(
      'group relative border border-[#FFEAB5] inline-flex items-center justify-center overflow-hidden rounded-lg bg-linear9 px-4 py-1.5 transition-all duration-75 ease-in group-active:[transform:translate3d(0,1px,0)] text-white',
      className
    )}
    {...props}
  />
);

export default Button;
