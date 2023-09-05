import pageConf from '../pageConf'
import { useInViewport, useResponsive } from 'ahooks'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { updateHeaderTransparent } from '@/store/global'

export default function Banner () {
  const ref = useRef(null)
  const [inViewport] = useInViewport(ref)
  const dispatch = useDispatch()
  const { pc } = useResponsive()

  useEffect(() => {
    dispatch(updateHeaderTransparent(!!inViewport))
  }, [inViewport])

  return (
    <div
      ref={ref}
      className='relative lg:min-h-[855px] pt-[136px] pb-[80px] lg:py-0 flex flex-col justify-center'
    >
      <div className='absolute inset-0'>
        <picture>
          <source
            media='(min-width: 1120px)'
            srcSet={pageConf.picMask}
            className='absolute inset-0 w-full'
          />
          <source
            media='(max-width: 1120px)'
            srcSet={pageConf.picMaskMoble}
            className='absolute inset-0 w-full'
          />

          <img
            src={pageConf.picMask}
            className='absolute inset-0 w-full'
          />
        </picture>

        <div className='hidden lg:bx lg:flex h-full justify-end items-center relative'>
          <img
            src={pageConf.pic}
            className='w-[733] h-[639px] object-center object-contain'
          />
        </div>
      </div>
      <div className='lg:w-bx mx-auto w-3/4 text-center lg:text-left relative'>
        <h1 className='text-[32px] lg:text-[40px] font-bold lg:w-[602px] mb-5 lg:mb-4'>
          {pc
            ? pageConf.titleList.map(v => (
                <span key={v}>
                  {v}
                  <br />
                </span>
              ))
            : pageConf.title}
        </h1>
        <h3 className='text-base lg:text-xl font-medium'>
          {pageConf.description}
        </h3>
      </div>
    </div>
  )
}
