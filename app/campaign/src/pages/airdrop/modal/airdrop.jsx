import { Modal } from 'antd';
import BigNumber from 'bignumber.js';
import { formatDollarV2, shortAddressV1 } from '@tbook/utils/lib/conf';
import {
  useAccount,
  useNetwork,
  useSwitchNetwork,
  mainnet,
  sepolia,
} from 'wagmi';
import { useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, message } from 'antd';
import Result from './result';
import {
  prepareWriteContract,
  writeContract,
  waitForTransaction,
} from '@wagmi/core';
import useclaimGameAirdrop from '@/hooks/useGameClaimAirdrop';

const moduleConf = {
  title: 'Claim the Airdrop',
  desc: ['Please check your claim information.'],
  button: 'Confirm',
  claimSucess: 'Claim sucess!',
  claimError: 'Claim error!',
};
const airdropContractAddress = import.meta.env.VITE_GAME_AIRDROP_CONTRACT;
const isStaging = import.meta.env.VITE_HOST_EVN === 'staging';

const phaseEnum = {
  1: 's1',
  2: 's2',
  3: 's3',
  4: 's4',
};
export default function AirdropModal ({ symbol, open, onClose, phaseNum }) {
  const { address } = useAccount();
  const [resultOpen, setResultOpen] = useState(false);
  const [result, setResult] = useState({ status: 'sucess' });
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { chain } = useNetwork();
  const { switchNetworkAsync } = useSwitchNetwork();
  const { data: airDropData } = useclaimGameAirdrop(phaseEnum[phaseNum]);
  const { salt, sign, amount } = airDropData?.entity ?? {};
  const envChain = isStaging ? sepolia : mainnet;
  const handleClaim = async () => {
    try {
      const claimABI = await import('@/abi/GameAirdrop.json');
      setLoading(true);
      // 数据包括，数量，地址
      if (chain?.id !== envChain.id) {
        await switchNetworkAsync(envChain.id);
      }
      // prepare
      const config = await prepareWriteContract({
        address: airdropContractAddress,
        abi: claimABI.abi,
        functionName: 'claim',
        chainId: envChain.id,
        args: [address, phaseEnum[phaseNum], amount, salt, sign],
      });
      const r = await writeContract(config);
      console.log(r);
      const data = await waitForTransaction({
        chainId: envChain.id,
        hash: r.hash,
      });
      console.log('transaction log: ', data);
      messageApi.success(moduleConf.claimSucess);
      // 刷新领取状态
      setResult({ status: 'sucess' });
    } catch (error) {
      setResult({ status: 'failed' });
      messageApi.error(moduleConf.claimError);
      console.log(error);
    }
    setLoading(false);
    onClose();
    setResultOpen(true);
  };

  return (
    <>
      <Modal
        title={null}
        footer={null}
        centered
        open={open}
        closable={true}
        onCancel={onClose}
      >
        <div className='-mx-6'>
          <div className='mx-6 mb-2'>
            <h2 className='text-base font-medium'>{moduleConf.title}</h2>

            {moduleConf.desc.map((v, idx) => {
              return (
                <p key={idx} className='text-xs text-[#C0ABD9]'>
                  {v}
                </p>
              );
            })}
          </div>

          <div className='my-3 h-px bg-[#8148C6]' />

          <div className='mx-6 space-y-3 text-sm'>
            <div className='flex items-center justify-between'>
              <span className='text-[#C0ABD9]'>Claim amount</span>
              <span className='font-medium text-white'>
                {formatDollarV2(BigNumber(amount).toFixed(6), 6)} {symbol}
              </span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-[#C0ABD9]'>Your wallet address</span>
              <span className='font-medium text-white'>
                {shortAddressV1(address)}
              </span>
            </div>

            <button
              disabled={loading}
              onClick={handleClaim}
              className='h-8 w-full rounded-lg bg-white text-black text-sm font-medium flex items-center justify-center gap-x-2'
            >
              {moduleConf.button}
              {loading && (
                <Spin
                  indicator={<LoadingOutlined style={{ fontSize: 16 }} spin />}
                />
              )}
            </button>
          </div>
        </div>
        {contextHolder}
      </Modal>
      <Result
        open={resultOpen}
        onCancel={() => setResultOpen(false)}
        data={result}
      />
    </>
  );
}
