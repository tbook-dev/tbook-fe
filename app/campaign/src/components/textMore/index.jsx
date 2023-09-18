import { useEffect, useState, useRef } from 'react'
import downIcon from '@/images/icon/down.svg'
import clsx from 'clsx'

export default function TextMore ({ text }) {
  const [showMore, setShowMore] = useState(false)
  const [hasMore, setHasMore] = useState(false)

  const textRef = useRef(null)
  useEffect(() => {
    if (textRef.current) {
      const { scrollWidth, clientWidth } = textRef.current
      if (scrollWidth > clientWidth) {
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
        className={clsx('text-[#68696B] text-sm', !showMore && 'truncate')}
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
