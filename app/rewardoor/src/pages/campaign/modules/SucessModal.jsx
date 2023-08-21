import { Modal, Typography } from 'antd'
import sucessIcon from '@/images/icon/sucess.svg'
import { CopyOutlined, CheckOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
const { Paragraph } = Typography

const sucessText = 'The campaign is successfully released!'
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
        <img src={sucessIcon} className='w-8 h-8' />
        <div className='font-semibold text-3xl text-t-1'>{sucessText}</div>
        <div className='flex space-x-5'>
          <Paragraph
            style={{ marginBottom: 0 }}
            className='flex justify-center items-center'
            copyable={{
              text: shareLink,
              icon: [
                <CopyOutlined style={{ color: '#999' }} />,
                <CheckOutlined style={{ color: '#999' }} />
              ]
            }}
          >
            <p className='!mb-0 text-sm text-c-9'>
              Copy link to share campaign
            </p>
          </Paragraph>
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
