import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { configResponsive } from 'ahooks'
import routes from './router'
import { Spin } from 'antd'




configResponsive({
  pc: 1120
})

function App () {

  return (
    <RouterProvider
      router={createBrowserRouter(routes)}
      fallbackElement={
        <div className='flex flex-col items-center justify-center h-[300px]'>
          <Spin />
        </div>
      }
    />
  )
}

export default App
