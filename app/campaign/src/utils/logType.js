// login type 的配置文件
import suiBg from '@/images/zklogin/suibg.svg';
import walletconnectSVG from '@/images/zklogin/walletconnect.svg';
import tonSVG from '@/images/icon/ton.svg';
import suiSVG from '@/images/zklogin/sui.svg';
import suiBlackSVG from '@/images/zklogin/sui-black.svg';
import googleBg from '@/images/zklogin/google-bg.svg';
import facebookBg from '@/images/zklogin/facebook-bg.svg';
import twitchBg from '@/images/zklogin/twitch-bg.svg';
import talkBg from '@/images/zklogin/talk-bg.svg';
import xSVG from '@/images/icon/x-white.svg';

//----------------- passport card 展示顺序--------------------------
// 在ton之中，优先展示TON地址>SUI地址>EVM地址
// 地址展示顺序
export const TMAAddressList = ({ tonAddress, zkAddress, evmAddress }) => [
  {
    type: 'ton',
    address: tonAddress,
    weight: 3,
  },
  {
    type: 'zk',
    address: zkAddress,
    weight: 2,
  },
  {
    type: 'evm',
    address: evmAddress,
    weight: 1,
  },
];

// 浏览器之中，优先展示SUI地址>TON地址>EVM地址
export const webAddressList = ({ tonAddress, zkAddress, evmAddress }) => [
  {
    type: 'ton',
    address: tonAddress,
    weight: 2,
  },
  {
    type: 'zk',
    address: zkAddress,
    weight: 3,
  },
  {
    type: 'evm',
    address: evmAddress,
    weight: 1,
  },
];

// social 展示
export const TMAsocialList = ({ twitterName, tgName }) => [
  {
    type: 'twitter',
    name: twitterName,
    weight: 1,
  },
  {
    type: 'telegram',
    name: tgName,
    weight: 2,
  },
];

export const webSocialList = ({ twitterName, tgName }) => [
  {
    type: 'twitter',
    name: twitterName,
    weight: 1,
  },
  {
    type: 'telegram',
    name: tgName,
    weight: 2,
  },
];

export const webConnectWallect = {
  1: 'zkLogin',
  2: ['walletconnect'],
};

export const TMAconnectWallect = {
  1: 'tonConnect',
  2: ['walletconnect'],
};

export const walletMap = {
  zkLogin: {
    name: 'zkLogin',
    bg: suiBg,
    icon: suiSVG,
    picUrl: suiBlackSVG,
    logoBgList: [
      {
        name: 'google',
        url: googleBg,
        style: {
          left: 0,
          top: 0,
          transform: 'rotate(7deg)',
        },
      },
      {
        name: 'facebook',
        url: facebookBg,
        style: {
          left: 58,
          top: 12,
          transform: 'rotate(7deg)',
        },
      },
      {
        name: 'twitch',
        url: twitchBg,
        style: {
          right: 70,
          top: -4,
          transform: 'rotate(-6.995deg)',
        },
      },
      {
        name: 'talk',
        url: talkBg,
        style: {
          right: 5,
          top: 8,
          transform: 'rotate(0deg)',
        },
      },
    ],
  },

  walletconnect: {
    type: 'walletconnect',
    picUrl: walletconnectSVG,
    text: 'WalletConnect',
  },

  tonConnect: {
    type: 'tonConnect',
    picUrl: tonSVG,
    text: 'TON Connect',
  },

  // 聚合social
  social: [
    {
      type: 'twitter',
      picUrl: xSVG,
      text: 'Log in with X',
    },
  ],

  // 聚合wallet
  wallet: [
    {
      type: 'walletconnect',
      picUrl: walletconnectSVG,
      text: 'WalletConnect',
    },
  ],
};
