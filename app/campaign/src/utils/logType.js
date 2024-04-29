// login type 的配置文件
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
    weight: 2,
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
    weight: 1,
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
