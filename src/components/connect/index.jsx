import React, { useState } from "react";
import Button from "@/components/button";
import { useWallet, ConnectModal } from "@suiet/wallet-kit";

import useSignIn from "@/hooks/useSignIn";

import SwitchNet from "./switch";
import { useSelector } from "react-redux";
import { useResponsive } from "ahooks";

export default function () {
  const { loading, handleSignIn } = useSignIn();
  const { pc } = useResponsive();
  const showLessNav = useSelector((state) => state.user.showLessNav);

  // console.log({ authUser });

  // sui
  const suiWallet = useWallet();
  // console.log("chain", chain);

  const [showSuiModal, setShowSuiModal] = useState(false);

  return (
    <>
      {!showLessNav && <SwitchNet />}

      <Button
        className="px-8 lg:bg-white lg:bg-none"
        loading={loading}
        loadingColor={pc ? "#69D0E5" : "white"}
        onClick={handleSignIn}
      >
        Connect
      </Button>
      <ConnectModal
        open={showSuiModal}
        onOpenChange={(open) => setShowSuiModal(open)}
      ></ConnectModal>
    </>
  );
}
