import { useRef, useMemo } from 'react'
import { list } from './conf'
import { useSize, useHover } from 'ahooks'
import Swiper from '@/components/Swiper'

export default function Solution () {
  return (
    <>
      <div className='py-7 bg-black'>
        <Swiper list={list} />
      </div>

      <div className='bx mb-10 lg:mb-[144px]'>xxx</div>
    </>
  )
}
