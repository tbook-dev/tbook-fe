import Button from '@/components/button'
import bg from '@/images/home-bg.png'
import { useProjects } from '@tbook/hooks'
import { useNavigate } from 'react-router-dom'
import { useAccount } from 'wagmi'
import { useSignIn } from '@tbook/hooks'
import { useWeb3Modal } from '@web3modal/react'

export default function () {
  const navigate = useNavigate()
  const { isConnected } = useAccount()
  const projects = useProjects()
  const { loading, handleSignIn } = useSignIn()

  const { isOpen, open, close, setDefaultChain } = useWeb3Modal()

  function handleClick () {
    if (isConnected) {
      if (projects.length > 0) {
        // 所有的活动页面
        navigate(`/dashboard/overview`)
      } else {
        navigate(`/new-project`)
      }
    } else {
      handleSignIn()
    }
  }

  function wcClick () {
    if (!isConnected) {
      open()
    } else {
      handleSignIn()
    }
  }

  return (
    <div
      className='w-full  bg-[center_top_1rem]'
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className='w-[800px] mx-auto pt-[280px]'>
        <div className='text-center mb-8'>
          <h2 className='text-colorful1 font-bold text-6xl'>
            Incentivize core
          </h2>
          <h2 className='text-colorful1 font-bold text-6xl'>
            communities and builders
          </h2>
          <p className='text-white text-3xl'>
            grant easily and optimize continuously
          </p>
        </div>
        <div className='flex justify-center'>
          <Button
            type='primary'
            className='mr-6'
            onClick={handleClick}
            loading={loading}
          >
            {isConnected
              ? projects.length > 0
                ? 'Dashboard'
                : 'New Project'
              : 'Connect Wallet'}
            {/* Get Started */}
          </Button>
          <Button onClick={wcClick}>Wallet Connect</Button>
          <Button>Developer Center</Button>
        </div>
      </div>
    </div>
  )
}
