import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import './github-markdown-light.css'
import { useEffect, useState, useRef } from 'react'
import clsx from 'clsx'
import { useEventListener } from 'ahooks'

export default function Markdown ({ children }) {
  const [showMore, setShowMore] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  const textRef = useRef(null)
  useEffect(() => {
    calcFn()
  }, [])

  const calcFn = () => {
    if (textRef.current) {
      const { offsetHeight, scrollHeight } = textRef.current
      if (scrollHeight > offsetHeight) {
        setHasMore(true)
      }else{
        setHasMore(false)
      }
      console.log('calcFn', offsetHeight, scrollHeight)
    }
  }

  useEventListener('resize', calcFn)

  return (
    <div className={clsx(hasMore ? 'mb-[104px]' : 'mb-16', ' relative')}>
      <div
        className={clsx(
          'relative',
          showMore ? '' : 'max-h-[180px] overflow-hidden',
          hasMore &&
            !showMore &&
            'after:absolute after:inset-0 after:bg-linear4'
        )}
        ref={textRef}
        onLoad={calcFn}
      >
        <ReactMarkdown
          className='markdown-body'
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            code ({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, '')}
                  style={coldarkDark}
                  language={match[1]}
                  PreTag='div'
                  showLineNumbers={false}
                  {...props}
                />
              ) : (
                <code className={className} {...props} children={children} />
              )
            }
          }}
        >
          {children}
        </ReactMarkdown>
      </div>
      {hasMore && (
        <button
          onClick={() => setShowMore(v => !v)}
          className={clsx(
            showMore ? 'mt-2' : '-mt-5',
            'text-white font-medium px-5 py-2 bg-black border border-[#333] rounded-full text-sm absolute left-1/2 -translate-x-1/2'
          )}
        >
          {showMore ? 'Show Less' : 'Show More'}
        </button>
      )}
    </div>
  )
}
