import { Modal, Typography } from 'antd'
import sucessIcon from '@/images/icon/sucess.svg'
import { CopyOutlined, CheckOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import xIcon from '@/images/icon/x.svg'
const { Paragraph } = Typography

const sucessText = 'Successfully released!'
export default function sucessModal ({ open, setOpen, shareLink, jumpLink }) {
  const navigate = useNavigate()
  return (
    <Modal
      centered
      width={580}
      footer={null}
      open={open}
      maskClosable={false}
      onCancel={() => {
        setOpen(null)
        navigate(jumpLink)
      }}
    >
      <div className='flex flex-col gap-y-6 my-6 mx-1'>
        <div className='flex items-center gap-x-3 mb-10'>
          <img src={sucessIcon} className='w-8 h-8' />
          <div className='font-semibold text-3xl text-t-1'>{sucessText}</div>
        </div>

        <div className='flex items-center justify-between'>
          <Paragraph
            style={{ marginBottom: 0 }}
            className='flex justify-center items-center'
            copyable={{
              text: shareLink,
              icon: [
                <CopyOutlined style={{ color: '#3A82F7' }} />,
                <CheckOutlined style={{ color: '#3A82F7' }} />
              ]
            }}
          >
            <p className='!mb-0 text-sm underline text-[#3A82F7]'>
              Copy link to share campaign
            </p>
          </Paragraph>
          
          <img src={xIcon} className='w-4 h-4 cursor-pointer' />
        </div>
      </div>
    </Modal>
  )
}
