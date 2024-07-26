import { Link } from 'react-router-dom';
import BackIcon from '@/images/icon/svgr/back.svg?react';
import { cn } from '@/utils/conf';

export default function Nav({
  to,
  title,
  children,
  algin = 'center',
  justify = 'between',
}) {
  return (
    <div
      className={cn('relative flex justify-between pl-8', {
        'items-center': algin === 'center',
        'items-start': algin === 'top',
        'justify-between ': justify === 'between',
        'justify-center ': justify === 'center',
      })}
    >
      <Link to={to} className="absolute left-0">
        <BackIcon />
      </Link>
      {title && <h2 className="text-2xl font-thin">{title}</h2>}
      {children}
    </div>
  );
}
