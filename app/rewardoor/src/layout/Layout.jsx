import React from 'react'
import { useAccount } from 'wagmi'
import { useNavigate } from 'react-router-dom'

export default function LayoutAdmin ({ children }) {
  const { isConnected } = useAccount()

  if (!isConnected) {
    useNavigate('/aboard')
  }

  return (
    <div className='flex flex-col min-h-screen dark:bg-black bg-[#FBFDFF]'>
      <div className='relative flex-auto overflow-x-hidden overflow-y-auto'>
        {children}
      </div>
    </div>
  )
}
