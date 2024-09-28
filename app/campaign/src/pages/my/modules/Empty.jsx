import emptyIcon from '@/images/icon/empty.svg'
import emptyPurpleIcon from '@/images/icon/empty-purple.svg'
import clsx from 'clsx'

export default function Empty ({ text, type = 'white' }) {

  return (
    <div className='flex flex-col items-center justify-center p-5'>
      <img src={ type === 'white' ? emptyIcon : emptyPurpleIcon } 
        alt='empty' 
        className='h-[100px] w-[100px] mb-2.5' />
      <p className='text-sm text-[#717374]'>{text}</p>
    </div>
  )
}
