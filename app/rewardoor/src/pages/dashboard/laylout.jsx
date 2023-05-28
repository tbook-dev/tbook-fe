import clsx from 'clsx'
import { useCurrentProject } from '@tbook/hooks'
const sideMenu = [
  {
    title: 'Overview',
    link: 'overview',
    validator: function () {
      return false
    }
  },
  {
    title: 'Incentive Campaign',
    link: 'campaign',
    validator: function () {
      return true
    }
  },
  {
    title: 'Incentive Assets',
    link: 'assets',
    validator: function () {
      return false
    }
  },
  {
    title: 'User Profiling',
    link: 'profile',
    validator: function () {
      return false
    }
  },
  {
    title: 'Settings',
    link: 'settings',
    validator: function () {
      return false
    }
  }
]

export default function Layout ({ children }) {
  const project = useCurrentProject()
  const validatorSucessIdx = sideMenu.findIndex(v => v.validator())

  return (
    <div className='flex justify-between	pt-20 w-[1280px] mx-auto text-white'>
      <div className='w-[288px] bg-[#191919] rounded-3xl font-bold'>
        <div className='pt-[30px]  pb-[42px] text-center text-2xl'>
          {project?.projectName}
        </div>
        <div className='mb-[50px] bg-black'>
          {sideMenu.map((v, idx) => {
            return (
              <div
                key={v.link}
                className={clsx(
                  validatorSucessIdx === idx
                    ? 'pl-4 bg-[#191919]'
                    : 'cursor-pointer'
                )}
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
