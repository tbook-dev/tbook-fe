import clsx from 'clsx'
import { useCurrentProject } from '@tbook/hooks'
import { useNavigate, useMatch, Outlet } from 'react-router-dom'
import Account from '@/components/account'
import Logo from '@/components/logo'

const sideMenu = [
  {
    title: 'Overview',
    link: '/overview',
    validator: function (match) {
      return match(this.link)
    }
  },
  {
    title: 'Incentive Campaign',
    link: '/campaign',
    validator: function (match) {
      const links = ['/new-campaign', '/campaign', '/campaign/:id']
      return links.filter(match).length > 0
    }
  },
  {
    title: 'Incentive Asset',
    link: '/assets',
    validator: function (match) {
      return match(this.link)
    }
  },
  {
    title: 'User Profiling',
    link: '/profile',
    disabled: true,
    validator: function (match) {
      return match(this.link)
    }
  },
  {
    title: 'Settings',
    link: '/settings',
    disabled: true,
    validator: function (match) {
      return match(this.link)
    }
  }
]

export default function Layout ({ children }) {
  const project = useCurrentProject()
  const validatorSucessIdx = sideMenu.findIndex(v => v.validator(useMatch))
  const navigate = useNavigate()

  return (
    <div className='w-full min-h-screen text-white flex'>
      <div className='w-[240px] bg-b-1 pl-2 pb-20 rounded-r-4xl relative select-none overflow-hidden flex flex-col justify-between'>
        <div className='bg-black'>
          <Logo />
          <div
            className={clsx(
              'pt-[133px] pb-[38px] pl-8 uppercase text-base leading-none font-bold bg-b-1',
              validatorSucessIdx === 0 && 'rounded-br-2xl'
            )}
          >
            {project?.projectName}
          </div>

          <div className='bg-black'>
            {sideMenu.map((v, idx) => {
              return (
                <div
                  key={v.link}
                  className={clsx(
                    validatorSucessIdx === idx
                      ? 'pl-4 bg-[#191919] text-[#C8C8C8]'
                      : v.disabled
                      ? 'cursor-not-allowed text-c-6'
                      : 'cursor-pointer text-c-6'
                  )}
                  onClick={() => {
                    if (validatorSucessIdx !== idx && !v.disabled) {
                      navigate(v.link)
                    }
                  }}
                >
                  <div
                    className={clsx(
                      'text-base pl-8 font-bold flex items-center relative',
                      validatorSucessIdx === idx
                        ? 'bg-black h-10 rounded-l-2xl'
                        : 'h-14 bg-[#191919]',
                      // 下一个
                      idx + 1 === validatorSucessIdx && 'rounded-br-2xl',
                      // 上一个
                      idx - 1 === validatorSucessIdx && 'rounded-tr-2xl'
                    )}
                  >
                    {validatorSucessIdx === idx && (
                      <div className='absolute h-4 w-4 rounded-full left-4 bg-cw1 hidden' />
                    )}
                    {v.title}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <Account />
      </div>

      <div className='w-[1080px] ml-10 pt-20'>
        <Outlet />
      </div>
    </div>
  )
}
