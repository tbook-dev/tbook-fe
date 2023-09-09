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
    <>
      <div className='space-y-2 lg:space-y-0'>
        <div
          className={clsx('text-c-9', !showMore && 'truncate')}
          ref={textRef}
        >
          {text}
        </div>
      </div>

      {hasMore && (
        <img
          src={downIcon}
          className={clsx(
            'w-4 h-4 mx-auto mt-2 cursor-pointer',
            showMore && 'rotate-180'
          )}
          onClick={() => {
            setShowMore(v => !v)
          }}
        />
      )}
    </>
  )
}
