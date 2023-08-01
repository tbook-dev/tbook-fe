import { useCurrentProject } from '@tbook/hooks'
import { useRequest } from 'ahooks'
import { getCredentialByGroup } from '@/api/incentive'
import Button from '@/components/button'
import SearchIcon from '@/images/icon/search.svg'
import { Input, Tabs, Modal } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

const title = 'Set Up Credential Group'
const placeholder = 'Enter Credential Title to search for Cred'

export default function CredentialModal ({ open, setOpen }) {
  const { projectId } = useCurrentProject()
  const { data: credentialList } = useRequest(
    () => getCredentialByGroup(projectId),
    {
      refreshDeps: [projectId],
      ready: !!projectId
    }
  )
  console.log({ credentialList })
  return (
    <Modal
      width={1160}
      title={<div className='text-4.2xl font-black text-t-1'>{title}</div>}
      open={open}
      onCancel={() => setOpen(false)}
      maskStyle={{ backdropFilter: 'blur(7.5px)' }}
      centered
      footer={
        <div className='flex justify-end'>
          <Button type='primary'>Save</Button>
        </div>
      }
    >
      <div className='pt-8 grid grid-cols-2 gap-x-10'>
        <div>
          <div className='relative mb-5'>
            <Input
              type='text'
              placeholder={placeholder}
              className='pr-8 pl-4'
            />
            <div className='absolute inset-y-0 right-1 flex items-center cursor-pointer'>
              <img src={SearchIcon} />
            </div>
          </div>

          <div>
            <Tabs
              defaultActiveKey={credentialList?.[0].id}
              items={credentialList.map(v => {
                return {
                  key: v.id,
                  label: v.name,
                  children: (
                    <div className='flex flex-wrap gap-x-4 select-none'>
                      {v.list?.map(c => {
                        return (
                          <div
                            key={c.credentialId}
                            className='px-4 py-2.5 rounded-2.5xl bg-gray flex items-center gap-x-2 cursor-pointer'
                          >
                            {c.name}
                            <PlusOutlined />
                          </div>
                        )
                      })}
                    </div>
                  )
                }
              })}
            />
          </div>
        </div>
        <div>x</div>
      </div>
    </Modal>
  )
}
