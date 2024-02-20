import { Modal } from 'antd';
import Button from '@/components/button';

const moduleConf = {
  title: 'Delete the campaign',
  desc: 'Are you sure you want to delete your account? All of data in the campaign will be removed. This action cannot be undone.',
};
export default function DeleteModal ({ open, onClose }) {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      centered
      footer={
        <div className='flex justify-end items-center gap-x-3'>
          <Button type='white' onClick={onClose}>
            Cancel
          </Button>
          <Button type='danger'>Delete</Button>
        </div>
      }
    >
      <div className='flex items-start gap-x-6'>
        <svg
          width='40'
          height='40'
          viewBox='0 0 40 40'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='flex-none'
        >
          <rect width='40' height='40' rx='20' fill='#450A0A' />
          <path
            d='M20 17V19M20 23H20.01M13.0718 27H26.9282C28.4678 27 29.4301 25.3333 28.6603 24L21.7321 12C20.9623 10.6667 19.0378 10.6667 18.268 12L11.3398 24C10.57 25.3333 11.5322 27 13.0718 27Z'
            stroke='#DC2626'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
        <div className='space-y-2 mb-4'>
          <h2 className='text-white font-medium text-lg'>{moduleConf.title}</h2>
          <p className='text-[#A1A1A2] text-sm'>{moduleConf.desc}</p>
        </div>
      </div>
    </Modal>
  );
}
