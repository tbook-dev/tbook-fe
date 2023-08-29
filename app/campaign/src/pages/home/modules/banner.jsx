import pageConf from '../pageConf'

export default function Banner () {
  return (
    <div className='relative lg:min-h-[645px] flex flex-col justify-center'>
      <div className='absolute inset-0'>
        <img
          src={pageConf.picMask}
          className='absolute inset-0 w-full h-full object-center object-cover'
        />
        <div className='hidden lg:bx lg:flex h-full justify-end items-center relative'>
          <img
            src={pageConf.pic}
            className='w-[733] h-[639px] object-center object-contain'
          />
        </div>
      </div>
      <div className='lg:w-bx mx-auto text-center lg:text-left relative'>
        <h1 className='text-[32px] lg:text-5xl font-black lg:w-[602px] mb-5 lg:mb-4'>
          {pageConf.title}
        </h1>
        <h3 className='text-base lg:text-xl font-medium'>
          {pageConf.description}
        </h3>
      </div>
    </div>
  )
}
