import { useState } from 'react'
import { Spin } from 'antd'
import clsx from 'clsx'

export default function ActionBution ({
  className,
  handleAsync,
  children,
  replace = false
}) {
  const [loading, setLoad] = useState(false)
  const handleClick = () => {
    setLoad(true)
    handleAsync()
      .then(() => {
        setLoad(false)
      })
      .catch(() => {
        setLoad(false)
      })
  }
  return (
    <button
      disabled={loading}
      onClick={handleClick}
      className={clsx(className, 'gap-x-2')}
    >
      {replace ? (
        loading ? (
          <Spin size='small' />
        ) : (
          children
        )
      ) : (
        <>
          {children}
          {loading && <Spin size='small' />}
        </>
      )}
    </button>
  )
}
