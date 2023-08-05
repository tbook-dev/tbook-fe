import Button from '@/components/button'
import { InputNumber, Select, Modal, Input, Form } from 'antd'
import { PlusOutlined, CloseOutlined } from '@ant-design/icons'
import closeIcon from '@/images/icon/close.svg'
import { useCallback, useEffect } from 'react'
import {
  rewardDistributionMethod,
  incentiveMethodList,
  incentiveAssetsTypeList,
  supportChains
} from '@/utils/conf'
import { getNFTcontracts } from '@/api/incentive'
import { useQuery } from 'react-query'

const title = 'Set Up Reward'
const defaultIncentive = [{}]
const nftText = {
  title: 'NFT Contracts List',
  desc: 'You could use the TBOOK contract to mint NFT items for incentive, or deploy your own NFT contract.'
}
export default function CredentialModal ({
  open,
  setOpen,
  handleSave,
  credentialList,
  conf
}) {
  const { data: NFTcontracts } = useQuery('NFTcontracts', getNFTcontracts)
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
      open={open}
      onCancel={closeModal}
      maskStyle={{ backdropFilter: 'blur(7.5px)' }}
      centered
      title={<div className='text-4.2xl font-black text-t-1'>{title}</div>}
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
                      {/* <Form.Item noStyle shouldUpdate>
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
                      </Form.Item> */}
                      <Form.Item
                        {...restField}
                        name={[name, 'mame']}
                        label='NFT Name'
                        rules={[{ required: true, message: 'Missing!' }]}
                      >
                        <Input placeholder='Enter NFT Name' />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        name={[name, 'contract']}
                        label='NFT Media File'
                        rules={[{ required: true, message: 'Missing!' }]}
                      >
                        <Select
                          placeholder='Select NFT Contract'
                          dropdownRender={menu => (
                            <div className='px-5 py-2.5'>
                              <div className='mb-5'>
                                <h2>{nftText.title}</h2>
                                <p>{nftText.desc}</p>
                              </div>
                              {menu}
                              <Button type='text'>Add item</Button>
                            </div>
                          )}
                        >
                          {NFTcontracts.map(item => {
                            const icon = supportChains.find(
                              v => item.chainId === v.value
                            ).icon
                            return (
                              <Select.Option
                                key={item.contractId}
                                value={item.contractId}
                                label={item.name}
                              >
                                <div className='flex items-center gap-x-1'>
                                  <img src={icon} className='w-4 h-4' />
                                  <span className='ml-2'>{item.name}</span>
                                </div>
                              </Select.Option>
                            )
                          })}
                        </Select>
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        name={[name, 'picUrl']}
                        label='NFT Contract'
                        rules={[{ required: true, message: 'Missing!' }]}
                      >
                        <Select placeholder='Select NFT Contract' />
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
