import pointIcon from '@/images/icon/point.svg';
import nftIcon from '@/images/icon/nft.svg';
import sbtIcon from '@/images/icon/nft.svg';
import fcfsIcon from '@/images/icon/fcfs.svg';
import ldIcon from '@/images/icon/ld.svg';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const incentiveAssetsTypeList = [
  { icon: nftIcon, text: 'NFT', value: 1 },
  { icon: pointIcon, text: 'POINTS', value: 2 },
  { icon: sbtIcon, text: 'SBT', value: 3 },
];

export const rewardDistributionMethod = [
  {
    label: 'Airdrop',
    value: 1,
  },
  {
    label: 'Claim',
    value: 2,
  },
];

export const incentiveMethodList = [
  // {
  //   title: "Anyone who get the credentials",
  //   desc: "Anyone who gets the credentials can claim the reward.",
  //   value: 1,
  // },
  {
    title: 'FCFS',
    desc: `FCFS is one of the reward distribution methods which stands for "First come, first served". It means that whoever gets the credentials first can claim the reward first.`,
    pop: `It's a "first come, first served" opportunity which means who participate and accomplish tasks early are prioritized for rewards. As soon as the predetermined reward pool is depleted, subsequent participants accomplishing the tasks miss out on receiving rewards.`,
    value: 1,
    icon: fcfsIcon,
  },
  {
    title: 'Lucky Draw',
    desc: `Lucky draw is one of the reward distribution methods which means that a random selection of participants from those who meet the requirements.`,
    pop: `It’s a 'lucky draw' opportunity which means participants who meet the requirements have a chance to be randomly selected for rewards.`,
    value: 2,
    icon: ldIcon,
  },
];

export const campaignStatusList = [
  {
    label: 'Draft',
    cname: '草稿',
    value: 0,
  },
  {
    label: 'Scheduled',
  },
];

export const twParttern = /https?:\/\/twitter\.com\/([a-zA-Z0-9_]+)/;

export const getTwitterId = (url) => {
  const match = url.match(twParttern);
  if (match) {
    return match[1];
  }
  return '';
};

export const mediaTypes = [
  {
    label: 'Use a Template',
    value: 1,
  },
  {
    label: 'Upload',
    value: 2,
  },
];

//我现在是用groupType这个来区分下面的tag的，var groupType: Int, // 0 - default，1 - Governance，2 - community, 3 - Trade , 4 - ProductTest, 5 -My
export const groupTypeMap = {
  // 0: "default",
  1: 'Governance',
  2: 'community',
  3: 'Trade',
  4: 'ProductTest',
  5: 'My',
};

const labelTypeMap = {
  twitter: [
    {
      label: 'Twitter Like',
      value: 1,
    },
    {
      label: 'ReTweet Link',
      value: 2,
    },
    {
      label: 'Twitter Spaces',
      value: 3,
    },
    {
      label: 'Twitter Follows',
      value: 11,
    },
  ],
  discord: [
    {
      label: 'Join Discord Service',
      value: 4,
    },
    {
      label: 'Verify Discord role',
      value: 5,
    },
  ],
  telegram: [
    {
      label: 'Join Telegram Group',
      value: 6,
    },
    {
      label: 'Join Telegram Channel',
      value: 7,
    },
    {
      label: 'Subscribe to Telegram Premium',
      value: 22,
    },
  ],
  tbook: [
    {
      label: 'Visit a Page or Site',
      value: 8,
    },
    {
      label: 'Sign Message',
      value: 10,
    },
    {
      label: 'snapshot',
      value: 12,
    },
  ],
};

export const getCrenditialType = (labelType) => {
  // map to groups
  const arraryType = [];
  for (let k in labelTypeMap) {
    const sublist = labelTypeMap[k].map((v) => ({ ...v, group: k }));
    arraryType.push(...sublist);
  }
  return arraryType.find((v) => v.value === labelType)?.group;
};
export const sbtClaimStatus = [
  {
    label: 'DEFAULT',
    value: 0,
    title: (name) => `${name} is Ineligible!`,
  },
  {
    label: 'NOT_GENERATE_LINK',
    value: 1,
    title: (name) => `${name} is eligible!`,
  },
  {
    label: 'ELIGIBLE',
    value: 2,
    title: (name) => `${name} is eligible!`,
  },
  {
    label: 'MINTING',
    value: 3,
    title: (name) => `${name} is pending on TON Society!`,
  },
  {
    label: 'CLAIMED',
    value: 4,
    title: (name) => `${name} is now in your wallet!`,
  },
  {
    label: 'MISSED',
    value: 5,
  },
];
// 结束点为活动结束时间
export const credentialStatus = [
  {
    name: 'Ineligible', // default
    value: 0,
    tip: '',
    title: (name) => `${name} is Ineligible!`,
  },
  {
    name: 'Eligible',
    value: 1,
    title: (name) => `${name} is eligible!`,
    tip: '',
    showButton: true,
  },
  // {
  // label: 'Claim',
  // name: 'Claim不可点击',
  // value: 2, //目前没有白名单了，这个保留但是逻辑上不会显示
  //  'You could claim your reward after whitelist updated.',
  // },
  {
    name: 'Claim可点击',
    value: 3, //在抽奖当中
    tip: "Let's see if you're one of the winners after the draw.",
    title: (name) => `${name} is eligible!`,
    showButton: false,
  },
  {
    name: 'Claimed',
    value: 4,
    tip: 'You claimed your reward! 🎉',
    title: () => 'Awesome!',
    showButton: false,
  },
  {
    name: 'Missed',
    value: 5,
    tip: 'Miss the reward this time.\n More explore, better luck next time!',
    title: () => 'Almost there!',
    showButton: false,
  },
];

export const campaignStatus = [
  {
    label: 'Ongoing',
    value: 1,
    color: '#65C467',
  },
  {
    label: 'Scheduled',
    value: 2,
    color: '#3A82F7',
  },
  // {
  //   label: "Draft",
  //   value: 0,
  //   color: '#999999'
  // },
  {
    label: 'Completed',
    value: 3,
    color: '#666',
  },
  // {
  //   label: "Suspended",
  //   value: 4,
  // },
  // {
  //   label: "Terminated",
  //   value: 5,
  // },
];
