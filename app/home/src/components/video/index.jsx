import React, { useEffect, useRef } from 'react'

function VideoPlayer ({ src, className }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current

    const playVideo = () => {
      if (video.paused) {
        video.play().catch(error => {
          // 自动播放失败，可以在此处进行错误处理
          console.error('自动播放失败:', error)
        })
      }
    }

    const handleInteraction = () => {
      document.removeEventListener('touchstart', handleInteraction)
      playVideo()
    }

    document.addEventListener('touchstart', handleInteraction)

    return () => {
      document.removeEventListener('touchstart', handleInteraction)
    }
  }, [])

  return (
    <video ref={videoRef} muted autoPlay loop playsInline className={className}>
      <source src={src} type='video/mp4' />
      Your browser does not support the video tag.
    </video>
  )
}

export default VideoPlayer
