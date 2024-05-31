import { Modal } from 'antd';
import logoSVG from '@/images/social/logo-normal.svg';
import { setEVMInconsistentModal } from '@/store/global';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useUserInfoQuery from '@/hooks/useUserInfoQuery';
import Address from '@tbook/ui/src/Address';

const moduleConf = {
  title: 'Inconsistent Addresses',
  picUrl: logoSVG,
  getDesc: ({ currentAddress = '12', refAddress = '33' }) => {
    return (
      <>
        You are currently logged in with evm address
        <Address
          className="text-white font-medium ml-1"
          address={currentAddress}
        />
        , but you might need connect to address
        <Address className="text-white font-medium mx-1" address={refAddress} />
        Please confirm that. If you need to change it, switch the address in
        your wallet and log in again.
      </>
    );
  },
};
export default function EVMInconsistent() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const open = useSelector((s) => s.global.EVMInconsistentModal);
  const onCancel = useCallback(() => {
    dispatch(setEVMInconsistentModal(false));
  });
  const { evmAddress: currentAddress } = useUserInfoQuery();
  const refAddress = searchParams?.get('sourceEvmAddr');
  //   console.log('sessionStorage.getItem-->', `${currentAddress}-${refAddress}`);

  useEffect(() => {
    if (
      Boolean(refAddress) &&
      Boolean(currentAddress) &&
      currentAddress !== refAddress
    ) {
      if (!sessionStorage.getItem(`${currentAddress}-${refAddress}`)) {
        setTimeout(() => {
          sessionStorage.setItem(`${currentAddress}-${refAddress}`, 1);
          dispatch(setEVMInconsistentModal(true));
        }, 3000);
      }
    }
  }, [refAddress, currentAddress]);

  return (
    <Modal
      title={null}
      footer={null}
      closable
      centered
      open={open}
      onCancel={onCancel}
    >
      <div className="">
        <div className="flex flex-col items-center">
          <img src={moduleConf.picUrl} className="w-14 lg:w-20 h-14 lg:h-20" />
          <div className="px-7 pt-4 text-center">
            <h2 className="text-white text-lg font-medium mb-2">
              {moduleConf.title}
            </h2>
            <p className="text-xs text-[#A1A1A2]">
              {moduleConf.getDesc({ refAddress, currentAddress })}
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}
