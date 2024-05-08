import { Link } from 'react-router-dom'

export default function Breadcrumb ({ items, separator = '>' }) {
  const len = items.length
  return (
    <div className='text-sm font-medium flex item-center'>
      {items.map((item, index) => {
        return item.href ? (
          <span key={index}>
            <Link to={item.href} className='text-c-6'>
              {item.title}
            </Link>
            {index < len - 1 && (
              <span className='text-t-1 mx-2'>{separator}</span>
            )}
          </span>
        ) : (
          <span key={index} className='text-t-1 text-sm'>
            {item.title}
          </span>
        )
      })}
    </div>
  )
}
