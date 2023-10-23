import { useState, useEffect } from "react";
import Button from "@/components/button";
import { Modal, Form, Input, Select, Switch } from "antd";
import { chainIcons } from "@/utils/conf";
import { getNFTSupportedChains, createNFT } from "@/api/incentive";
import useUserInfo from "@/hooks/queries/useUserInfo";
import { useQueryClient } from "react-query";
import {
  useAccount,
  useSwitchNetwork,
  useNetwork,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { getNetwork, prepareWriteContract, writeContract, waitForTransaction } from '@wagmi/core'
import abi from "@/abi/nft";
import { message } from "antd";

const nftPlaceholder =
  "Enter the name that will be visible on blockchain as official verification";
const symbolPlaceholder =
  "Enter the Token Symbol that will be visible on the blockchain";

const title = "Deploy NFT Contract";

export default function NFTModal({ visible, setOpen }) {
  const [form] = Form.useForm();
  const { projectId } = useUserInfo();
  const queryClient = useQueryClient();

  const [NFTtype, setNFTtype] = useState("1");
  const [NFTDeployStatus, setNFTDeployStatus] = useState("unDeployed"); // deployed,unDeployed
  // NFT合约地址
  const [NFTAddress, setNFTAddress] = useState("");
  // 图片地址
  const [NTFimgAddress, setNTFimgAddress] = useState("");
  // NFT name
  const [NFTName, setNFTName] = useState("tbook");
  const [NFTSymbol, setNFTSymbol] = useState("tbook");
  const [NFTTransferable, setNFTTransferable] = useState(true);
  const { switchNetworkAsync } = useSwitchNetwork();
  const { chain: currentChain } = useNetwork()
  const { address, isConnected, ...others } = useAccount();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [deployedAddress, setDeployedAddress] = useState("");
  const [fdInfo, setFdInfo] = useState(null);
  const [createNFTLoading, setCreateNFTLoading] = useState(false)
  const [supportChains, setSupportChains] = useState([])

  useEffect(() => {
    const getData = async () => {
      const contractChains = await getNFTSupportedChains()
      setSupportChains(contractChains)
    }
    getData()
  }, []);

  useEffect(() => {
    if (deployedAddress.length > 0) {
      console.log('deployedAddress->',createNFTLoading)
      setCreateNFTLoading(true);
      createNFT({
        ...fdInfo,
        contract: deployedAddress,
      })
        .then(async (d) => {
          console.log(d);
          await queryClient.refetchQueries("NFTcontracts");
          setOpen(false);
        })
        .finally(() => {
          setCreateNFTLoading(false);
        })
    }
  }, [deployedAddress, fdInfo]);

  const handleOk = async () => {
    form.validateFields().then(async (values) => {
      console.log(values);
      const { name, network, symbol, transferable } = values;
      if (network != currentChain.id) {
        await switchNetworkAsync(network)
      }
      if (network != getNetwork().chain?.id) {
        message.error('wrong network, please switch in your wallet')
        return
      }
      setCreateNFTLoading(true);
      const currentInfo = supportChains.find(c => c.chainId == network)

      try {
        const config = await prepareWriteContract({
          address: currentInfo.factoryAddress,
          abi: abi,
          functionName: "createStarNFT",
          args: [currentInfo.stationContractAddress, address, name, symbol, transferable],
        })

        const r = await writeContract(config)
        const data = await waitForTransaction({ hash: r.hash })
        console.log('transaction data', data)
        setDeployedAddress(data.logs[0].address);
        setFdInfo(() => ({
          name: name,
          symbol: symbol,
          chainId: network,
          projectId: projectId,
        }));
      } catch(e) {
        console.error("deploy error", e)
      }
    });
  };
  return (
    <Modal
      open={visible}
      onCancel={() => setOpen(false)}
      // onOk={() => setOpen(false)}
      maskStyle={{ backdropFilter: "blur(7.5px)" }}
      centered
      destroyOnClose
      title={<div className="text-4.2xl font-black text-t-1">{title}</div>}
      footer={
        <div className="flex justify-end" onClick={handleOk}>
          <Button type="primary" loading={createNFTLoading}>Save</Button>
        </div>
      }
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          transferable: false,
        }}
      >
        <Form.Item
          name="name"
          label="NFT Contract Name"
          rules={[{ required: true, message: "NFT name is required" }]}
        >
          <Input placeholder={nftPlaceholder} />
        </Form.Item>

        <Form.Item
          name="symbol"
          label="NFT Symbol"
          rules={[{ required: true, message: "NFT symbol is required" }]}
        >
          <Input placeholder={symbolPlaceholder} />
        </Form.Item>
        <Form.Item
          name="network"
          label="Network"
          rules={[{ required: true, message: "NFT Network is required" }]}
        >
          <Select>
            {supportChains.map((v) => (
              <Select.Option value={v.chainId} key={v.chainId}>
                <div className="flex items-center gap-x-1">
                  <img src={chainIcons[v.chainId]} className="w-4 h-4" />
                  <span className="ml-2">{v.chainName}</span>
                </div>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="transferable"
          label="Transferable"
          valuePropName="checked"
          rules={[{ required: true, message: "NFT Transferable is required" }]}
        >
          <Switch checkedChildren="yes" unCheckedChildren="no" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
