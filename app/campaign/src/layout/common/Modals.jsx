import ConnectWalletModal from "@/components/connectWallet";
import SocialModal from "@/components/withVerify/social";
import PassportGen from "@/components/passportGen";

export default function () {
  return (
    <>
      <ConnectWalletModal />
      <SocialModal />
      <PassportGen />
    </>
  );
}
