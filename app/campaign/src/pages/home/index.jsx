import tbookIcon from '@/images/icon/tbook.svg'

const textConf = {
  title: 'TBOOK Twitter Campaign',
  officalName: 'TBOOK'
}
export default function () {
  return (
    <div className='space-y-8 px-4 lg:px-0 lg:w-[880px] mx-auto pt-8 pb-16 lg:pt-10 lg:pb-20 h-[300px] text-t-1'>
      <div>
        <h2 className='text-2xl font-bold mb-3'>{textConf.title}</h2>
        <h4 className='flex items-center gap-x-1 text-sm font-semibold'>
          <img src={tbookIcon} className='w-8 h-8 object-contain mr-2' />
          <span className='text-c-6'>by</span>
          <span>{textConf.officalName}</span>
        </h4>
      </div>
    </div>
  )
}
