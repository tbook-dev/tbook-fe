import React, { useState, useEffect } from "react";
import { signLoginMetaMask , ethereumClient} from "@/utils/web3";
import { useDispatch } from "react-redux";
import { setAuthUser, fetchUserInfo, setCurrentProjectId } from "@/store/user";
import { logout } from '@/api/incentive'
import { Web3Button } from "@web3modal/react";
import { useSigner, useAccount, useConnect } from "wagmi";


export default function () {
  const dispatch = useDispatch();
  const { address, isDisconnected } = useAccount()
  const { data: signer } = useSigner()
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect()


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
  console.log({address, isDisconnected, connect, connectors, error, isLoading, pendingConnector})
  



  return (
      <Web3Button />
  );
}
