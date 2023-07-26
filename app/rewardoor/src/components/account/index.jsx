import { useAccount } from 'wagmi'
import { shortAddress } from '@tbook/utils/lib/conf'
import eth from '@/images/icon/eth.svg'

export default function Account () {
  const { address } = useAccount()
  return (
    <div className='w-[200px] h-10 p-1 rounded-2.5xl bg-black shadow-s1 ml-6 mr-2'>
      <div className='flex items-center justify-between h-full'>
        <div className='flex'>
          <img src={eth} className='ml-2.5 mr-4' />
          <span className='text-sm font-bold ml-0.5'>
            {shortAddress(address)}
          </span>
        </div>
        <button className='w-8 h-8 rounded-full flex justify-center items-center text-base font-bold text-c-9 bg-b-1 lg:hover:opacity-70'>
          ···
        </button>
      </div>
    </div>
  )
}
