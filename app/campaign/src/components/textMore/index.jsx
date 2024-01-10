import { useEffect, useState, useRef } from 'react'
import downIcon from '@/images/icon/down.svg'
import clsx from 'clsx'
import { useResponsive } from 'ahooks'
import { merge } from 'lodash'
const defaultTextConf = {
  moble: 'line-clamp-2',
  pc: 'line-clamp-3'
}
export default function TextMore ({ text, textConf = defaultTextConf }) {
  const [showMore, setShowMore] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  const { pc } = useResponsive()
  const textRef = useRef(null)
  const finalConf = merge({}, defaultTextConf, textConf)
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
      className={clsx('flex gap-x-5', hasMore ? 'cursor-pointer' : '')}
      onClick={() => {
        setShowMore(v => !v)
      }}
    >
      <div
        className={clsx(!showMore && (pc ? finalConf.pc : finalConf.moble))}
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
