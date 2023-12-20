import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import './github-markdown-light.css'
import { useEffect, useState, useRef } from 'react'
import clsx from 'clsx'

export default function Markdown ({ children }) {
  const [showMore, setShowMore] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  const textRef = useRef(null)
  useEffect(() => {
    calcFn()
  }, [children])

  const calcFn = () => {
    if (textRef.current) {
      const { offsetHeight, scrollHeight } = textRef.current
      if (scrollHeight > offsetHeight) {
        setHasMore(true)
      }
    }
  }

  const handleOnload = () => {
    calcFn()
  }

  return (
    <div className='mb-16'>
      <div
        className={clsx(showMore ? '' : 'max-h-[180px] overflow-hidden')}
        ref={textRef}
        onLoad={handleOnload}
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
          className='text-[#904BF6] mt-1'
        >
          {showMore ? 'Show Less' : 'Show More'}
        </button>
      )}
    </div>
  )
}
