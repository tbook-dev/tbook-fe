import { useState, useCallback, useMemo } from 'react'
import { Popover, Drawer, Tooltip } from 'antd'
import { useResponsive } from 'ahooks'
import useUserInfo from '@/hooks/useUserInfoQuery'
// import { shortAddress } from '@tbook/utils/lib/conf'
import walletGrayIcon from '@/images/icon/wallet-gray.svg'
import useSocial from '@/hooks/useSocial'
import { useDispatch } from 'react-redux'
import { setConnectWalletModal } from '@/store/global'
import { logout } from '@/utils/web3'
import { useAccount } from 'wagmi'
import { disconnect } from '@wagmi/core'
import { Link, useParams, useLoaderData } from 'react-router-dom'
import Address from '@tbook/ui/src/Address'

export default function Avatar () {
  const [open, setOpen] = useState(false)
  const { pc } = useResponsive()
  const { user, data } = useUserInfo()
  const { socialList } = useSocial()
  const { isConnected } = useAccount()
  const dispatch = useDispatch()
  const { projectName } = useParams()
  const { isUsingSubdomain } = useLoaderData()
  const handleConnectWallet = useCallback(() => {
    setOpen(false)
    dispatch(setConnectWalletModal(true))
  }, [])
  const handleLogout = useCallback(async () => {
    await logout()
    if (isConnected) {
      await disconnect()
    }
    location.href = location
  }, [isConnected])
  const links = useMemo(() => {
    return [
      {
        name: 'Campaigns',
        path: `${isUsingSubdomain ? '' : `/${projectName}`}/campaign`
      },
      {
        name: 'Assets',
        path: `${isUsingSubdomain ? '' : `/${projectName}`}/asset`
      }
    ]
  }, [projectName])

  const Content = () => {
    return (
      <div className='lg:w-[375px] text-white'>
        <div className='flex flex-col items-center gap-y-2  text-lg font-medium mb-4'>
          <img
            src={user?.avatar}
            className='w-10 h-10 border-2 border-[rgb(255,255,255)]/[0.2] rounded-full object-center'
          />
          <div>
            {/* 优先展示wallet,然后就是tw */}
            {user?.wallet ? (
              <Address address={user?.wallet} />
            ) : (
              data?.userTwitter?.connected && (
                <div className='flex items-center gap-x-0.5 text-[#717374] text-base'>
                  {`@${data?.userTwitter?.twitterUserName}`}
                  <img
                    src={socialList.find(v => v.name === 'twitter')?.activePic}
                    className='w-5 h-5 object-center'
                  />
                </div>
              )
            )}
          </div>
        </div>

        <div className='flex items-center justify-center gap-x-3 pb-4 border-b border-[#8148C6] lg:border-[#353535]'>
          {!user?.wallet && (
            <button
              onClick={handleConnectWallet}
              rel='nofollow noopener noreferrer'
            >
              <img
                src={walletGrayIcon}
                alt='wallet connect'
                className='w-6 h-6 object-contain object-center'
              />
            </button>
          )}
          {socialList
            .filter(v => {
              if (v.name === 'twitter') {
                return data?.userTwitter?.connected && !user?.wallet
                  ? false
                  : true
              } else {
                return true
              }
            })
            .map(v => {
              return v.connected ? (
                <Tooltip key={v.name} title={`@${v.userName}`}>
                  <img
                    src={v.connected ? v.activePic : v.picUrl}
                    className='w-6 h-6 object-contain object-center'
                  />
                </Tooltip>
              ) : (
                <button
                  key={v.name}
                  onClick={() => v.loginFn(false)}
                  rel='nofollow noopener noreferrer'
                >
                  <img
                    src={v.connected ? v.activePic : v.picUrl}
                    className='w-6 h-6 object-contain object-center'
                  />
                </button>
              )
            })}
        </div>
        <div className='flex flex-col px-6 py-4 gap-y-4 text-lg border-b border-[#8148C6] lg:border-[#353535]'>
          {links.map(v => {
            return (
              <Link
                key={v.name}
                to={v.path}
                className='text-[#C0ABD9] lg:text-[#c4c4c4] lg:hover:text-white'
                target='_blank'
                onClick={() => {
                  setOpen(false)
                }}
              >
                {v.name}
              </Link>
            )
          })}
        </div>

        <div className='px-6 py-4'>
          <button
            className='text-[#C0ABD9] text-lg lg:text-[#c4c4c4] lg:hover:text-white'
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    )
  }
  const AvatarLine = () => {
    return (
      <div
        onClick={() => {
          setOpen(true)
        }}
        className='flex items-center gap-x-1 rounded-xl cursor-pointer'
      >
        <img
          src={user?.avatar}
          className='h-6 w-6 rounded-full object-center'
        />
      </div>
    )
  }
  return pc ? (
    <Popover
      open={open}
      content={<Content />}
      placement='bottomRight'
      title={null}
      trigger='click'
      onOpenChange={v => {
        setOpen(v)
      }}
    >
      <AvatarLine />
    </Popover>
  ) : (
    <>
      <AvatarLine />
      <Drawer
        placement='bottom'
        closable={false}
        open={open}
        contentWrapperStyle={{
          borderRadius: '24px 24px 0px 0px',
          overflow: 'hidden'
        }}
        onClose={() => {
          setOpen(false)
        }}
      >
        <div className='-mx-6'>
          <Content />
        </div>
      </Drawer>
    </>
  )
}
