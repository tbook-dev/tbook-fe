import Button from '@/components/button'
import SearchIcon from '@/images/icon/search.svg'
import { Input, Tabs, Modal, Form } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import x from '@/images/icon/x.svg'
import closeIcon from '@/images/icon/close.svg'
import { useCallback, useEffect } from 'react'
import {
  rewardDistributionMethod,
  incentiveMethodList,
  incentiveAssetsTypeList
} from '@/utils/conf'
const title = 'Set Up Reward'
const defaultIncentive = [{}]
export default function CredentialModal ({
  open,
  setOpen,
  handleSave,
  credentialList,
  conf
}) {
  const [rewardForm] = Form.useForm()
  const reward = Form.useWatch('reward', rewardForm)
  const credentialSet = credentialList.map(v => v.list).flat()

  // console.log({ credentialsFormValues, conf })
  const handleOk = async () => {
    rewardForm
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
      rewardForm.setFieldsValue({ credential: conf ?? [] })
    }
  }, [open])
  const closeModal = useCallback(() => {
    setOpen(false)
    rewardForm.resetFields()
  }, [])
  return (
    <Modal
      width={640}
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
      <div className='flex items-center gap-x-6 mb-5'>
        {incentiveAssetsTypeList.map((v, i) => (
          <Button
            key={i}
            className='flex px-4 py-2.5 gap-x-4 items-center text-sm font-medium text-t-1'
          >
            {v.label}
            <PlusOutlined />
          </Button>
        ))}
      </div>

      <Form
        form={rewardForm}
        layout='vertical'
        requiredMark={false}
        initialValues={{
          reward: defaultIncentive
        }}
      >
        <Form.List
          name='reward'
          rules={[
            {
              validator: async (x, plans) => {
                //   if (!plans || plans.length < 1) {
                //     return Promise.reject(new Error("At least 1 Plan"));
                //   }
                //   const tokenSum = sumBy(plans, "tokenNum");
                //   if (tokenSum > tokenTotalAmount) {
                //     return Promise.reject(new Error("Total Token exceed the max token supply"));
                //   }
              }
            }
          ]}
        >
          {(fields, { add, remove }, { errors }) => {
            return (
              <>
                {fields.map(({ key, name, ...restField }, idx) => {
                  return (
                    <div
                      key={key}
                      className='bg-b-1 rounded-md p-4 mb-3 relative'
                    >
                      {idx !== 0 && (
                        <img
                          src={closeIcon}
                          onClick={() => {
                            remove(name)
                          }}
                          className='object-contain w-4 h-4 cursor-pointer absolute top-3 right-3 z-10'
                        />
                      )}
                      <Form.Item
                        {...restField}
                        name={[name, 'credentials']}
                        label='Choose the Credentials'
                        rules={[{ required: true, message: 'Missing!' }]}
                      >
                        <TagList options={credentialList} />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'incentiveAsset']}
                        label='Choose the Incentive Assets'
                        rules={[{ required: true, message: 'Missing!' }]}
                      >
                        <TagRadio options={incentiveAssetsTypeList} />
                      </Form.Item>
                      <Form.Item noStyle shouldUpdate>
                        {({ getFieldValue }) => {
                          // console.log(
                          //   getFieldValue([
                          //     'reward',
                          //     name,
                          //     'incentiveAsset'
                          //   ])
                          // )
                          return getFieldValue([
                            'reward',
                            name,
                            'incentiveAsset'
                          ]) === 1 ? (
                            <Form.Item
                              {...restField}
                              name={[name, 'nft']}
                              label={
                                <div className='flex justify-between items-center w-[568px]'>
                                  <span> Choose the NFT</span>
                                  <Link
                                    to='/nft'
                                    className='bg-[rgb(38,38,38)] rounded-full w-6 h-6 text-white hover:text-white flex justify-center items-center'
                                  >
                                    +
                                  </Link>
                                </div>
                              }
                              rules={[{ required: true, message: 'Missing!' }]}
                            >
                              <ImgSelect
                                slidesPerView={4}
                                options={list.map(v => ({
                                  img: v.coverUrl,
                                  value: v.nftId
                                }))}
                                imgclx='h-[120px]'
                              />
                            </Form.Item>
                          ) : (
                            <Form.Item
                              {...restField}
                              name={[name, 'pointAmount']}
                              label='Point Amount'
                            >
                              <InputNumber
                                className='w-full'
                                min={1}
                                step={1}
                                placeholder='Enter the point amount each participant would earn'
                              />
                            </Form.Item>
                          )
                        }}
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        name={[name, 'method']}
                        label='Incentive Method'
                        rules={[{ required: true, message: 'Missing!' }]}
                      >
                        <Select placeholder='Select the category'>
                          {incentiveMethodList.map(v => {
                            return (
                              <Select.Option value={v.value} key={v.value}>
                                <p>{v.title}</p>
                                <p>{v.desc}</p>
                              </Select.Option>
                            )
                          })}
                        </Select>
                      </Form.Item>
                      {
                        <Form.Item noStyle shouldUpdate>
                          {({ getFieldValue }) => {
                            const method = getFieldValue([
                              'reward',
                              name,
                              'method'
                            ])
                            if (method !== 3) {
                              return (
                                <Form.Item
                                  {...restField}
                                  name={[name, 'amount']}
                                  label='Amount'
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Missing!'
                                    }
                                  ]}
                                >
                                  <InputNumber
                                    className='w-full'
                                    min={1}
                                    step={1}
                                    placeholder='Enter the participant amount you would like to reward'
                                  />
                                </Form.Item>
                              )
                            }
                          }}
                        </Form.Item>
                      }

                      <Form.Item
                        {...restField}
                        name={[name, 'distributionMethod']}
                        label='Reward Distribution Method'
                        rules={[{ required: true, message: 'Missing!' }]}
                      >
                        <Select
                          placeholder='Select the Reward Distribution Method'
                          options={rewardDistributionMethod}
                        />
                      </Form.Item>
                    </div>
                  )
                })}
                <p style={{ color: '#dc4446', marginBottom: 12 }}>{errors}</p>

                <div className='mb-4'>
                  <Button
                    onClick={() => {
                      add()
                      const incentives = rewardForm.getFieldValue('reward')
                      rewardForm.setFieldValue('reward', [
                        ...incentives.slice(0, -1),
                        ...defaultIncentive
                      ])
                    }}
                    className='!flex items-center justify-center'
                  >
                    <PlusOutlined /> New Reward
                  </Button>
                </div>
              </>
            )
          }}
        </Form.List>
      </Form>
    </Modal>
  )
}
