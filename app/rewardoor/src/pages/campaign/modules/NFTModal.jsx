import Button from '@/components/button'
import { Modal, Form, Input, Select, Switch } from 'antd'
import { supportChains } from '@/utils/conf'
import { handleCreateNFTcontract } from '@/api/incentive'
import { useCurrentProject } from '@tbook/hooks'
import { useQueryClient } from 'react-query'
const nftPlaceholder =
  'Enter the name that will be visible on blockchain as official verification'
const symbolPlaceholder =
  'Enter the Token Symbol that will be visible on the blockchain'

const title = 'Deploy NFT Contract'

export default function NFTModal ({ visible, setOpen }) {
  const [form] = Form.useForm()
  const { projectId } = useCurrentProject()
  const queryClient = useQueryClient()
  const handleOk = () => {
    form.validateFields().then(values => {
      handleCreateNFTcontract(projectId, values).then(res => {
        queryClient.invalidateQueries('NFTcontracts')
        setOpen(false)
      })
    })
  }
  return (
    <Modal
      open={visible}
      onCancel={() => setOpen(false)}
      // onOk={() => setOpen(false)}
      maskStyle={{ backdropFilter: 'blur(7.5px)' }}
      centered
      destroyOnClose
      title={<div className='text-4.2xl font-black text-t-1'>{title}</div>}
      footer={
        <div className='flex justify-end' onClick={handleOk}>
          <Button type='primary'>Save</Button>
        </div>
      }
    >
      <Form form={form} layout='vertical'>
        <Form.Item
          name='name'
          label='NFT Contract Name'
          rules={[{ required: true, message: 'NFT name is required' }]}
        >
          <Input placeholder={nftPlaceholder} />
        </Form.Item>

        <Form.Item
          name='symbol'
          label='NFT Symbol'
          rules={[{ required: true, message: 'NFT symbol is required' }]}
        >
          <Input placeholder={symbolPlaceholder} />
        </Form.Item>
        <Form.Item
          name='network'
          label='Network'
          rules={[{ required: true, message: 'NFT Network is required' }]}
        >
          <Select>
            {supportChains.map(v => (
              <Select.Option value={v.value} key={v.value}>
                <div className='flex items-center gap-x-1'>
                  <img src={v.icon} className='w-4 h-4' />
                  <span className='ml-2'>{v.label}</span>
                </div>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name='transferable'
          label='Transferable'
          valuePropName='checked'
          rules={[{ required: true, message: 'NFT Transferable is required' }]}
        >
          <Switch checkedChildren='yes' unCheckedChildren='no' />
        </Form.Item>
      </Form>
    </Modal>
  )
}