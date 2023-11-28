import { Button } from "antd";
import {
    useAccount,
    useConnect,
  } from "wagmi";
import { getWalletClient } from "@wagmi/core";
import { fetchLoginNonce } from "@/utils/web3";
import { host } from '@/api/incentive'

export default function Home () {
    const {address} = useAccount()
    
    const twLogin = () => {
        fetch('https://rd-api-staging.tbook.com/twitter/login/auth', {credentials: "include"}).then(r => r.json()).then(d => location = d.url)
    }

    const bindEvm = async () => {
        const nonce = await fetchLoginNonce(address)

        const signer = await getWalletClient()

        const sign = await signer.signMessage({message: nonce})
        const d = new URLSearchParams()
        d.append('address', address)
        d.append('sign', sign)
        const bindResult = await fetch(`${host}/bindEvm`, {
          credentials: 'include',
          method: 'POST',
          headers: {
            'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
          body: d
        })
        console.log({bindResult})
    }
    
    return (
      <main>
        <Button onClick={twLogin}>Login with Twitter</Button>
        <w3m-button />
        <Button onClick={bindEvm} >Bind Wallet</Button>
      </main>
    )
  }