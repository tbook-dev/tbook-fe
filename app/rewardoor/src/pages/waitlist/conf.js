import logo1 from './images/project-logo/1.svg';
import logo2 from './images/project-logo/2.svg';
import logo3 from './images/project-logo/3.svg';
import logo4 from './images/project-logo/4.svg';
import logo5 from './images/project-logo/5.svg';
import logo6 from './images/project-logo/6.svg';
import logoX from './images/icons/x.svg';
import logoMedium from './images/icons/medium.svg';

export const moduleConf = {
  left: {
    title: 'Driving adoption and understanding of the future',
  },
  right: {
    title: ['Join waitlist for', 'the TBook Incentive Layer'],
    iconList: [logo1, logo2, logo3, logo4, logo5, logo6],
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
