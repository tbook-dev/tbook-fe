import { useResponsive } from 'ahooks'
import { Modal, Drawer } from 'antd'

export default function AutoModal ({ open, onCancel, onOk, children }) {
  const { pc } = useResponsive()

  if (pc) {
    return (
      <Modal
        footer={null}
        title={null}
        centered
        open={open}
        onCancel={onCancel}
        maskStyle={{
          backdropFilter: 'blur(6px)',
          backgroundColor: 'rgba(0,0,0,0.8)'
        }}
      >
        {children}
      </Modal>
    )
  } else {
    return (
      <Modal
        footer={null}
        title={null}
        centered
        open={open}
        onCancel={onCancel}
        width='calc(100% - 40px)'
        closeIcon={false}
        maskStyle={{
          backdropFilter: 'blur(6px)',
          backgroundColor: 'rgba(0,0,0,0.8)'
        }}
      >
        {children}
      </Modal>
    )
  }
}
