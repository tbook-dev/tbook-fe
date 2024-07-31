import { Modal } from 'antd';
import failedSvg from '@/images/social/logo-error2.svg';
import sucessSvg from '@/images/social/logo-ok2.svg';

const moduleConf = {
  sucess: {
    title: 'Merge successfully',
    picUrl: sucessSvg,
    getDesc: () => {
      return '';
    },
  },
  failed: {
    title: 'Failed to merge',
    picUrl: failedSvg,
    getDesc: ({ message }) =>
      message ? message : `Passport merge failed. Please try again later.`,
  },
};
export default function MergeResult ({
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
            <p className='text-xs text-[#A1A1A2]'>
              {moduleConf[status]?.getDesc(data)}
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}
