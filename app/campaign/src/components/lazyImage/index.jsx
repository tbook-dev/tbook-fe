import { useState, useEffect } from 'react'
import clsx from 'clsx'

export default function ({ src, alt, className }) {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    if (!src) return
    const img = new Image()
    img.src = src
    img.onload = () => {
      setLoaded(true)
    }
  }, [src])
  return loaded ? (
    <img src={src} alt={alt} className={className} />
  ) : (
    <div className={clsx('animate-pulse bg-[#1f1f1f]', className)} />
  )
}
