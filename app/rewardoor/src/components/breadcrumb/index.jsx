import { Link } from 'react-router-dom';
import clsx from 'clsx';
export default function Breadcrumb({ items, separator = '>' }) {
  const len = items.length;
  return (
    <div className="text-sm font-medium flex items-center">
      {items.map((item, index) => {
        return item.href ? (
          <span key={index}>
            <Link
              to={item.href}
              className={
                !item.title
                  ? 'h-4 w-20 bg-[#1f1f1f] animate-pulse inline-block'
                  : 'text-c-6 hover:text-white hover:underline hover:underline-offset-2'
              }
            >
              {item.title}
            </Link>
            {index < len - 1 && (
              <span className="text-t-1 mx-2">{separator}</span>
            )}
          </span>
        ) : (
          <span
            key={index}
            className={
              !item.title
                ? 'h-12 w-20 bg-[#1f1f1f] animate-pulse'
                : 'text-t-1 text-sm'
            }
          >
            {item.title}
          </span>
        );
      })}
    </div>
  );
}
