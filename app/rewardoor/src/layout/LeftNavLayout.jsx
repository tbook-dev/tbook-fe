import clsx from 'clsx'
import useUserInfo from '@/hooks/queries/useUserInfo'
import { useNavigate, Outlet, NavLink } from 'react-router-dom'
import Account from '@/components/account'
import Logo from '@/components/logo'

const sideMenu = [
  // {
  //   title: 'Overview',
  //   link: '/',
  //   key: 'overview'
  // },
  {
    title: 'Incentive Campaign',
    link: '/',
    key: 'campaign'
  },
  {
    title: 'Incentive Asset',
    link: '/assets',
    key: 'assets'
  },
  // {
  //   title: 'User Profiling',
  //   // link: '/profile',
  //   link: 'jvascript:void(0)',
  //   disabled: true,
  //   key: 'profile'
  // },
  {
    title: 'Settings',
    // link: '/settings',
    link: 'jvascript:void(0)',
    disabled: true,
    key: 'settings'
  }
]

export default function Layout ({ children }) {
  const { project } = useUserInfo()

  // const validatorSucessIdx = sideMenu.findIndex(v => v.validator(useMatch))
  const navigate = useNavigate()

  return (
    <div className='w-full min-h-screen text-white flex pl-[280px]'>
      <div className='w-[240px] bg-b-1 pl-2 pb-20 rounded-r-4xl fixed left-0 inset-y-0 select-none overflow-hidden flex flex-col justify-between'>
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
                            ? 'bg-[#191919] text-[#C8C8C8]'
                            : v.disabled
                            ? 'cursor-not-allowed pointer-events-none text-c-6'
                            : 'cursor-pointer text-c-6'
                        )}
                      >
                        <div
                          className={clsx(
                            'text-base pl-8 h-14 font-bold flex items-center relative',
                            isActive
                              ? 'bg-black py-2 rounded-l-2xl'
                              : 'bg-[#191919]'
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

      <div className='w-[1080px] mx-auto pt-20 flex flex-col'>
        {children}
        <Outlet />
      </div>
    </div>
  )
}
