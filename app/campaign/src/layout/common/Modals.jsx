import ConnectWalletModal from '@/components/connectWallet';
import SocialModal from '@/components/withVerify/social';
import PassportGen from '@/components/passportGen';
import MergeAccount from '@/components/account/MergeAccount';
import Inconsistent from '@/components/inconsistent';
import UnbindAccount from '@/components/account/UnbindAccount';
import UnbindTonModal from '@/components/account/UnbindTonModal';

export default function () {
  return (
    <>
      <ConnectWalletModal />
      <SocialModal />
      <PassportGen />
      <MergeAccount />
      <Inconsistent />
      <UnbindAccount />
      <UnbindTonModal />
    </>
  );
}
