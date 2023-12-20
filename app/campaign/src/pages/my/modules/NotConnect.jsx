import emptyIcon from '@/images/icon/empty.svg'
import { useDispatch } from 'react-redux'
import { setLoginModal } from '@/store/global'

const defaultText = 'Log in to reveal your rewards and campaigns.'
export default function NotConnect ({ text = defaultText }) {
  const dispath = useDispatch()

  return (
    <div className='flex flex-col items-center justify-center lg:h-[400px] lg:bg-[#0F081A] lg:rounded-xl'>
      <img src={emptyIcon} alt='not connect' className='mb-10 w-[215px]' />
      <p className='text-[#717374] text-sm mb-3'>{text}</p>
      <button
        onClick={() => {
          dispath(setLoginModal(true))
        }}
        className='py-1 px-4 text-white bg-[#904BF6] rounded-md'
      >
        Log In
      </button>
    </div>
  )
}
