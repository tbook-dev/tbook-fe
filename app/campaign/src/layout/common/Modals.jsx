import ConnectWalletModal from "@/components/connectWallet";
import SocialModal from "@/components/withVerify/social";
import PassportGen from "@/components/passportGen";
import MergeAccount from "@/components/account/MergeAccount";

export default function () {
  return (
    <>
      <ConnectWalletModal />
      <SocialModal />
      <PassportGen />
      <MergeAccount />
    </>
  );
}
