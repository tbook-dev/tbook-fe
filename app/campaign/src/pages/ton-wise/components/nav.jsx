import { Link } from 'react-router-dom';
import BackIcon from '@/images/icon/svgr/back.svg?react';

export default function Nav({ title, children }) {
  return (
    <div className="relative flex items-center justify-between pl-8">
      <Link to="/wise-score" className="absolute left-0">
        <BackIcon />
      </Link>
      <h2 className="text-2xl font-thin">{title}</h2>
      {children}
    </div>
  );
}
