import React from 'react'
import { Web3Button } from '@web3modal/react'

function Header () {
  return (
    <header className='px-4 py-2 lg:px-20 lg:py-2.5'>
      <div className='flex items-center justify-end h-10 lg:h-16'>
        <div className='flex items-center space-x-3'>
          <Web3Button icon='hide' balance='icon' avatar='hide' />
        </div>
      </div>
    </header>
  )
}

export default Header
