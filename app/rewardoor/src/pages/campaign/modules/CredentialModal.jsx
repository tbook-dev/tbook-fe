import Button from '@/components/button'
import SearchIcon from '@/images/icon/search.svg'
import { Input, Tabs, Modal, Form } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import x from '@/images/icon/x.svg'
import closeIcon from '@/images/icon/close.svg'
import { useCallback, useEffect } from 'react'
import { twParttern } from '@/utils/conf'

const title = 'Set Up Credential Group'
const placeholder = 'Enter Credential Title to search for Cred'
const titleGroup = 'Edit Credential Group'
const emptyPrompt = 'The selected credential will be displayed here.'

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
              defaultActiveKey={credentialList?.[0]?.id}
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
                            className='px-4 py-2.5 rounded-2.5xl bg-gray flex items-center gap-x-2 cursor-pointer hover:opacity-70'
                            onClick={() => {
                              form.setFieldsValue({
                                credential: [
                                  ...(form.getFieldValue('credential') ?? []),
                                  {
                                    credentialId: c.credentialId
                                  }
                                ]
                              })
                            }}
                          >
                            <img
                              src={v.picUrl ?? x}
                              className='w-5 h-5 object-contain'
                            />
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
        <div>
          <h2 className='text-xl font-black text-t-1 mb-5'>{titleGroup}</h2>
          <Form form={form} layout='vertical'>
            <Form.List name='credential'>
              {(fields, { remove }) => {
                return (
                  <>
                    {fields.length > 0 ? (
                      fields.map(({ key, name, ...restField }) => {
                        const credential = credentialSet.find(
                          v =>
                            v.credentialId ===
                            credentialsFormValues?.[name]?.credentialId
                        )
                        return (
                          <div
                            key={key}
                            className='px-4 py-2.5 rounded-2.5xl bg-gray mb-3 relative'
                          >
                            <img
                              src={closeIcon}
                              className='absolute right-4 top-4 w-2 h-2 object-contain cursor-pointer'
                              onClick={() => remove(name)}
                            />
                            <div>
                              <div className='flex items-center gap-x-2 mb-3'>
                                <img
                                  src={credential.picUrl || x}
                                  className='w-5 h-5 object-contain'
                                />
                                <p className='text-t-1 text-sm font-medium'>
                                  {credential.name}
                                </p>
                              </div>
                            </div>
                            <Form.Item
                              {...restField}
                              name={[name, 'link']}
                              label={credential.taskName}
                              rules={[
                                {
                                  required: true,
                                  message: `Missing ${credential.taskName}`
                                },
                                {
                                  pattern: twParttern,
                                  message: `Please enter a valid twitter URL`
                                }
                              ]}
                            >
                              <Input
                                placeholder={`Please paste ${credential.taskName} here`}
                              />
                            </Form.Item>
                          </div>
                        )
                      })
                    ) : (
                      <div className='h-20 rounded-2.5xl flex items-center justify-center bg-gray text-center'>
                        {emptyPrompt}
                      </div>
                    )}
                  </>
                )
              }}
            </Form.List>
          </Form>
        </div>
      </div>
    </Modal>
  )
}
