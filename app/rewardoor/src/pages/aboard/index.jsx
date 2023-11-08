import Logo from "@/components/logo";
import useSignIn from "@/hooks/useSignIn";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { host } from "@/api/incentive";
import Slide from "./slide";
import ButtonTab from "./buttonTab";
import { categoriedWallet } from "@tbook/wallet/conf";

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
    <div className="flex h-screen bg-[#121212]">
      <div className="select-none	w-1/2 overflow-hidden min-h-full relative p-12 flex flex-col justify-center">
        <Slide />
      </div>
      <div className="w-1/2  flex items-center justify-center overflow-y-auto">
        <div className="w-[560px] space-y-12">
          <div>
            <Logo className="w-8 h-10 inline-block" />
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
              <ButtonTab
                list={categoriedWallet}
                loading={loading}
                handleClick={()=>clickSignIn(true)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
