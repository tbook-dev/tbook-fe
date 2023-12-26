import { useAccount } from 'wagmi'
import { disconnect } from '@wagmi/core'
// import { shortAddress } from '@tbook/utils/lib/conf'
// import eth from '@/images/icon/eth.svg'
import useUserInfo from '@/hooks/queries/useUserInfo'
import { Popover, Typography } from 'antd'
import { logout } from '@/utils/web3'
import Address from '@tbook/ui/src/Address'

const { Paragraph } = Typography

export default function Account () {
  const { address } = useAccount()
  const { user } = useUserInfo()
  const handleLogout = () => {
    Promise.all([logout(), disconnect()]).then(() => {
      window.location.reload()
    })
  }
  return (
    <div className='w-[200px] h-10 p-1 rounded-2.5xl bg-black shadow-s1 mx-auto'>
      <div className='flex items-center justify-between h-full'>
        <div className='flex'>
          {/* <img src={eth} className='ml-2.5 mr-4' /> */}
          <span className='text-sm font-bold ml-2.5'>
            <Address address={user?.wallet || address} placement='right'/>
          </span>
        </div>
        <Popover
          trigger='click'
          placement='top'
          content={
            <button onClick={handleLogout} className='lg:hover:opacity-70'>
              Disconnect
            </button>
          }
        >
          <button className='w-8 h-8 rounded-full flex justify-center items-center text-base font-bold text-c-9 bg-b-1 lg:hover:opacity-70'>
            ···
          </button>
        </Popover>
      </div>
    </div>
  )
}
