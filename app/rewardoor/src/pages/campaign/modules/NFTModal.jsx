// deploy nft modal
import Button from '@/components/button'
import { Modal, Form, Input, Button, Select, Switch } from 'antd'
import { supportChains } from '@/utils/conf'
const FormItem = Form.Item
const nftPlaceholder =
  'Enter the name that will be visible on blockchain as official verification'
const symbolPlaceholder =
  'Enter the Token Symbol that will be visible on the blockchain'

export default function NFTModal ({ visible, onCancel, onOk }) {
  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      onOk={onOk}
      maskStyle={{ backdropFilter: 'blur(7.5px)' }}
      centered
      title={<div className='text-4.2xl font-black text-t-1'>{title}</div>}
      footer={
        <div className='flex justify-end' onClick={handleOk}>
          <Button type='primary'>Save</Button>
        </div>
      }
    >
      <FormItem
        name='name'
        label='NFT Contract Name'
        rules={[{ required: true, message: 'NFT name is required' }]}
      >
        <Input placeholder={nftPlaceholder} />
      </FormItem>

      <FormItem name='symbol' label='Token Symbol'>
        <Input placeholder={symbolPlaceholder} />
      </FormItem>
      <FormItem name='transferable' label='Transferable'>
        <Switch />
      </FormItem>
    </Modal>
  )
}
