import { Form, Input, Upload } from 'antd'
import { useState } from 'react'
import clsx from 'clsx'
import uploadIcon from '@/images/icon/upload.svg'
import Button from '@/components/button'
import { conf } from '@tbook/utils'
import { useAccount, useSwitchNetwork } from 'wagmi'
import { logout } from '@/utils/web3'
import { NetWork } from '@tbook/ui'
import { useNavigate } from 'react-router-dom'
import { createNFT } from '@/api/incentive'
import { useCurrentProject } from '@tbook/hooks'

const { chains } = conf

const textMap = {
  1: {
    title: 'Choose the Wallet',
    step: 'Choose the Wallet',
    cancel: 'Cancel',
    next: 'Next'
  },
  2: {
    title: 'New NFT',
    step: 'New NFT',
    cancel: 'Previous',
    next: 'Next'
  },
  3: {
    title: 'Ready to Deploy?',
    step: 'Deploy',
    cancel: 'Previous',
    next: 'Create'
  }
}

const NFTMap = {
  1: 'Token shares the same image',
  2: 'Token shares different images',
  3: 'Import a deployed NFT'
}
const dashboardLink = `/dashboard/assets`

export default function () {
  const [step, setStep] = useState('1')
  const [NFTtype, setNFTtype] = useState('3')
  const { switchNetwork } = useSwitchNetwork()
  const navigate = useNavigate()
  const project = useCurrentProject()
  const { address, isConnected, ...others } = useAccount()
  const id = 1
  const [form] = Form.useForm()
  const [confirmLoading, setConfirmLoading] = useState(false)
  console.log({ project })
  async function handleSwitch (id) {
    // 1 Ethereum
    // 56 BNB
    if (switchNetwork) {
      switchNetwork(id)
    }
    localStorage.setItem('chainId', id)
    await logout()
    window.location.href = `${location.origin}`
  }

  // 当前的主网
  const normFile = e => {
    console.log('Upload event:', e)
    if (Array.isArray(e)) {
      return e
    }
    return e?.fileList
  }

  function handleCreate () {
    if (step === '1') {
      setStep('2')
      return
    }
    setConfirmLoading(true)

    form
      .validateFields()
      .then(async values => {
        try {
          const res = await createNFT({
            ...values,
            projectId: project.projectId
          })
        } catch (err) {
          navigate(dashboardLink)
        }
        setConfirmLoading(false)
      })
      .catch(err => {
        console.log(err, 'error')
        setConfirmLoading(false)
      })
  }

  function handleCancel () {
    if (step === '1') {
      navigate(dashboardLink)
      return
    }
    if (step !== '3') {
      setStep(Number(step) - 1 + '')
      return
    }
  }
  return (
    <div className='w-full text-white'>
      <div className='w-[600px] mx-auto pt-20'>
        <h1 className='text-5xl text-center mb-12 font-bold'>
          {textMap[step]?.title}
        </h1>

        <div className='h-10 grid grid-cols-3 gap-x-10 mb-3'>
          {Object.entries(textMap).map(([n, v]) => {
            return (
              <div
                key={v.step}
                className={clsx(
                  n === step ? 'text-white' : 'text-c-9',
                  'font-medium text-sm bg-b-1  flex justify-center items-center',
                  'rounded-md select-none'
                  // 'cursor-pointer'
                )}
                // onClick={() => {
                //   setStep(n)
                // }}
              >
                {`${n} ${v.step}`}
              </div>
            )
          })}
        </div>
        {step === '1' && (
          <div className='space-y-3 text-sm'>
            {chains.map(chain => (
              <div
                key={chain.evmChainId}
                className={clsx(
                  chain.evmChainId === id
                    ? 'text-white font-bold'
                    : 'font-medium cursor-pointer text-c-9',
                  'bg-gray rounded-button flex justify-center items-center h-10 hover:opacity-70'
                )}
                // onClick={() => {
                //   if (chain.evmChainId !== id) {
                //     handleSwitch(chain.evmChainId)
                //   }
                // }}
              >
                <div className='flex items-center justify-center w-6 h-6'>
                  <NetWork id={chain.evmChainId} />
                </div>
                <span className={clsx('ml-2 ')}>{chain.name}</span>
              </div>
            ))}
          </div>
        )}

        {step === '2' && (
          <Form
            form={form}
            layout='vertical'
            requiredMark={false}
            // initialValues={{ category: 'DeFi' }}
          >
            <div className='h-10 grid grid-cols-3 gap-x-2.5 mb-3 bg-b-1'>
              {Object.entries(NFTMap).map(([n, v]) => {
                return (
                  <div
                    key={v}
                    className={clsx(
                      n === NFTtype ? 'text-white' : 'text-c-9',
                      'font-medium text-xs bg-b-1 cursor-pointer flex justify-center items-center',
                      'rounded-md select-none'
                    )}
                    onClick={() => {
                      setNFTtype(n)
                    }}
                  >
                    {v}
                  </div>
                )
              })}
            </div>
            {NFTtype === '1' && 'not ready'}
            {NFTtype === '2' && (
              <>
                <Form.Item
                  label='NFT Name'
                  name='name'
                  rules={[{ required: true, message: 'NFT Name is required' }]}
                >
                  <Input placeholder='Enter an NFT name visible on blockchain that serves as an official verification' />
                </Form.Item>

                <Form.Item
                  label='Symbol'
                  name='symbol'
                  rules={[{ required: true, message: 'Symbol is required' }]}
                >
                  <Input placeholder='Token ticker for NFT contract visible on blockchain that serves as an official verification' />
                </Form.Item>

                <Form.Item label='Dragger'>
                  <Form.Item
                    name='dragger'
                    valuePropName='fileList'
                    getValueFromEvent={normFile}
                    noStyle
                  >
                    <Upload.Dragger name='files' action='/upload.do'>
                      <p className='ant-upload-drag-icon flex justify-center'>
                        <img src={uploadIcon} />
                      </p>
                      <p className='ant-upload-text'>
                        Upload the compress of the images
                      </p>
                      <p className='ant-upload-hint'>
                        ZIP,RAR of images. Maximum file size 100 MB.
                      </p>
                    </Upload.Dragger>
                  </Form.Item>
                </Form.Item>

                <Form.Item
                  label='Minting Cap'
                  name='cap'
                  rules={[
                    { required: true, message: 'Minting Cap is required' }
                  ]}
                >
                  <Input placeholder='Enter the number of minting cap' />
                </Form.Item>
              </>
            )}

            {NFTtype === '3' && (
              <Form.Item
                label='NFT Contract'
                name='contract'
                rules={[
                  { required: true, message: 'NFT Contract is required' }
                ]}
              >
                <Input placeholder='Paste your NFT Contract Address here' />
              </Form.Item>
            )}
          </Form>
        )}

        <div className='flex justify-center py-20'>
          <Button className='mr-6' onClick={handleCancel}>
            {textMap[step]?.cancel}
          </Button>
          <Button
            type='primary'
            onClick={handleCreate}
            loading={confirmLoading}
          >
            {textMap[step]?.next}
          </Button>
        </div>
      </div>
    </div>
  )
}
