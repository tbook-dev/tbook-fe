import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  useTonConnectUI,
  useTonWallet,
  TonConnectButton,
  useTonConnectModal,
  useTonAddress,
} from '@tonconnect/ui-react';
// import { CHAIN } from '@tonconnect/ui-react';
import { Address } from 'ton';
import { getTonPayload, verifyTonProof } from '@/api/incentive';

export default function TonLogin() {
  const firstProofLoading = useRef(true);

  const [data, setData] = useState({});
  const wallet = useTonWallet();
  const [authorized, setAuthorized] = useState(false);
  const [tonConnectUI] = useTonConnectUI();

  const recreateProofPayload = useCallback(async () => {
    if (firstProofLoading.current) {
      tonConnectUI.setConnectRequestParameters({ state: 'loading' });
      firstProofLoading.current = false;
    }

    const payload = await getTonPayload();

    if (payload) {
      tonConnectUI.setConnectRequestParameters({
        state: 'ready',
        value: payload,
      });
    } else {
      tonConnectUI.setConnectRequestParameters(null);
    }
  }, [tonConnectUI, firstProofLoading]);

  if (firstProofLoading.current) {
    recreateProofPayload();
  }

  useEffect(
    () =>
      tonConnectUI.onStatusChange(async (w) => {
        if (!w) {
          setAuthorized(false);
          return;
        }

        if (w.connectItems?.tonProof && 'proof' in w.connectItems.tonProof) {
          const payload = {
            address: w.account.address,
            network: w.account.chain,
            frAddress: Address.parse(w.account.address).toString(),
            publicKey: w.account.publicKey,
            tonProofItem: {
              name: 'ton_proof',
              proof: w.connectItems.tonProof.proof,
            },
          };
          await verifyTonProof(payload);
          //await TonProofDemoApi.checkProof(w.connectItems.tonProof.proof, w.account);
        }
        setAuthorized(true);
      }),
    [tonConnectUI]
  );

  const handleClick = useCallback(async () => {
    if (!wallet) {
      return;
    }
    //wallet.account.publicKey
    //const response = await TonProofDemoApi.getAccountInfo(wallet.account);

    setData(wallet.account);
  }, [wallet]);
  return {
    wallet,
    data,
    authorized,
  };

  // return (
  //     <div className="ton-proof-demo">
  //         <TonConnectButton />
  //         <h3>Demo backend API with ton_proof verification</h3>
  //         <div>
  //             accountInfo: {JSON.stringify(data, null, 2)}
  //         </div>
  //         {authorized ? (
  //             <button onClick={handleClick}>
  //                 Call backend getAccountInfo()
  //             </button>
  //         ) : (
  //             <button onClick={() => tonConnectUI.openModal()}>
  //                 Connect wallet to send the transaction
  //             </button>
  //         )}
  //     </div>
  // );
}
