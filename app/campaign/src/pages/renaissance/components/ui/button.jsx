import React from 'react';

// background: linear-gradient(90deg, rgba(255, 234, 181, 0.35) 0%, rgba(242, 168, 93, 0.35) 26%, rgba(128, 82, 228, 0.35) 50%, rgba(46, 133, 234, 0.35) 74.5%, rgba(104, 239, 174, 0.35) 100%);
const Button = () => (
  <button className='group relative mb-2 me-2 p-0.5 inline-flex items-center justify-center overflow-hidden rounded-lg'>
    <span className='relative rounded-md bg-linear9 px-4 py-1.5 transition-all duration-75 ease-in group-active:[transform:translate3d(0,1px,0)] text-white'>
      Purple to blue
    </span>
  </button>
);

export default Button;
