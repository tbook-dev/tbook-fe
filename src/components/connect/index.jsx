import React, { useState, useEffect } from "react";
import { signLoginMetaMask , ethereumClient} from "@/utils/web3";
import { useDispatch } from "react-redux";
import { setAuthUser, fetchUserInfo, setCurrentProjectId } from "@/store/user";
import { Button } from "antd";
import { chains } from "@/utils/const";
import { logout } from '@/api/incentive'
import { Web3Button, Web3NetworkSwitch, useWeb3Modal } from "@web3modal/react";
import { useSigner, useAccount, useProvider } from "wagmi";

import { useUpdateEffect } from "ahooks";

export default function () {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { address, isDisconnected } = useAccount()
  const { data: signer } = useSigner()
  const provider = useProvider()

  // const { open } = useWeb3Modal()
  // console.log({signer})
  async function handleLogin(address){
    console.log('login')
    await signLoginMetaMask(address, signer)
    dispatch(fetchUserInfo());
    dispatch(setAuthUser(true));
  }

  async function handleLogout(){
    console.log('logout')
    await logout();
    dispatch(setAuthUser(false));
    dispatch(setCurrentProjectId(null))
  }

  useEffect(() => {
    ethereumClient.watchAccount((accounts) => {
      const { address, isConnected } = accounts;
      console.log({isConnected}, accounts)
      if(isConnected){
        handleLogout()
      }else{
        handleLogin(address)
      }
    })

    ethereumClient.watchNetwork(network => {
      console.log("new network", network)
    })
  
    provider.on("accountsChanged", accounts => {
      console.log("accountsChanged", accounts[0])
    })
  
    provider.on("chainChanged", network => {
      console.log("chainChanged", network)
    })


    return () => {
      
    };
  }, []);
  // async function handleSignIn() {
  //   setLoading(true);
  //   try {
  //     if (isDisconnected){
  //       await open('ConnectWallet')
  //     }
  //     await signLoginMetaMask(address, signer);
  //     dispatch(fetchUserInfo());
  //     dispatch(setAuthUser(true));
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   setLoading(false);
  // }

  // console.log({isDisconnected, address})
  // useAsyncEffect(async () => {
  //   console.log('isDisconnected', isDisconnected)
  //   if(!isDisconnected){
  //     await signLoginMetaMask(address, signer);
  //     dispatch(fetchUserInfo());
  //     dispatch(setAuthUser(true))
  //   }else{
  //     dispatch(setAuthUser(false))
  //   }

  //   return () => {
      
  //   };
  // }, [isDisconnected]);

  // const ethConf = chains.find((v) => v.evmChainId === 1);

  return (
    <>
      {/* <Web3NetworkSwitch /> */}
      <Web3Button />
      {/* <div className="flex items-center">
        {React.createElement(ethConf.render)}
        <span>{ethConf.name}</span>
      </div>
      <Button type="primary" loading={loading} onClick={handleSignIn}>
        Connect
      </Button> */}
    </>
  );
}
