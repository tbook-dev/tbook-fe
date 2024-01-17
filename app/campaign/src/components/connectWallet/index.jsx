import { useSelector } from "react-redux";
import { useResponsive } from "ahooks";
import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { setLoginModal, setConnectWalletModal } from "@/store/global";
import { loginUsingTwitterUrl } from "@/api/incentive";
import WalletWeb3Modal from "./walletWeb3Modal";
import useUserInfo from "@/hooks/useUserInfoQuery";
import { useAccount, useWalletClient } from "wagmi";
import { changeAccountSignIn, logout, preGetNonce, isIOS } from "@/utils/web3";
import suiBg from "@/images/zklogin/suibg.svg";
import metamaskSVG from "@/images/zklogin/metamask.svg";
import walletconnectSVG from "@/images/zklogin/walletconnect.svg";
import suiSVG from "@/images/zklogin/sui.svg";
import xSVG from "@/images/icon/x-white.svg";
import ActionBution from "./actionButton";
import useSocial from "@/hooks/useSocial";
import Modal from "./modal";
import { Tooltip } from "antd";
import passportlg from "@/images/passport-lg.png";
import lockSVG from "@/images/lock.svg";

const moduleConf = {
  title: "Log in or create a wallet with",
  passport: "Log in to unlock incentive passport",
  zkLogin: {
    name: "zkLogin",
    bg: suiBg,
  },

  wallet: [
    // {
    //   type: 'metamask',
    //   picUrl: metamaskSVG,
    //   text: 'Metamask'
    // },
    {
      type: "walletconnect",
      picUrl: walletconnectSVG,
      text: "WalletConnect",
    },
    // {
    //   type: 'sui',
    //   picUrl: suiSVG,
    //   text: 'Sui Wallet'
    // }
  ],

  social: [
    {
      type: "twitter",
      picUrl: xSVG,
      text: "Log in with X",
    },
  ],
};

const ConnectWalletModal = () => {
  const showConnectWalletModal = useSelector(
    (s) => s.global.showConnectWalletModal
  );
  const { zkList, getZkfnByName } = useSocial();
  const showLoginModal = useSelector((s) => s.global.showLoginModal);
  const dispath = useDispatch();
  const { pc } = useResponsive();
  const [currentAddress, setCurrentAddress] = useState("");
  const { walletClient } = useWalletClient();
  const { userLogined, user } = useUserInfo();
  const { address } = useAccount({
    onConnect({ address, connector, isReconnected }) {
      console.log("Connected", { address, connector, isReconnected });
      if (currentAddress == address) return;
      if (currentAddress) {
        // account change
        changeAccountSignIn(address, walletClient).then((r) => {
          location.href = location;
        });
      } else {
        // new account connect
        if (isIOS) {
          preGetNonce(address);
        } else if (!/Mobi/i.test(window.navigator.userAgent)) {
          // const signer = await getWalletClient()
          // signLoginMetaMask(acc.address, signer)
        }
      }
    },
    onDisconnect() {
      if (userLogined && user.evm.binded) {
        logout().then((r) => {
          location.href = location;
        });
      }
    },
  });
  useEffect(() => {
    setCurrentAddress(address);
  }, [address, setCurrentAddress]);

  const handleCloseModal = useCallback(() => {
    dispath(setLoginModal(false));
  }, []);

  const handleWallet = useCallback((type) => {
    if (type === "walletconnect") {
      dispath(setConnectWalletModal(true));
      handleCloseModal();
    }
  }, []);

  const handleSocial = useCallback(async (type) => {
    if (type === "twitter") {
      await loginUsingTwitterUrl();
    }
  }, []);

  return (
    <>
      <Modal
        title={<div className="text-base font-zen-dot text-white">Log in</div>}
        open={showLoginModal}
        onCancel={handleCloseModal}
      >
        <div className="flex-none px-5 py-4 space-y-6 text-white">
          <h2 className="text-white text-sm">{moduleConf.title}</h2>

          <div className="space-y-5">
            {/* zkLogin */}
            <div className="space-y-5">
              <div className="bg-[rgb(99,161,248)]/[0.10] border border-[rgb(99,161,248)]/[0.40] p-4 rounded-lg relative overflow-hidden">
                <img
                  src={moduleConf.zkLogin.bg}
                  className="w-12 absolute right-4 top-0 rotate-12"
                />
                <div className="text-[#63A1F8] flex items-center gap-x-2 text-sm font-medium space-y-4">
                  <img src={suiSVG} className="w-5 h-5 object-center" />
                  {moduleConf.zkLogin.name}
                </div>
                <div className="flex items-center justify-center gap-x-8">
                  {zkList.map((v) => {
                    return v.ready ? (
                      <ActionBution
                        key={v.name}
                        replace
                        handleAsync={async () => v.loginFn(false)}
                      >
                        <img
                          src={v.activePic}
                          className="w-8 h-8 object-center hover:opacity-60"
                          alt={v.name}
                        />
                      </ActionBution>
                    ) : (
                      <Tooltip title="Stay tuned" key={v.name}>
                        <img
                          src={v.picUrl}
                          className="w-8 h-8 object-center"
                          alt={v.name}
                        />
                      </Tooltip>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* wallet */}
            <div className="space-y-5">
              {moduleConf.wallet.map((v) => {
                return (
                  <button
                    onClick={() => handleWallet(v.type)}
                    key={v.type}
                    className="h-[52px] flex items-center justify-center relative w-full bg-[rgb(255,255,255)]/[0.05] rounded px-4 py-3 text-sm font-medium border border-[rgb(255,255,255)]/[0.20] hover:border-white hover:bg-[rgb(255,255,255)]/[0.2]"
                  >
                    <img
                      src={v.picUrl}
                      className="w-5 h-5 object-center absolute left-4"
                      alt={v.type}
                    />
                    {v.text}
                  </button>
                );
              })}
            </div>

            {/* social */}
            <div className="space-y-5">
              <div className="flex items-center justify-center gap-x-8">
                {moduleConf.social.map((v) => {
                  return (
                    <ActionBution
                      handleAsync={() => handleSocial(v.type)}
                      key={v.type}
                      className="h-[52px] flex items-center justify-center relative w-full bg-[rgb(255,255,255)]/[0.05] rounded px-4 py-3 text-sm font-medium border border-[rgb(255,255,255)]/[0.20] hover:border-white hover:bg-[rgb(255,255,255)]/[0.2]"
                    >
                      <img
                        src={v.picUrl}
                        className="w-5 h-5 object-center absolute left-4"
                        alt={v.type}
                      />
                      {v.text}
                    </ActionBution>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <div
            className="w-full h-[267px] lg:h-[460px] flex flex-col justify-center items-center bg-cover"
            style={{ backgroundImage: pc ? `url(${passportlg})` : "none" }}
          >
            <img src={lockSVG} className="w-20 h-20" />
            <span className="text-sm font-zen-dot text-white mb-6 text-color2">
              {moduleConf.passport}
            </span>
          </div>
        </div>
      </Modal>
      <WalletWeb3Modal />
    </>
  );
};

export default ConnectWalletModal;
