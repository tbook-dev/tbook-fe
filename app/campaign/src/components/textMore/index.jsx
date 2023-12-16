import { useEffect, useState, useRef } from 'react'
import downIcon from '@/images/icon/down.svg'
import clsx from 'clsx'
import { useResponsive } from 'ahooks'

export default function TextMore ({ text }) {
  const [showMore, setShowMore] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  const { pc } = useResponsive()
  const textRef = useRef(null)
  useEffect(() => {
    if (textRef.current) {
      const { offsetHeight, scrollHeight } = textRef.current
      if (scrollHeight > offsetHeight) {
        setHasMore(true)
      }
    }
  }, [text])

  return (
    <div
      className='flex gap-x-5 cursor-pointer'
      onClick={() => {
        setShowMore(v => !v)
      }}
    >
      <div
        className={clsx(!showMore && (pc ? 'line-clamp-3' : 'line-clamp-2'))}
        ref={textRef}
      >
        {text}
      </div>
      {hasMore && (
        <img
          src={downIcon}
          className={clsx(
            'w-4 h-4 mx-auto cursor-pointer',
            showMore && 'rotate-90'
          )}
        />
      )}
    </div>
  )
}
