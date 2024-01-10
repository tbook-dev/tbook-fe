import emptyIcon from '@/images/icon/empty.svg'

export default function Empty ({ text }) {
  return (
    <div className='flex flex-col items-center justify-center p-5'>
      <img src={emptyIcon} alt='empty' className='h-[100px] w-[100px] mb-2.5' />
      <p className='text-sm text-[#717374]'>{text}</p>
    </div>
  )
}
