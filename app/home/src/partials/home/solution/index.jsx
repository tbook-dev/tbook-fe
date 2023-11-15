import { useRef, useMemo } from 'react'
import { list } from './conf'
import { useSize, useHover } from 'ahooks'

export default function Solution () {
  const containerRef = useRef()
  const listRef = useRef()
  const listBakRef = useRef()
  const containerSize = useSize(containerRef)
  const listSize = useSize(listRef)
  const isListHovering = useHover(listRef)
  const isListBakHovering = useHover(listBakRef)
  const List = useMemo(
    () =>
      list.map((item, index) => (
        <img
          key={index}
          src={item.src}
          alt='logo'
          className='flex flex-grow-0 flex-shrink-0 basis-auto w-[200px] h-[55px] px-8 object-center object-contain'
        />
      )),
    []
  )
  console.log(
    'listSize?.width > containerSize?.width',
    listSize?.width > containerSize?.width,
    listSize,
    containerSize,
    isListHovering,
    isListBakHovering
  )
  return (
    <>
      <div className='py-7 bg-black'>
        {/* <div
          ref={containerRef}
          className='box-border relative flex flex-wrap overflow-x-scroll motion-safe:overflow-x-hidden'
        >
          <div
            ref={listRef}
            className={`flex flex-nowrap whitespace-nowrap ${
              listSize?.width > containerSize?.width
                ? `motion-safe:animate-marquee motion-safe:hover:pause delay-200 ${
                    isListHovering || isListBakHovering
                      ? 'motion-safe:pause'
                      : ''
                  }`
                : ''
            }`}
          >
            {List}
          </div>
          {listSize?.width > containerSize?.width ? (
            <div
              ref={listBakRef}
              className={`flex absolute top-0 flex-nowrap motion-safe:animate-marquee2 whitespace-nowrap motion-safe:hover:pause delay-200 ${
                isListHovering || isListBakHovering ? 'motion-safe:pause' : ''
              }`}
            >
              {List}
            </div>
          ) : (
            ''
          )}
        </div> */}
        <div
          ref={containerRef}
          className='box-border relative flex flex-wrap  overflow-x-scroll motion-safe:overflow-x-hidden'
        >
          <div
            ref={listRef}
            className={`flex flex-nowrap whitespace-nowrap ${
              listSize?.width > containerSize?.width
                ? `motion-safe:animate-marquee motion-safe:hover:pause delay-200 ${
                    isListHovering || isListBakHovering
                      ? 'motion-safe:pause'
                      : ''
                  }`
                : ''
            }`}
          >
            {List}
          </div>
          {/* the same list above to combine the marquee animate  */}
          {listSize?.width > containerSize?.width ? (
            <div
              ref={listBakRef}
              className={`flex absolute top-0 flex-nowrap motion-safe:animate-marquee2 whitespace-nowrap motion-safe:hover:pause delay-200 ${
                isListHovering || isListBakHovering ? 'motion-safe:pause' : ''
              }`}
            >
              {List}
            </div>
          ) : (
            ''
          )}
        </div>
      </div>

      <div className='bx mb-10 lg:mb-[144px]'>xxx</div>
    </>
  )
}
