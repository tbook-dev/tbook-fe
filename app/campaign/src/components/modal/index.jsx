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
          backgroundColor: 'rgba(0,0,0,0.6)'
        }}
      >
        {children}
      </Modal>
    )
  } else {
    return (
      <Drawer
        title={null}
        onClose={onCancel}
        open={open}
        closable={false}
        placement='bottom'
        height='max-content'
        contentWrapperStyle={{
          overflow: 'hidden',
          borderRadius: '20px 20px 0px 0px'
        }}
        maskStyle={{
          backdropFilter: 'blur(6px)',
          backgroundColor: 'rgba(0,0,0,0.6)'
        }}
      >
        {children}
      </Drawer>
    )
  }
}
