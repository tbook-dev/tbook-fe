import React, { useState } from "react";
import Button from "@/components/button";
import { useWallet, ConnectModal } from "@suiet/wallet-kit";

import useSignIn from "@/hooks/useSignIn";

import SwitchNet from "./switch";
import { useSelector } from "react-redux";

export default function () {
  const { loading, handleSignIn } = useSignIn();

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
        className="dark:hover:!font-medium !px-8"
        loading={loading}
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
