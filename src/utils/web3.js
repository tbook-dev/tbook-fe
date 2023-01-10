import Web3 from "web3";
import { host, getGrantSignInfo, postGrantSignInfo } from "@/api/incentive";

export async function loadWeb3() {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    try {
      // Request account access if needed
      await window.ethereum.enable();
      // Accounts now exposed
      return web3;
    } catch (error) {
      console.error(error);
    }
  }
  // Legacy dapp browsers...
  else if (window.web3) {
    // Use MetaMask/Mist's provider.
    const web3 = window.web3;
    console.log("Injected web3 detected.");
    return web3;
  }
}

export async function signLoginMetaMask(web3) {
  return fetch(
    `${host}/nonce?address=${web3.currentProvider.selectedAddress}`,
    { credentials: "include" }
  )
    .then((r) => r.text())
    .then((t) =>
      web3.eth.personal.sign(
        web3.utils.fromUtf8(t),
        web3.currentProvider.selectedAddress
      )
    )
    .then((s) => {
      const d = new FormData();
      d.append("address", web3.currentProvider.selectedAddress);
      d.append("sign", s);
      return fetch(`${host}/authenticate`, {
        credentials: "include",
        method: "POST",
        body: d,
      });
    });
}

export async function signGrantMetaMask(web3, projectId, grantId, userId) {
  try {
    const signList = await getGrantSignInfo(projectId, grantId);
    console.log("sign", signList);
    const signInfo = signList.find((v) => userId === v?.signer?.userId);
    console.log("signInfo", signInfo);
    const s1 = await web3.eth.personal.sign(
      web3.utils.fromUtf8(signInfo.grantSign),
      web3.currentProvider.selectedAddress
    );
    console.log("s1", s1);

    const res = await postGrantSignInfo(
      projectId,
      grantId,
      signInfo.grantSign.grantSignId,
      s1
    );
    console.log(res);
    return res;
  } catch (error) {
    return error;
  }
}
