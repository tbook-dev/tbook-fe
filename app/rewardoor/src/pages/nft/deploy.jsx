import { Form, Input, Upload, InputNumber } from 'antd'
import { useEffect, useState } from 'react'
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
import uploadFile from '@/utils/upload'
import { shortAddress } from '@tbook/utils/lib/conf'
import { useSelector } from 'react-redux'
import { Icon } from '@tbook/ui'
import doneIcon from '@/images/icon/done.svg'
import { getNFTInfo } from '@/api/incentive'
import { optimismGoerli } from 'wagmi/chains'
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi'
import { fetchTransaction } from '@wagmi/core'
import abi from './abi'
const { chains } = conf

const textMap = {
  1: {
    title: 'Choose the Network',
    step: 'Choose the Network',
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
    title: 'Deploying',
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
const op = {
  name: 'op',
  fullName: 'Optimism',
  evm: true,
  evmChainId: 10
}

export default function () {
  const [step, setStep] = useState('1')
  const [NFTtype, setNFTtype] = useState('1')
  const [NFTDeployStatus, setNFTDeployStatus] = useState('unDeployed') // deployed,unDeployed
  // NFT合约地址
  const [NFTAddress, setNFTAddress] = useState('')
  // 图片地址
  const [NTFimgAddress, setNTFimgAddress] = useState('')
  // NFT name
  const [NFTName, setNFTName] = useState('tbook')
  const [NFTSymbol, setNFTSymbol] = useState('tbook')
  const [NFTTransferable, setNFTTransferable] = useState(true)
  const { switchNetwork } = useSwitchNetwork()
  const navigate = useNavigate()
  const project = useCurrentProject()
  const { address, isConnected, ...others } = useAccount()
  const id = optimismGoerli.id
  const [form] = Form.useForm()
  const [confirmLoading, setConfirmLoading] = useState(false)
  const deployer = useSelector(state => state.user.deployer)
  const [deployedAddress, setDeployedAddress] = useState('')
  const [fdInfo, setFdInfo] = useState(null)

  const hanleUpload = ({ onSuccess, onError, file }) => {
    uploadFile(file).then(onSuccess).catch(onError)
  }

  const { config } = usePrepareContractWrite({
    address: '0x62628a573CDEdEfB4694370FC5e68A2a93A8335e',
    abi: abi,
    functionName: 'createStarNFT',
    args: [address, address, NFTName, NFTSymbol, NFTTransferable],
    enabled: true
  })
  
  const { data, isLoading, isSuccess,  writeAsync } = useContractWrite(config)

  const waitForTransaction = useWaitForTransaction({
    hash: data?.hash,
    onSuccess(data) {
        setDeployedAddress(data.logs[0].address)
    }
  })

  useEffect(() => {
    if (deployedAddress.length > 0) {
        createNFT({
            ...fdInfo,
            contract: deployedAddress,
            // TODO use real group id
            groupId: 10
        })
        .then(r => r.json())
        .then(d => console.log(d))
    }
  }, [deployedAddress, fdInfo])

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
          const { name, contract, symbol, coverUrl } = values
          const chainId = 10
          let fd = {}
          if (NFTtype === '2' || NFTtype === '1') {
            const coverUrl0 =  coverUrl?.[0].response
            fd = {
              name,
              chainId,
              symbol,
              coverUrl: coverUrl0
            }
            setNFTName(name)
            setNTFimgAddress(coverUrl0)
            setStep('3')
          } else if (NFTtype === '3') {
            fd = {
              contract
            }
            const info = await getNFTInfo(contract)
            fd.name = info.title
            fd.symbol = info.contractMetadata?.symbol
            fd.coverUrl = info.media?.[0]?.gateway
            console.log(info)
            setNFTName(info.title)
            setNTFimgAddress(info.media?.[0]?.gateway)
            setStep('3')
          }
          //
          // if (NFTtype === '3') {
          //   // 通过合约获取相关信息
          //   const info = await getNFTInfo(contract)
          //   console.log(info)
          //   setNFTName(info.title)
          //   setNTFimgAddress(info.media?.[0]?.gateway)
          //   setStep('3')
          // }
          try {
            // const res = await createNFT({
            //   ...fd,
            //   chainId,
            //   projectId: project.projectId
            // })
            // setNFTAddress(res.data.contract)
            setFdInfo({
                ...fd, chainId, projectId: project.projectId
            })
            setNFTSymbol('TBook')
            r = await writeAsync?.({
                args: [address, address, NFTName, NFTSymbol, NFTTransferable],
                from: address
            })
            console.log(r)

            // setNFTAddress(res.contract)
            // setNFTDeployStatus('deployed')

            // navigate(dashboardLink)
          } catch (err) {
            console.log(err)
          }
        } catch (err) {
          // navigate(dashboardLink)
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
    if (step === '2') {
      setStep('1')
      return
    }else{
      setStep('2');
      setNFTDeployStatus('unDeployed')
      setNFTAddress('')
      setNTFimgAddress('')
      setNFTName('')
    }
  }
  console.log({ step, deployer, NTFimgAddress, NFTAddress, NFTName })
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
                  n === step ? 'text-white bg-cw1' : 'text-c-9 bg-b-1',
                  'font-medium text-sm flex justify-center items-center',
                  'rounded-button select-none'
                  // 'cursor-pointer'
                )}
                // onClick={() => {
                //   setStep(n)
                // }}
              >
                {`${n}. ${v.step}`}
              </div>
            )
          })}
        </div>
        {step === '1' && (
          <div className='space-y-3 text-sm'>
            {[optimismGoerli].map(chain => (
              <div
                key={chain.id}
                className={clsx(
                  chain.id === id
                    ? 'text-white font-bold'
                    : 'font-medium  text-c-9',
                  // "cursor-pointer", // 不能点
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
                    key={n}
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
            {NFTtype === '1' && (
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

                <Form.Item label='Upload image'>
                  <Form.Item
                    name='coverUrl'
                    valuePropName='fileList'
                    getValueFromEvent={normFile}
                    noStyle
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
                        PNG, JPG/JPEG, GIF, WebP. Maximum file size 100 MB.
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
                  <InputNumber
                    placeholder='Enter the number of minting cap'
                    min={1}
                    className='w-full'
                  />
                </Form.Item>
              </>
            )}
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

                <Form.Item label='Upload image'>
                  <Form.Item
                    name='coverUrl'
                    valuePropName='fileList'
                    getValueFromEvent={normFile}
                    noStyle
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
                <Input
                  placeholder='Paste your NFT Contract Address here'
                  className='w-full'
                />
              </Form.Item>
            )}
          </Form>
        )}

        {step === '3' && (
          <div
            className={clsx(
              'p-8 bg-b-1 rounded-button',
              NFTDeployStatus === 'deployed' && 'grid grid-cols-2'
            )}
          >
            {NFTDeployStatus === 'deployed' && (
              <div className='flex flex-col space-y-4 justify-center'>
                <img src={doneIcon} className='w-32 h-32' />
                <h3 className='text-xl font-bold'>Successfully Deployed!</h3>
                <a
                  className='text-sm font-medium text-c-9 underline'
                  href={`https://goerli-optimism.etherscan.io/address/${NFTAddress}`}
                  target='__blank'
                >
                  Check on Etherscan
                </a>
              </div>
            )}
            <div>
              <img
                src={NTFimgAddress}
                className='h-[374px] object-contain mb-6 w-full object-center'
              />
              <h3 className='mb-2 text-xl font-bold'>Onboarding {NFTName}</h3>
              <div className='flex items-center text-sm'>
                <Icon.NetWork id={10} className='mr-1.5' />
                <span className='font-medium text-c-9 mr-1'>from</span>
                <span className='font-bold'>
                  {shortAddress(
                    NFTDeployStatus === 'deployed' ? NFTAddress : deployer
                  )}
                </span>
              </div>
            </div>
          </div>
        )}
        <div className='flex justify-center py-20'>
          <Button className='mr-6' onClick={handleCancel}>
            {textMap[step]?.cancel}
          </Button>
          {!(step === '3' && NFTDeployStatus === 'deployed') && (
            <Button
              type='primary'
              onClick={handleCreate}
              loading={confirmLoading}
            >
              {textMap[step]?.next}
            </Button>
          )}
        </div>
        {
            isSuccess ? <div>{JSON.stringify(data)}</div> : null
        }
      </div>
    </div>
  )
}
