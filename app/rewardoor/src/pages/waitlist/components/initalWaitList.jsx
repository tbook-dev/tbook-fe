import { Link } from 'react-router-dom';
import logo1 from '../images/project-logo/1.svg';
import logo2 from '../images/project-logo/2.svg';
import logo3 from '../images/project-logo/3.svg';
import logo4 from '../images/project-logo/4.svg';
import logo5 from '../images/project-logo/5.svg';
import logo6 from '../images/project-logo/6.svg';
import logoX from '../images/icons/x.svg';
import logoMedium from '../images/icons/medium.svg';

const moduleConf = {
  left: {
    title: 'Driving adoption and understanding of the future',
  },
  right: {
    title: ['Join waitlist for', 'the TBook Incentive Layer'],
    iconList: [logo1, logo2, logo3, logo4, logo5, logo6],
    desc: 'Trusted by GoPlus and more projects...',
    btn: 'Join Waitlist',
    verify: ['Already have an invitation code? ', 'Start incentivizing'],
    accounts: [
      {
        type: 'x',
        logo: logoX,
        name: 'X',
        link: '',
        socialName: 'realtbook',
      },
      {
        type: 'medium',
        logo: logoMedium,
        name: 'Medium',
        link: '',
        socialName: 'tbookcommunity',
      },
    ],
  },
};

export default function InitalWaitList ({ handleNextStep }) {
  return (
    <div className='grid grid-cols-2 gap-2.5'>
      <div className='text-[68px] font-medium text-[rgb(225,205,255)]/90 flex items-center justify-center'>
        {moduleConf.left.title}
      </div>
      <div className='items-center my-6 p-20 rounded-[32px] bg-black/20 drop-shadow border border-white/20 flex flex-col justify-between gap-y-[120px]'>
        <div>
          <h2 className='text-4xl w-[460px] mb-10 text-center'>
            {moduleConf.right.title[0]}
            <br />
            <span className='ms-1 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#7E6CA5] to-80%'>
              {moduleConf.right.title[1]}
            </span>
          </h2>
          <div className='flex items-center justify-center mb-4'>
            {moduleConf.right.iconList.map((v, i) => (
              <img
                src={v}
                key={v}
                alt='project logo'
                className='size-14 -ml-2 rounded-full  ring-2 ring-[#1E1032] relative'
                style={{ zIndex: i }}
              />
            ))}
          </div>
          <p className='text-sm text-[rgb(225,205,255)]/70 text-center'>
            {moduleConf.right.desc}
          </p>
        </div>
        <div className='space-y-4 px-[50px] w-full'>
          <button
            className='bg-[#904BF6] text-white rounded-lg font-zen-dot block py-2 w-full'
            onClick={handleNextStep}
          >
            {moduleConf.right.btn}
          </button>
          <p className='text-[rgb(225,205,255)]/70 text-sm text-center'>
            {moduleConf.right.verify[0]}
            <Link className='text-[#904BF6]' to='/waitlist/verify'>
              {moduleConf.right.verify[1]}
            </Link>
          </p>
        </div>
        <div className='flex items-center divide-x'>
          {moduleConf.right.accounts.map(v => {
            return (
              <div className='flex items-center gap-x-3 px-8' key={v.type}>
                <img className='size-10' src={v.logo} alt='social logo' />
                <div className='space-y-0.5 text-[rgb(255,255,255)]/60'>
                  <p>{v.name}</p>
                  <p>@{v.socialName}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
