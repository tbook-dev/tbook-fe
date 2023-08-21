import Logo from '@/components/logo'
import bannerUrl from '@/images/aboard-banner.png'
import bannerBg from '@/images/aboard-bg.png'
import metaMask from '@/images/icon/metamask.svg'
import walletconnect from '@/images/icon/walletconnect.svg'
import useSignIn  from '@/hooks/useSignIn'
import Button from '@/components/button'
import { useNavigate } from 'react-router-dom'
import { useAccount } from 'wagmi'
import { Web3Button } from '@web3modal/react'
import { useEffect } from 'react'
import { host } from '@/api/incentive'

const titleList = ['Incentivize core', 'communities', 'and builders']
const p = 'grant easily and optimize continuously '

const h1 = 'Get Started on TBOOK'
const h1Text =
  'TBOOK is your one-stop for branding, marketing, growth and analysis for Web3. Connect your wallet now and start setting up Campaigns.'

export default function Aboard () {
  const { isConnected } = useAccount()
  const navigate = useNavigate()
  const { loading, handleSignIn } = useSignIn()

  useEffect(() => {
    if (isConnected) {
      fetch(`${host}/info`, {
        method: 'GET',
        credentials: 'include'
      }).then(r => {
        if (r.status === 401) {
          handleSignIn()
        } else {
          navigate('/')
        }
      })
    }
  }, [isConnected])

  return (
    <div className='flex h-screen'>
      <div className='select-none	w-1/2 relative bg-b-1 rounded-r-4xl flex items-center justify-center'>
        <Logo />
        <div className='w-[592px] relative pt-[220px]'>
          <img src={bannerUrl} className='absolute top-0 left-0 w-full' />
          <img src={bannerBg} className='absolute top-0 left-0 w-full' />

          <div className='flex flex-col relative z-10'>
            {titleList.map((item, index) => (
              <h3
                key={index}
                className='text-6.5xl font-extrabold text-colorful1'
              >
                {item}
              </h3>
            ))}
            <p className='mt-3 text-3xl font-extrabold'>{p}</p>
          </div>
        </div>
      </div>
      <div className='w-1/2  flex items-center justify-center'>
        <div className='w-[560px]'>
          <h1 className='text-5xl font-extrabold'>{h1}</h1>
          <p className='text-base font-medium'>{h1Text}</p>
          <div className='mt-10 space-y-6'>
            {isConnected ? <div className='flex items-center space-x-4'>
              <Web3Button/>
              Loading……
            </div> :<>
            <Button
              className='w-full text-base font-bold text-white'
              onClick={() => handleSignIn(false)}
              loading={loading}
            >
              <img src={metaMask} className='mr-3 w-5 h-5 object-contain' />
              MetaMask
            </Button>
            <Button className='w-full text-base font-bold text-white' onClick={() => handleSignIn(true)}>
              <img
                src={walletconnect}
                className='mr-3 w-5 h-5 object-contain'
              />
              WalletConnect
            </Button>
            </>}
          </div>
        </div>
      </div>
    </div>
  )
}
