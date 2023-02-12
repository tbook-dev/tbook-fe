import React, { useState } from "react";
import { Button } from "antd";
import { useWallet, ConnectModal } from "@suiet/wallet-kit";

import useSignIn from "@/hooks/useSignIn";

import SwitchNet from "./switch";

export default function () {
  const { loading, handleSignIn } = useSignIn();

  // sui
  const suiWallet = useWallet();
  // console.log("chain", chain);

  const [showSuiModal, setShowSuiModal] = useState(false);

  return (
    <>
      <SwitchNet />

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
