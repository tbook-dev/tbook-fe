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
      return false
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
  const projectName = 'Project1'
  return (
    <div className='grid grid-cols-2 gap-x-16 pt-20'>
      <div className='w-[310px] rounded bg-b-1'>
        <div>{projectName}</div>
        {sideMenu.map(v => {
          return <div key={v.link}>{v.title}</div>
        })}
      </div>

      <div className='rounded bg-b-1'>{children}</div>
    </div>
  )
}
