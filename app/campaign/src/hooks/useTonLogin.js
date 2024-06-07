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
import { useDispatch } from 'react-redux';
import useUserInfoQuery from './useUserInfoQuery';
import {
  setConnectWalletModal,
  setLoginModal,
  setShowMergeAccountModal,
  setMergeAccountData,
  setUnbindAccountData,
  setUnbindAccountModal,
} from '@/store/global';
import { conf } from '@tbook/utils';
import { message } from 'antd';
import { useQuery } from 'react-query';

const { shortAddress } = conf;

const TG_BOT_NAME = import.meta.env.VITE_TG_BOT_NAME;
const TG_BOT_APP = import.meta.env.VITE_TG_BOT_APP;

const getCurrentDirectLink = () => {
  const start_param = window.Telegram?.WebApp?.initDataUnsafe?.start_param;
  const tmaHome = `https://t.me/${TG_BOT_NAME}/${TG_BOT_APP}`;
  return start_param ? `${tmaHome}?startapp=${start_param}` : tmaHome;
};
export default function useTonLogin() {
  const firstProofLoading = useRef(true);
  const { data: payload } = useQuery(['tonproof'], getTonPayload, {
    staleTime: 60000,
  });
  // const [data, setData] = useState({});
  const [messageApi, contextHolder] = message.useMessage();
  const wallet = useTonWallet();
  const [authorized, setAuthorized] = useState(false);
  const [tonConnectUI] = useTonConnectUI();
  const { refetch, userLogined } = useUserInfoQuery();
  const dispath = useDispatch();
  const [loading, setLoading] = useState(false);
  const openMergeAccountModal = useCallback(() => {
    dispath(setShowMergeAccountModal(true));
  }, []);
  const openUnbindAccountModal = useCallback(() => {
    dispath(setUnbindAccountModal(true));
  }, []);

  useEffect(() => {
    if (firstProofLoading.current) {
      tonConnectUI.setConnectRequestParameters({ state: 'loading' });
      firstProofLoading.current = false;
      setLoading(true);
    }

    // const payload = await getTonPayload();
    if (window.Telegram?.WebApp?.initData) {
      tonConnectUI.uiOptions = {
        actionsConfiguration: {
          twaReturnUrl: getCurrentDirectLink(),
        },
      };
    }

    if (payload) {
      tonConnectUI.setConnectRequestParameters({
        state: 'ready',
        value: payload,
      });
    } else {
      tonConnectUI.setConnectRequestParameters(null);
    }
  }, [tonConnectUI, firstProofLoading, payload]);

  useEffect(
    () =>
      tonConnectUI.onStatusChange(async (w) => {
        // console.log('xxx--->', w, w?.connectItems?.tonProof);
        if (!w) {
          setAuthorized(false);
          setLoading(false);
          return;
        }
        if (w.connectItems?.tonProof && 'proof' in w.connectItems.tonProof) {
          const payload = {
            address: w.account.address,
            network: w.account.chain,
            frAddress: Address.parse(w.account.address).toString(),
            publicKey: w.account.publicKey,
            login: !userLogined,
            tonProofItem: {
              name: 'ton_proof',
              proof: w.connectItems.tonProof.proof,
            },
          };
          const data = await verifyTonProof(payload);
          if (data.code === 400) {
            // 400 merge
            // setShowMergeAccountModal()
            dispath(
              setMergeAccountData({
                passportA: data.passportA,
                passportB: data.passportB,
                redirect: false,
              })
            );
            openMergeAccountModal();
          } else if (data.code === 4004) {
            // 4004要解绑
            dispath(
              setUnbindAccountData({
                passportA: data.passportA,
                passportB: data.passportB,
              })
            );
            openUnbindAccountModal();
            // if (data.code != 200) {
            //   messageApi.error(data.message);
            //   setLoading(false);
            //   // handleCloseModal();
            //   return;
            // } else {
            //   await delay(100);
            //   await refetch();
            // }
          }
          await refetch();
          setLoading(false);
          //await TonProofDemoApi.checkProof(w.connectItems.tonProof.proof, w.account);
        }
        setAuthorized(true);
      }),
    [tonConnectUI]
  );

  // const handleClick = useCallback(async () => {
  //   if (!wallet) {
  //     return;
  //   }
  //   //wallet.account.publicKey
  //   //const response = await TonProofDemoApi.getAccountInfo(wallet.account);

  //   setData(wallet.account);
  // }, [wallet]);
  return {
    wallet,
    authorized,
    loading,
    contextHolder,
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
