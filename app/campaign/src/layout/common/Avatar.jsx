import { useState, useCallback, useMemo } from "react";
import { Tooltip } from "antd";
import useUserInfo from "@/hooks/useUserInfoQuery";
import walletGrayIcon from "@/images/icon/wallet-gray.svg";
import useSocial from "@/hooks/useSocial";
import { useDispatch } from "react-redux";
import { setConnectWalletModal } from "@/store/global";
import { logout } from "@/utils/web3";
import { useAccount } from "wagmi";
import { disconnect } from "@wagmi/core";
import { Link, useLoaderData } from "react-router-dom";
import Address from "@tbook/ui/src/Address";
import suiSVG from "@/images/zklogin/sui.svg";
import Modal from "@/components/connectWallet/modal";
import passportlg from "@/images/passport-lg.png";
import shapeLink from "@/images/shape-link.svg";

export default function Avatar() {
  const [open, setOpen] = useState(false);
  const { user, isZK, isGoogle, address, twitterConnected, data } =
    useUserInfo();
  const { socialList, getZkfnByName, getSocialByName } = useSocial();
  const { isConnected } = useAccount();
  const dispatch = useDispatch();
  const { isUsingSubdomain, projectUrl } = useLoaderData();
  const handleConnectWallet = useCallback(() => {
    setOpen(false);
    dispatch(setConnectWalletModal(true));
  }, []);
  const handleLogout = useCallback(async () => {
    await logout();
    if (isConnected) {
      await disconnect();
    }
    location.href = location;
  }, [isConnected]);
  const links = useMemo(() => {
    return [
      {
        name: "Campaigns",
        path: `${isUsingSubdomain ? "" : `/${projectUrl}`}/campaign`,
      },
      {
        name: "Assets",
        path: `${isUsingSubdomain ? "" : `/${projectUrl}`}/asset`,
      },
    ];
  }, [projectUrl]);

  const isUsingWallet = useMemo(() => {
    return Boolean(address);
  }, [address]);

  const AvatarLine = () => {
    return (
      <div
        onClick={() => {
          setOpen(true);
        }}
        className="flex items-center gap-x-1 rounded-xl cursor-pointer"
      >
        <img
          src={user?.avatar}
          className="h-6 w-6 rounded-full object-center"
        />
      </div>
    );
  };
  const { logo, userInfo } = useMemo(() => {
    if (isZK) {
      // 如果是zk
      const isGoogle = data?.userZk.issuer === "Google";
      return {
        logo: isGoogle ? (
          <img
            src={getZkfnByName("google")?.activePic}
            alt="google"
            className="w-6 h-6"
          />
        ) : null,
        userInfo: <p>{data?.user?.zk?.identity}</p>,
      };
    } else if (twitterConnected) {
      // 如果是tw
      return {
        logo: (
          <img
            src={getSocialByName("twitter")?.activePic}
            alt="twitter"
            className="w-6 h-6"
          />
        ),
        userInfo: <p>{data?.userTwitter?.twitterUserName}</p>,
      };
    } else {
      // 普通地址
      return {
        logo: null,
        userInfo: <Address address={address} />,
      };
    }
  }, [isZK, twitterConnected, data]);

  return (
    <>
      <AvatarLine />
      <Modal
        title={
          <div className="text-base font-zen-dot text-white flex items-center gap-x-1">
            {logo}
            {userInfo}
          </div>
        }
        open={open}
        onCancel={() => {
          setOpen(false);
        }}
      >
        <div className="px-6 py-4 flex-none">
          <div
            className="text-[#C0ABD9] cursor-pointer flex items-center group hover:text-white gap-x-1 text-base"
            onClick={handleLogout}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.1667 10.6667V7.75C14.1667 7.28587 13.9823 6.84075 13.6541 6.51256C13.3259 6.18437 12.8808 6 12.4167 6H7.75C7.28587 6 6.84075 6.18437 6.51256 6.51256C6.18437 6.84075 6 7.28587 6 7.75V18.25C6 18.7141 6.18437 19.1592 6.51256 19.4874C6.84075 19.8156 7.28587 20 7.75 20H12.4167C12.8808 20 13.3259 19.8156 13.6541 19.4874C13.9823 19.1592 14.1667 18.7141 14.1667 18.25V15.3333M16.5 15.3333L18.8333 13M18.8333 13L16.5 10.6667M18.8333 13H8.91667"
                stroke=""
                className="group-hover:stroke-white stroke-[#C0ABD9]"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Logout
          </div>
        </div>

        <div className="flex-auto flex flex-col justify-center text-white">
          <div
            className="w-[375px] h-[390px] mx-auto overflow-auto lg:w-full lg:h-[460px] flex flex-col justify-center items-center bg-cover bg-center"
            style={{ backgroundImage: `url(${passportlg})` }}
          >
            <div className="flex flex-col items-center gap-y-2  text-lg font-medium mb-4">
              <img
                src={user?.avatar}
                className="w-10 h-10 border-2 border-[rgb(255,255,255)]/[0.2] rounded-full object-center"
              />
              <div className="text-center">
                {/* 优先展示wallet,然后就是tw */}
                {isUsingWallet ? (
                  <div className="space-y-1">
                    <div className="flex items-center gap-x-1.5 font-zen-dot">
                      {isZK && (
                        <img src={suiSVG} className="w-5 h-5 object-center" />
                      )}
                      <Address address={address} className="font-zen-dot" />
                    </div>
                    {isZK && (
                      <p className="text-[#C0ABD9] text-sm max-w-[256px] truncate">
                        {data?.user?.zk?.identity}
                      </p>
                    )}
                  </div>
                ) : (
                  data?.userTwitter?.connected && (
                    <div className="flex items-center gap-x-0.5 text-[#717374] text-base">
                      {`@${data?.userTwitter?.twitterUserName}`}
                      <img
                        src={
                          socialList.find((v) => v.name === "twitter")
                            ?.activePic
                        }
                        className="w-5 h-5 object-center"
                      />
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="flex items-center justify-center gap-x-3 pb-4">
              {!isUsingWallet && (
                <button
                  onClick={handleConnectWallet}
                  rel="nofollow noopener noreferrer"
                >
                  <img
                    src={walletGrayIcon}
                    alt="wallet connect"
                    className="w-6 h-6 object-contain object-center"
                  />
                </button>
              )}
              {socialList
                .filter((v) => {
                  if (v.name === "twitter") {
                    return data?.userTwitter?.connected && !user?.wallet
                      ? false
                      : true;
                  } else {
                    return true;
                  }
                })
                .map((v) => {
                  return v.connected ? (
                    <Tooltip key={v.name} title={`@${v.userName}`}>
                      <img
                        src={v.connected ? v.activePic : v.picUrl}
                        className="w-6 h-6 object-contain object-center"
                      />
                    </Tooltip>
                  ) : (
                    <button
                      key={v.name}
                      onClick={() => v.loginFn(false)}
                      rel="nofollow noopener noreferrer"
                    >
                      <img
                        src={v.connected ? v.activePic : v.picUrl}
                        className="w-6 h-6 object-contain object-center"
                      />
                    </button>
                  );
                })}
              {!isGoogle && (
                <button
                  key="google"
                  onClick={() => getZkfnByName("google")?.loginFn(false)}
                  rel="nofollow noopener noreferrer"
                >
                  <img
                    src={getZkfnByName("google")?.picUrl}
                    className="w-6 h-6 object-contain object-center"
                  />
                </button>
              )}
            </div>
            <div className="flex flex-col px-6 py-4 gap-y-2 text-lg">
              {links.map((v) => {
                return (
                  <Link
                    key={v.name}
                    to={v.path}
                    style={{ backgroundImage: `url(${shapeLink})` }}
                    className="text-[#C0ABD9] h-8 w-[220px] font-medium  text-center hover:text-white"
                    target="_blank"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    {v.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
