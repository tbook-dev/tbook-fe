import logo1 from './images/project-logo/ArchLoot1.svg';
import logo2 from './images/project-logo/Avatar2.svg';
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
    iconList: [logo1, logo2, logo3, logo4, logo5, logo6, logo7],
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
      },
      {
        type: 'medium',
        logo: logoMedium,
        name: 'Medium',
        link: 'https://medium.com/@tbookcommunity',
        socialName: 'tbookcommunity',
      },
    ],
  },
};
