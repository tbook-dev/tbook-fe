import Button from '@/components/button'
import { InputNumber, Select, Modal, Input, Form, Upload, Switch } from 'antd'
import { PlusOutlined, CloseOutlined } from '@ant-design/icons'
import closeIcon from '@/images/icon/close.svg'
import { useCallback, useEffect, useState } from 'react'
import {
  incentiveMethodList,
  incentiveAssetsTypeList,
  supportChains
} from '@/utils/conf'
import NFTModal from './NFTModal'
import uploadFile from '@/utils/upload'
import uploadIcon from '@/images/icon/upload.svg'
import clsx from 'clsx'
import SelectNFT from '@/components/SelectNFT'

const title = 'Set Up Reward'
const defaultIncentive = { rewardType: 1, unlimited: false }
const nftText = {
  title: 'NFT Contracts List',
  desc: 'You could use the TBOOK contract to mint NFT items for incentive, or deploy your own NFT contract.'
}
export default function CredentialModal ({
  open,
  setOpen,
  handleSave,
  conf,
  NFTcontracts
}) {
  const [rewardForm] = Form.useForm()
  const reward = Form.useWatch('reward', rewardForm)
  const [showContractModal, setShowContractModal] = useState(false)
  const [selectOpen, setSelectOpen] = useState(false)

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
  const hanleUpload = ({ onSuccess, onError, file }) => {
    uploadFile(file).then(onSuccess).catch(onError)
  }
  const normFile = e => {
    console.log('Upload event:', e)
    if (Array.isArray(e)) {
      return e
    }
    return e?.fileList
  }
  useEffect(() => {
    if (open) {
      const useDefaultValue = conf?.length === 0
      rewardForm.setFieldsValue({
        reward: useDefaultValue ? [defaultIncentive] : conf
      })
    }
  }, [open])
  const closeModal = useCallback(() => {
    setOpen(false)
    // rewardForm.resetFields()
  }, [])
  // console.log({ NFTcontracts })
  return (
    <Modal
      width={640}
      open={open}
      onCancel={closeModal}
      maskStyle={{ backdropFilter: 'blur(7.5px)' }}
      destroyOnClose
      centered
      title={<div className='text-4.2xl font-black text-t-1'>{title}</div>}
      footer={
        <div className='flex justify-end' onClick={handleOk}>
          <Button type='primary'>Save</Button>
        </div>
      }
    >
      <div className='flex items-center gap-x-6 mb-5'>
        {open &&
          incentiveAssetsTypeList.map((v, i) => {
            const rewards = rewardForm?.getFieldValue('reward') || []
            // console.log({ rewards })
            const disabled =
              v.value === 2 &&
              rewards?.filter(v => v.rewardType === 2).length > 0

            return (
              <Button
                key={i}
                disabled={disabled}
                onClick={() => {
                  console.log({ disabled })
                  if (!disabled) {
                    rewardForm.setFieldsValue({
                      reward: rewardForm
                        .getFieldValue('reward')
                        ?.concat({ ...defaultIncentive, rewardType: v.value })
                    })
                  }
                }}
                className={clsx(
                  'flex px-4 py-2.5 gap-x-4 items-center text-sm font-medium text-t-1',
                  disabled && 'cursor-not-allowed'
                )}
              >
                <div className='flex items-center gap-x-2'>
                  <img src={v.icon} className='w-5 h-5' />
                  {v.text}
                </div>
                <PlusOutlined />
              </Button>
            )
          })}
      </div>

      <Form
        form={rewardForm}
        layout='vertical'
        // requiredMark={false}
        initialValues={{
          reward: [defaultIncentive]
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
          {(fields, { remove }, { errors }) => {
            return (
              <>
                {fields.map(({ key, name, ...restField }, idx) => {
                  const rewardType = rewardForm.getFieldValue([
                    'reward',
                    name,
                    'rewardType'
                  ])
                  const unlimited = rewardForm.getFieldValue([
                    'reward',
                    name,
                    'unlimited'
                  ])
                  const asset = incentiveAssetsTypeList.find(
                    v => v.value === rewardType
                  )
                  return (
                    <div
                      key={key}
                      className='bg-b-1 rounded-md p-4 mb-5 relative'
                    >
                      <div className='text-xl text-t-1 mb-5 font-bold relative'>
                        <div className='flex items-center gap-x-2'>
                          <img src={asset.icon} className='w-5 h-5' />
                          <span>{asset.text}</span>
                        </div>
                        <img
                          src={closeIcon}
                          onClick={() => {
                            remove(name)
                          }}
                          className='object-contain w-4 h-4 cursor-pointer absolute top-3 right-3 z-10'
                        />
                      </div>

                      {rewardType === 1 ? (
                        <>
                          <Form.Item
                            {...restField}
                            name={[name, 'name']}
                            label='NFT Name'
                            rules={[{ required: true, message: 'Missing!' }]}
                          >
                            <Input placeholder='Enter NFT Name' />
                          </Form.Item>

                          <Form.Item
                            {...restField}
                            name={[name, 'nftId']}
                            label='NFT Contract'
                            rules={[{ required: true, message: 'Missing!' }]}
                          >
                            <SelectNFT
                              placeholder='Select NFT Contract'
                              // open={selectOpen}
                              // onDropdownVisibleChange={setSelectOpen}
                              dropdownRender={setSelectOpen => menu =>
                                (
                                  <div className='px-5 py-2.5'>
                                    <div className='mb-5'>
                                      <h2 className='text-sm font-bold'>
                                        {nftText.title}
                                      </h2>
                                      <p className='text-sm text-c-9'>
                                        {nftText.desc}
                                      </p>
                                    </div>
                                    {menu}
                                    <div className='flex justify-center'>
                                      <Button
                                        onClick={() => {
                                          setSelectOpen(false)
                                          setShowContractModal(true)
                                        }}
                                        type='text'
                                        className='text-c-9 text-sm'
                                      >
                                        <PlusOutlined className='mr-3' />
                                        Deploy New NFT Contract
                                      </Button>
                                    </div>
                                  </div>
                                )}
                            >
                              {NFTcontracts.map(item => {
                                const icon = supportChains.find(
                                  v => item.chainId === v.value
                                )?.icon
                                return (
                                  <Select.Option
                                    key={item.nftId}
                                    value={item.nftId}
                                    label={item.name}
                                  >
                                    <div className='flex items-center gap-x-1'>
                                      <img src={icon} className='w-4 h-4' />
                                      <span className='ml-2'>{item.name}</span>
                                    </div>
                                  </Select.Option>
                                )
                              })}
                            </SelectNFT>
                          </Form.Item>

                          <Form.Item
                            valuePropName='fileList'
                            getValueFromEvent={normFile}
                            label='NFT Media File'
                            name={[name, 'picUrl']}
                            rules={[
                              {
                                required: true,
                                message: 'image is required'
                              }
                            ]}
                          >
                            <Upload.Dragger
                              customRequest={hanleUpload}
                              multiple={false}
                              accept='image/*'
                              maxCount={1}
                            >
                              <p className='ant-upload-drag-icon flex justify-center'>
                                <img src={uploadIcon} />
                              </p>
                              <p className='ant-upload-text'>Upload an image</p>
                              <p className='ant-upload-hint'>
                                296*312 or higher
                              </p>
                              <p className='ant-upload-hint'>
                                recommended Max 20MB.
                              </p>
                            </Upload.Dragger>
                          </Form.Item>
                        </>
                      ) : (
                        <>
                          <Form.Item
                            name={[name, 'number']}
                            label='Number of point for each participant'
                            rules={[{ required: true, message: 'Missing!' }]}
                          >
                            <InputNumber
                              placeholder='try a number'
                              className='w-full'
                              min={0}
                            />
                          </Form.Item>
                        </>
                      )}
                      <Form.Item
                        {...restField}
                        name={[name, 'methodType']}
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

                      <Form.Item
                        name={[name, 'unlimited']}
                        label='Limited Number of Reward'
                        valuePropName='checked'
                        rules={[
                          {
                            required: true,
                            message: 'Missing!'
                          }
                        ]}
                      >
                        <Switch />
                      </Form.Item>
                      {unlimited && (
                        <>
                          {rewardType === 1 ? (
                            <Form.Item
                              label='Minting Cap'
                              name={[name, 'mintCap']}
                            >
                              <InputNumber
                                placeholder='try a number'
                                className='w-full'
                                min={0}
                              />
                            </Form.Item>
                          ) : (
                            <Form.Item
                              label='Number of Reward'
                              name={[name, 'rewardNum']}
                            >
                              <InputNumber
                                placeholder='try a number'
                                className='w-full'
                                min={0}
                              />
                            </Form.Item>
                          )}
                        </>
                      )}
                    </div>
                  )
                })}
                <p style={{ color: '#dc4446', marginBottom: 12 }}>{errors}</p>
              </>
            )
          }}
        </Form.List>
      </Form>

      <NFTModal visible={showContractModal} setOpen={setShowContractModal} />
    </Modal>
  )
}
