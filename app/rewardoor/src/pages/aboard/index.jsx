import Logo from "@/components/logo";
import metaMask from "@/images/icon/metamask.svg";
import walletconnect from "@/images/icon/walletconnect.svg";
import useSignIn from "@/hooks/useSignIn";
import Button from "@/components/button";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import { useEffect } from "react";
import { host } from "@/api/incentive";
import { useState } from "react";
import Slide from "./slide";

const h1 = "Get started on TBOOK";
const h1Text = "Connect your wallet now and start setting up Campaigns.";

export default function Aboard() {
  const { isConnected } = useAccount();
  const navigate = useNavigate();
  const { loading, handleSignIn, signMessage } = useSignIn();
  const [autoFetch, setAutoFetch] = useState(true);

  const clickSignIn = async (useWc) => {
    setAutoFetch(false);
    await handleSignIn(useWc);
    await signMessage();
  };

  useEffect(() => {
    if (isConnected && autoFetch) {
      fetch(`${host}/info`, {
        method: "GET",
        credentials: "include",
      }).then((r) => {
        console.log({ autoFetch });
        if (!autoFetch) return;
        let p;
        if (r.status === 401) {
          p = handleSignIn();
        } else {
          p = r.json();
        }
        p.then((res) => {
          if (res?.projects?.length === 0) {
            navigate("/new-project");
          } else {
            navigate("/");
          }
        });
      });
    }
  }, [isConnected, autoFetch]);

  return (
    <div className="flex h-screen">
      <div className="select-none	w-1/2 overflow-hidden min-h-full relative p-12 flex flex-col justify-center">
        <Slide />
      </div>
      <div className="w-1/2  flex items-center justify-center">
        <div className="w-[560px] space-y-12">
          <div>
            <Logo className="w-8 h-8 inline-block"/>
          </div>
          <div>
            <h1 className="text-[40px] leading-[40px] font-bold mb-6">{h1}</h1>
            <p className="text-base text-[#F0F0F0]">{h1Text}</p>
          </div>

          <div className="mt-10 space-y-6">
            {isConnected ? (
              <div className="flex items-center gap-x-4">
                <w3m-button />
                Loading……
              </div>
            ) : (
              <>
                <Button
                  className="w-full text-base font-bold text-white"
                  onClick={() => clickSignIn(false)}
                  loading={loading}
                >
                  <img src={metaMask} className="mr-3 w-5 h-5 object-contain" />
                  MetaMask
                </Button>
                <Button
                  className="w-full text-base font-bold text-white"
                  onClick={() => clickSignIn(true)}
                >
                  <img
                    src={walletconnect}
                    className="mr-3 w-5 h-5 object-contain"
                  />
                  WalletConnect
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
