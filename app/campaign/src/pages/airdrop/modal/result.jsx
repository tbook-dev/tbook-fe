import { Modal } from 'antd';
import failedSvg from '@/images/social/error1.svg';
import sucessSvg from '@/images/social/sucess1.svg';

const moduleConf = {
  sucess: {
    title: 'Claim Successfully!',
    picUrl: sucessSvg,
    getDesc: () => {
      return (
        <>
          <p>
            Transactions may delay for a while. Please check in your wallet.
          </p>
          <p>Please check in your wallet.</p>
        </>
      );
    },
  },
  failed: {
    title: 'Failed to claim',
    picUrl: failedSvg,
  },
};
export default function Result ({
  open,
  onCancel,
  data = { status: 'failed' },
}) {
  const status = data.status;
  return (
    <Modal
      title={null}
      footer={null}
      closable
      centered
      open={open}
      onCancel={onCancel}
    >
      <div className=''>
        <div className='flex flex-col items-center'>
          <img
            src={moduleConf[status]?.picUrl}
            className='w-14 lg:w-20 h-14 lg:h-20'
          />
          <div className='px-7 pt-4 text-center'>
            <h2 className='text-white text-lg font-medium mb-2'>
              {moduleConf[status]?.title}
            </h2>
            <div className='text-xs text-[#A1A1A2]'>
              {moduleConf[status]?.getDesc(data)}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
