import { Modal, Typography } from 'antd'
import sucessIcon from '@/images/icon/sucess.svg'
import linkIcon from '@/images/icon/link.svg'
import twIcon from '@/images/icon/tw.svg'
const { Paragraph } = Typography

const sucessText = 'The Campaign is successfully released!'
export default function sucessModal ({ open, setOpen, shareLink }) {
  return (
    <Modal
      centered
      footer={null}
      open={open}
      onCancel={() => setOpen(null)}
      width={580}
    >
      <div className='flex flex-col gap-y-6 my-6 mx-1'>
        <img src={sucessIcon} className='w-8 h-8' />
        <div className='font-semibold text-3xl text-t-1'>{sucessText}</div>
        <div className='flex space-x-5'>
          <Paragraph
            style={{ marginBottom: 0, width: 40, height: 40 }}
            className='flex justify-center items-center'
            copyable={{
              text: shareLink,
              icon: (
                <img
                  src={linkIcon}
                  className='w-10 h-10 cursor-pointer hover:opacity-80'
                />
              )
            }}
          />
          {/* <Paragraph
            style={{ marginBottom: 0, width: 40, height: 40 }}
            className='flex justify-center items-center'
            copyable={{
              text: shareLink,
              icon: (
                <img
                  src={twIcon}
                  className='w-10 h-10 cursor-pointer hover:opacity-80'
                />
              )
            }}
          /> */}
        </div>
      </div>
    </Modal>
  )
}
