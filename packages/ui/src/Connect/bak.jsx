import React, { useState } from "react";
import { signLoginMetaMask, logout } from "@/utils/web3";
import { useDispatch } from "react-redux";
import { setAuthUser, fetchUserInfo } from "@/store/user";
import { Button, Drawer } from "antd";
import { chains } from "@/utils/const";
import { useWeb3Modal } from "@web3modal/react";
import Network from "../Icon/NetWork";
import {
  useAccount,
  useConnect,
  useEnsName,
  useNetwork,
  useSwitchNetwork,
} from "wagmi";
import { fetchSigner } from "wagmi/actions";
import {
  useAccountBalance,
  useWallet,
  useCoinBalance,
  useChain,
  SuiChainId,
  ConnectModal,
} from "@suiet/wallet-kit";
import { useDisconnect } from "wagmi";
import { useResponsive } from "ahooks";
import { Popover } from "antd";
import clsx from "clsx";

export default function () {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { pc } = useResponsive();
  const [openLay, setOpenLay] = useState(false);

  const { address, isDisconnected } = useAccount();
  const { open } = useWeb3Modal();
  const { connectAsync, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  // sui
  const suiWallet = useWallet();
  console.log("chain", chain);

  const [showSuiModal, setShowSuiModal] = useState(false);

  async function handleSignIn() {
    setLoading(true);
    try {
      if (isDisconnected) {
        if (window.ethereum) {
          await connectAsync({
            connector: connectors.find((c) => c.id == "injected"),
          });
        } else {
          await open("ConnectWallet");
        }
      }
      const signer = await fetchSigner();
      await signLoginMetaMask(address, signer);
      dispatch(fetchUserInfo());
      dispatch(setAuthUser(true));
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  function handleSwitch(id) {
    // 1 Ethereum
    // 56 BNB
    switchNetwork(id);
    setOpenLay(false);
    // disconnect();
    // logout();
  }

  const Lay = () => (
    <div className="-mx-6 lg:-mx-3 w-[300px]">
      <div className="text-[18px] leading-[24px] text-center pt-7 pb-6">
        <p className="text-[#333]">Choose the network</p>
      </div>
      <div>
        {chains.map((v) => (
          <div
            className={clsx(
              "flex items-center py-2 pl-24  hover:text-[#666] cursor-pointer",
              chain?.id === v.evmChainId
                ? "text-[#0049FF] bg-[#ECF1FF]"
                : "text-[#999] hover:bg-white"
            )}
            onClick={() => {
              handleSwitch(v.evmChainId);
            }}
            key={v.evmChainId}
          >
            <Network id={v?.evmChainId} className="lg:mr-2" />
            <span className="hidden lg:block">{v?.name}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const content = (
    <Button
      className="flex items-center"
      onClick={() => {
        setOpenLay(true);
      }}
    >
      <Network id={chain?.id} className="lg:mr-2" />
      <span className="hidden lg:block">{chain?.name}</span>
    </Button>
  );

  return (
    <>
      {chain ? (
        pc ? (
          <Popover
            onOpenChange={(v) => setOpenLay(v)}
            content={<Lay />}
            trigger="click"
            open={openLay}
            placement="bottomRight"
          >
            {content}
          </Popover>
        ) : (
          <>
            {content}
            <Drawer
              placement="bottom"
              closable={false}
              open={openLay}
              contentWrapperStyle={{
                height: "50vh",
                borderRadius: "24px 24px 0px 0px",
                overflow: "hidden",
              }}
              onClose={() => setOpenLay(false)}
            >
              <Lay />
            </Drawer>
          </>
        )
      ) : null}

      <Button type="primary" loading={loading} onClick={handleSignIn}>
        Connect
      </Button>
      <ConnectModal
        open={showSuiModal}
        onOpenChange={(open) => setShowSuiModal(open)}
      ></ConnectModal>
    </>
  );
}
