import logo3 from './images/project-logo/Carry3.svg';
import logo4 from './images/project-logo/goplus4.svg';
import logo5 from './images/project-logo/mask5.svg';
import logo6 from './images/project-logo/societyX6.svg';
import logo7 from './images/project-logo/UAE7.svg';
import logoX from './images/icons/x.svg';
import logoMedium from './images/icons/medium.svg';

export const moduleConf = {
  left: {
    title: 'Driving adoption and understanding of the future',
  },
  right: {
    title: ['Join waitlist for', 'the TBook Incentive Layer'],
    iconList: [logo3, logo4, logo5, logo6, logo7],
    desc: 'Trusted by GoPlus and more projects...',
    btn: 'Join Waitlist',
    verifyBtn: 'Enter Invite Code',
    verify: ['Already have an invitation code? ', 'Start incentivizing'],
    apply: ['Do not have an invitation code? ', 'Apply here'],
    accounts: [
      {
        type: 'x',
        logo: logoX,
        name: 'X',
        link: 'https://twitter.com/realtbook',
        socialName: 'realtbook',
        svg: (
          <svg
            width='40'
            height='40'
            viewBox='0 0 40 40'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='fill-white/60 group-hover:fill-white'
          >
            <path d='M29.3958 6H34.1458L23.7685 17.8605L35.9765 34H26.4178L18.931 24.2115L10.3644 34H5.61162L16.7111 21.3138L4.99992 6H14.8014L21.5687 14.9471L29.3958 6ZM27.7287 31.1569H30.3607L13.3712 8.69374H10.5468L27.7287 31.1569Z' />
          </svg>
        ),
      },
      {
        type: 'medium',
        logo: logoMedium,
        name: 'Medium',
        link: 'https://medium.com/@tbookcommunity',
        socialName: 'tbookcommunity',
        svg: (
          <svg
            width='40'
            height='40'
            viewBox='0 0 40 40'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='fill-white/60 group-hover:fill-white'
          >
            <path d='M22.3061 20.2225C22.3061 25.8683 17.7604 30.4454 12.1529 30.4454C6.54534 30.4454 2 25.8697 2 20.2225C2 14.5753 6.54568 10 12.1529 10C17.7601 10 22.3061 14.5767 22.3061 20.2225ZM33.4443 20.2225C33.4443 25.5374 31.1713 29.8455 28.3677 29.8455C25.5641 29.8455 23.2911 25.536 23.2911 20.2225C23.2911 14.9091 25.5641 10.5995 28.3677 10.5995C31.1713 10.5995 33.4443 14.9091 33.4443 20.2225ZM38 20.2225C38 24.9844 37.2005 28.8443 36.2145 28.8443C35.2285 28.8443 34.429 24.983 34.429 20.2225C34.429 15.4621 35.2285 11.6007 36.2148 11.6007C37.2012 11.6007 38 15.461 38 20.2225Z' />
          </svg>
        ),
      },
    ],
  },
};
