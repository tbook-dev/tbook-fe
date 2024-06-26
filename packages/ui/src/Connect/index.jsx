import React, { useState } from "react";
import Button from "../Button";
import Switch from "./switch";
import SwitchV0 from "./switchV0";
import { useSignIn } from "@tbook/hooks";

import SwitchNet from "./switch";
import { useSelector } from "react-redux";
import { useResponsive } from "ahooks";

function Connect() {
  const { loading, handleSignIn } = useSignIn();
  const { pc } = useResponsive();
  const showLessNav = useSelector((state) => state.user.showLessNav);

  // console.log({ authUser });

  // sui
  //const suiWallet = useWallet();
  // console.log("chain", chain);

  const [showSuiModal, setShowSuiModal] = useState(false);

  return (
    <>
      {!showLessNav && <SwitchNet />}

      <Button
        className="px-8 text-black bg-black lg:text-white dark:lg:bg-white lg:bg-none"
        loading={loading}
        loadingColor={pc ? "#69D0E5" : "white"}
        onClick={handleSignIn}
      >
        Connect
      </Button>
    </>
  );
}

Connect.Switch = Switch;
Connect.SwitchNet = SwitchNet;
Connect.SwitchV0 = SwitchV0;

export default Connect;
