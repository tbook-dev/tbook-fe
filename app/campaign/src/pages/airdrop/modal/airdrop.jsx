import { Modal } from 'antd';
import BigNumber from 'bignumber.js';
import { formatDollarV2, shortAddressV1 } from '@tbook/utils/lib/conf';
import { useAccount } from 'wagmi';
import { useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, message } from 'antd';
import Result from './result';

const moduleConf = {
  title: 'Claim the Airdrop',
  desc: ['Please check your claim information.'],
  button: 'Confirm',
  claimSucess: 'Claim sucess!',
  claimError: 'Claim error!',
};

export default function AirdropModal ({ amount, symbol, open, onClose }) {
  const { address } = useAccount();
  const [resultOpen, setResultOpen] = useState(true);
  const [result, setResult] = useState({ status: 'sucess' });
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const claimTokens = () =>
    new Promise(r => {
      setTimeout(() => {
        r();
      }, 1000);
    });
  const handleClaim = () => {
    setLoading(true);
    claimTokens(amount)
      .then(r => {
        messageApi.success(moduleConf.claimSucess);
        // 上报
        // 刷新领取状态
        setResult({ status: 'sucess' });
      })
      .catch(e => {
        console.error(e);
        setResult({ status: 'failed' });
        messageApi.error(moduleConf.claimError);
      })
      .finally(() => {
        setLoading(false);
        onClose();
        setOpen(true);
      });
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
