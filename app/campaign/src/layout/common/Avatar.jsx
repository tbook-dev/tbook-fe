import { useState, useCallback } from 'react'
import { Popover, Drawer } from 'antd'
import { useResponsive } from 'ahooks'
import useUserInfo from '@/hooks/useUserInfoQuery'
import { shortAddress } from '@tbook/utils/lib/conf'
import logoutIcon from '@/images/icon/logout.svg'
import useSocial from '@/hooks/useSocial'
import clsx from 'clsx'
import { useDispatch } from 'react-redux'
import { setConnectWalletModal } from '@/store/global'
import { logout } from '@/utils/web3'
import { useAccount } from 'wagmi'
import { disconnect } from '@wagmi/core'

export default function Avatar () {
  const [open, setOpen] = useState(false)
  const { pc } = useResponsive()
  const { user, data } = useUserInfo()
  const { socialList } = useSocial()
  const { isConnected } = useAccount()
  const dispatch = useDispatch()
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
  const Content = () => {
    return (
      <div className='space-y-16 lg:w-[375px]'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-x-5'>
            <img
              src={user?.avatar}
              className='w-12 h-12 rounded-full object-center'
            />
            <div>
              <div className='text-lg text-[#131517] font-medium'>
                {user?.wallet ? (
                  shortAddress(user?.wallet)
                ) : (
                  <button
                    className='text-[#006EE9]'
                    onClick={handleConnectWallet}
                  >
                    Connect Wallet
                  </button>
                )}
              </div>
              {data?.userTwitter?.connected && (
                <div className='flex items-center gap-x-0.5 text-[#717374] text-base'>
                  {`@${data?.userTwitter?.twitterUserName}`}
                  <img
                    src={socialList.find(v => v.name === 'twitter')?.activePic}
                    className='w-5 h-5 object-center'
                  />
                </div>
              )}
            </div>
          </div>

          <img
            src={logoutIcon}
            className='w-6 h-6 object-center cursor-pointer'
            alt='logout'
            onClick={handleLogout}
          />
        </div>

        <div className='space-y-6'>
          {socialList
            .filter(v =>
              data?.userTwitter?.connected && v.name === 'twitter'
                ? false
                : true
            )
            .map(v => {
              return (
                <button
                  key={v.name}
                  onClick={!v.connected ? v.loginFn : null}
                  className='flex items-center gap-x-3'
                  target='_blank'
                  disabled={v.connected}
                  rel='nofollow noopener noreferrer'
                >
                  <img
                    src={v.connected ? v.activePic : v.picUrl}
                    className='w-5 h-5 object-contain object-center'
                  />

                  <span
                    className={clsx(
                      'text-base',
                      v.connected
                        ? 'text-[#006EE9]'
                        : 'text-[#717374] capitalize'
                    )}
                  >
                    {v.connected ? `@${v.userName}` : `Connect ${v.name}`}
                  </span>
                </button>
              )
            })}
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
        className='h-7 flex items-center gap-x-1 lg:pr-4 rounded-xl bg-white cursor-pointer'
      >
        <img
          src={user?.avatar}
          className='w-7 h-7 rounded-full object-center'
        />
        <span className='hidden lg:block text-base text-[#333]'>
          {user?.wallet
            ? shortAddress(user?.wallet)
            : data?.userTwitter?.twitterUserName}
        </span>
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
        <Content />
      </Drawer>
    </>
  )
}
