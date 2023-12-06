import notConnectIcon from '@/images/icon/not-connect.svg'
import { useDispatch } from 'react-redux'
import { setLoginModal } from '@/store/global'

const defaultText = 'Log in to reveal your rewards and campaigns.'
export default function NotConnect ({ text = defaultText }) {
  const dispath = useDispatch()

  return (
    <div className='flex flex-col items-center'>
      <img src={notConnectIcon} alt='not connect' className='mb-10 w-[215px]' />
      <p className='text-[#717374] text-sm mb-3'>{text}</p>
      <button
        onClick={() => {
          dispath(setLoginModal(true))
        }}
        className='py-1 px-4 bg-[#006EE9] text-white rounded-md'
      >
        Connect Wallet
      </button>
    </div>
  )
}
