import clsx from 'clsx'
import useUserInfo from "@/hooks/useUserInfoQuery"
import { useNavigate, Outlet, NavLink } from 'react-router-dom'
import Account from '@/components/account'
import Logo from '@/components/logo'

const sideMenu = [
  {
    title: 'Overview',
    link: '/',
    key: 'overview'
  },
  {
    title: 'Incentive Campaign',
    link: '/campaign',
    key: 'campaign'
  },
  {
    title: 'Incentive Asset',
    link: '/assets',
    key: 'assets'
  },
  {
    title: 'User Profiling',
    // link: '/profile',
    link: 'jvascript:void(0)',
    disabled: true,
    key: 'profile'
  },
  {
    title: 'Settings',
    // link: '/settings',
    link: 'jvascript:void(0)',
    disabled: true,
    key: 'settings'
  }
]

export default function Layout ({ children }) {
  const {project} = useUserInfo()
  
  // const validatorSucessIdx = sideMenu.findIndex(v => v.validator(useMatch))
  const navigate = useNavigate()

  return (
    <div className='w-full min-h-screen text-white flex'>
      <div className='w-[240px] bg-b-1 pl-2 pb-20 rounded-r-4xl relative select-none overflow-hidden flex flex-col justify-between'>
        <div className='bg-black'>
          <Logo />
          <div
            className={clsx(
              'pt-[133px] pb-[38px] pl-8 uppercase text-base leading-none font-bold bg-b-1'
              // validatorSucessIdx === 0 && 'rounded-br-2xl'
            )}
          >
            {project?.projectName}
          </div>

          <div className='bg-black'>
            {sideMenu.map((v, idx) => {
              return (
                <NavLink to={v.link} key={v.key}>
                  {({ isActive }) => {
                    return (
                      <div
                        key={`${v.title}-${idx}`}
                        className={clsx(
                          isActive
                            ? 'pl-4 bg-[#191919] text-[#C8C8C8]'
                            : v.disabled
                            ? 'cursor-not-allowed pointer-events-none text-c-6'
                            : 'cursor-pointer text-c-6'
                        )}
                      >
                        <div
                          className={clsx(
                            'text-base pl-8 font-bold flex items-center relative',
                            isActive
                              ? 'bg-black h-10 rounded-l-2xl'
                              : 'h-14 bg-[#191919]'
                            // 下一个
                            // idx + 1 === validatorSucessIdx && 'rounded-br-2xl',
                            // 上一个
                            // idx - 1 === validatorSucessIdx && 'rounded-tr-2xl'
                          )}
                        >
                          {isActive && (
                            <div className='absolute h-4 w-4 rounded-full left-4 bg-cw1 hidden' />
                          )}
                          {v.title}
                        </div>
                      </div>
                    )
                  }}
                </NavLink>
              )
            })}
          </div>
        </div>

        <Account />
      </div>

      <div className='w-[1080px] ml-10 pt-20'>
        {children}
        <Outlet />
      </div>
    </div>
  )
}
