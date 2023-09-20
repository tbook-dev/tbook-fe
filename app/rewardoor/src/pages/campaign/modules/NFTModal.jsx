import { useState, useEffect } from "react";
import Button from "@/components/button";
import { Modal, Form, Input, Select, Switch } from "antd";
import { supportChains, factoryContract } from "@/utils/conf";
import { handleCreateNFTcontract, createNFT } from "@/api/incentive";
import useUserInfo from "@/hooks/queries/useUserInfo";
import { useQueryClient } from "react-query";
import {
  useAccount,
  useSwitchNetwork,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { optimismGoerli, optimism } from "wagmi/chains";
import abi from "@/abi/nft";

const nftPlaceholder =
  "Enter the name that will be visible on blockchain as official verification";
const symbolPlaceholder =
  "Enter the Token Symbol that will be visible on the blockchain";

const title = "Deploy NFT Contract";
const chainId = import.meta.env.VITE_CHAIN_ID;
const stationContract = import.meta.env.VITE_SPACESTATION_CONTRACT;

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
  const { switchNetwork, data: currentChain } = useSwitchNetwork();
  const { address, isConnected, ...others } = useAccount();
  const id = optimismGoerli.id;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [deployedAddress, setDeployedAddress] = useState("");
  const [fdInfo, setFdInfo] = useState(null);
  const [createNFTLoading, setCreateNFTLoading] = useState(false)
  const { config } = usePrepareContractWrite({
    address: factoryContract,
    abi: abi,
    functionName: "createStarNFT",
    args: [stationContract, address, NFTName, NFTSymbol, NFTTransferable],
    enabled: true,
  });

  const { data, isLoading, isSuccess, writeAsync } = useContractWrite(config);

  const waitForTransaction = useWaitForTransaction({
    hash: data?.hash,
    onSuccess(data) {
      console.log("transaction log: ", data);
      setDeployedAddress(data.logs[0].address);
    },
  });

  useEffect(() => {
    if (currentChain?.id != chainId) {
      switchNetwork(chainId);
    }
  }, [currentChain]);

  useEffect(() => {
    if (deployedAddress.length > 0) {
      console.log('deployedAddress->',createNFTLoading)
      setCreateNFTLoading(true);
      createNFT({
        ...fdInfo,
        chainId: chainId,
        contract: deployedAddress,
      })
        .then((d) => {
          console.log(d);
          queryClient.refetchQueries("NFTcontracts");
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
      setCreateNFTLoading(true);

      const r = await writeAsync?.({
        args: [address, address, name, symbol, !!transferable],
        from: address,
      });
      console.log(r);
      setFdInfo(() => ({
        name: name,
        symbol: symbol,
        chainId: network,
        projectId: projectId,
      }));
      // handleCreateNFTcontract(projectId, values).then(res => {
      //   queryClient.refetchQueries('NFTcontracts')
      //   setOpen(false)
      // })
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
              <Select.Option value={v.value} key={v.value}>
                <div className="flex items-center gap-x-1">
                  <img src={v.icon} className="w-4 h-4" />
                  <span className="ml-2">{v.label}</span>
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
