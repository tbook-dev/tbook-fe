import tonIcon from '@/images/icon/ton.svg';
import ton2Icon from '@/images/icon/ton2.svg';
import ethIcon from '@/images/icon/eth.svg';
import metaMask from '@/images/icon/metamask.svg';
import walletconnect from '@/images/icon/walletconnect.svg';
import logoSvg from '@/images/icon/logo.svg';

export default {
  evm: {
    network: {
      name: 'ethereum',
      value: 1,
      picUrl: ethIcon,
      displayName: 'Ethereum',
    },
    connector: [
      {
        name: 'metaMask',
        value: 1,
        picUrl: metaMask,
        displayName: 'MetaMask',
      },
      {
        name: 'walletconnect',
        value: 2,
        picUrl: walletconnect,
        displayName: 'WalletConnect',
      },
    ],
  },
  ton: {
    network: {
      name: 'ton',
      value: 2,
      picUrl: tonIcon,
      displayName: 'TON',
    },
    connector: [
      {
        name: 'tonConnect',
        value: 1,
        picUrl: ton2Icon,
        displayName: 'TON Connect',
      },
    ],
  },
  page: {
    title: 'Connect Wallet to Set Up Your Campaigns',
    logo: logoSvg,
  },
};
