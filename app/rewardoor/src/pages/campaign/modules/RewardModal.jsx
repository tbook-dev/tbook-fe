import Button from '@/components/button'
import SearchIcon from '@/images/icon/search.svg'
import { Input, Tabs, Modal, Form } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import x from '@/images/icon/x.svg'
import closeIcon from '@/images/icon/close.svg'
import { useCallback, useEffect } from 'react'
import { twParttern } from '@/utils/conf'

const title = 'Set Up Reward'

export default function CredentialModal ({
  open,
  setOpen,
  handleSave,
  credentialList,
  conf
}) {
  const [form] = Form.useForm()
  const credentialsFormValues = Form.useWatch('credential', form)
  const credentialSet = credentialList.map(v => v.list).flat()

  // console.log({ credentialsFormValues, conf })
  const handleOk = async () => {
    form
      .validateFields()
      .then(values => {
        handleSave(values)
        closeModal()
      })
      .catch(err => {
        console.log(err)
      })
  }
  useEffect(() => {
    if (open) {
      form.setFieldsValue({ credential: conf ?? [] })
    }
  }, [open])
  const closeModal = useCallback(() => {
    setOpen(false)
    form.resetFields()
  }, [])
  return (
    <Modal
      width={1160}
      title={<div className='text-4.2xl font-black text-t-1'>{title}</div>}
      open={open}
      onCancel={closeModal}
      maskStyle={{ backdropFilter: 'blur(7.5px)' }}
      centered
      footer={
        <div className='flex justify-end' onClick={handleOk}>
          <Button type='primary'>Save</Button>
        </div>
      }
    >
      <div className='pt-8 grid grid-cols-2 gap-x-10'>acb</div>
    </Modal>
  )
}
