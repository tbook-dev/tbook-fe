import clsx from 'clsx'
import { useCurrentProject } from '@tbook/hooks'
import { useNavigate, useMatch } from 'react-router-dom'

const sideMenu = [
  {
    title: 'Overview',
    link: '/dashboard/overview',
    validator: function (match) {
      return match(this.link)
    }
  },
  {
    title: 'Incentive Campaign',
    link: '/dashboard/campaign',
    validator: function (match) {
      const links = ['/dashboard/campaign', '/dashboard/campaign/:id']
      return links.filter(match).length > 0
    }
  },
  {
    title: 'Incentive Assets',
    link: '/dashboard/assets',
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
    <div className='flex justify-between	pt-20 w-[1280px] mx-auto text-white'>
      <div className='w-[288px] h-[418px] bg-[#191919] rounded-3xl font-bold'>
        <div className='bg-black'>
          <div
            className={clsx(
              'pt-[30px] rounded-3xl pb-[42px] text-center text-2xl bg-gray',
              validatorSucessIdx === 0 ? 'rounded-bl-none' : 'rounded-b-none'
            )}
          >
            {project?.projectName}
          </div>
        </div>

        <div className='mb-[50px] bg-black'>
          {sideMenu.map((v, idx) => {
            return (
              <div
                key={v.link}
                className={clsx(
                  validatorSucessIdx === idx
                    ? 'pl-4 bg-[#191919]'
                    : v.disabled
                    ? 'cursor-not-allowed'
                    : 'cursor-pointer'
                )}
                onClick={() => {
                  if (validatorSucessIdx !== idx && !v.disabled) {
                    navigate(v.link)
                  }
                }}
              >
                <div
                  className={clsx(
                    'text-base flex justify-center items-center relative',
                    validatorSucessIdx === idx
                      ? 'bg-black h-10 rounded-l-3xl'
                      : 'h-14 bg-[#191919]',
                    // 下一个
                    idx + 1 === validatorSucessIdx && 'rounded-br-3xl',
                    // 上一个
                    idx - 1 === validatorSucessIdx && 'rounded-tr-3xl'
                  )}
                >
                  {validatorSucessIdx === idx && (
                    <div className='absolute h-4 w-4 rounded-full left-4 bg-cw1' />
                  )}
                  {v.title}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className='w-[928px]'>{children}</div>
    </div>
  )
}
