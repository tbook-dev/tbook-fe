export default function ({ botLink, inviteHelpLink }) {
  return (
    <div className='space-y-2'>
      <div className='text-sm font-medium text-c-9 flex justify-between'>
        <div>
          <span className='text-[#FF5151] me-1'>*</span>
          Invite Tbook Bot as an admin to your server
        </div>
        <a
          className='underline text-[#717374] hover:opacity-70 hover:text-white hover:underline'
          href={inviteHelpLink}
          target='_blank'
        >
          How to invite ?
        </a>
      </div>
      <div>
        <a
          href={botLink}
          target='_blank'
          className='hover:text-white bg-clip-text	text-transparent bg-gradient-to-l  from-[#904BF6] to-[#CF0063] relative after:h-px after:absolute after:-bottom-1 after:inset-x-0 after:bg-gradient-to-r  after:from-[#904BF6] after:to-[#CF0063]'
        >
          Invite bot
        </a>
      </div>
    </div>
  );
}
