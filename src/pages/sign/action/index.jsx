import { shortAddress } from "@/utils/const";
import { Typography, Button, Spin } from "antd";
import { useSelector } from "react-redux";
import { useConnect, useAccount, useSignMessage } from "wagmi";
import doneIcon from "@/images/icon/done.svg";
import { getGrantSignInfo, postGrantSignInfo } from "@/api/incentive";
import { useWeb3Modal } from "@web3modal/react";
import clsx from "clsx";
import { useParams } from "react-router-dom";
import copyIcon from "@/images/icon/copy.svg";

const { Paragraph } = Typography;

export default function ({ signStatus, signList, setSignList }) {
  const userInfo = useSelector((state) => state.user.user);
  const { connectAsync, connectors } = useConnect();
  const { isDisconnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { grantId } = useParams();
  const { open } = useWeb3Modal();

  async function handleSign(sign) {
    if (isDisconnected) {
      if (window.ethereum) {
        await connectAsync({
          connector: connectors.find((c) => c.id == "injected"),
        });
      } else {
        await open("ConnectWallet");
      }
    }
    signMessageAsync({ message: sign.signInfo })
      .then((s) => {
        return postGrantSignInfo(null, grantId, sign.grantSignId, s);
      })
      .then(async (r) => {
        const list = await getGrantSignInfo(null, grantId);
        setSignList(list);
        // const list = await getGrantSignInfo(null, grantId);
        // const isAllSigned  = list.some(sg =>sg.grantSign.signStatus==1)
        // let link = "/incentive";
        // const granteeProjects = projects.filter((v) => v.currentUserRole === 4);
        // if (granteeProjects.length === projects.length) {
        //   // 只有grantee角色
        //   link = `/my-grants`;
        // }
        // navigate(link);
      });
  }
  const Sign = () => {
    const sg = signList.find(
      (sg) => sg?.signer?.mainWallet === userInfo.mainWallet
    );
    if (!sg) {
      return (
        <div className="flex justify-center lg:w-[600px] mx-auto">
          <Spin />
        </div>
      );
    }

    return (
      <div
        className={clsx(
          "lg:w-[600px] mx-auto lg:px-6 lg:py-4 lg:shadow-d3  rounded-lg bg-black",
          signStatus === "notyet" && "lg:h-[72px]",
          signStatus === "done" && "bg-cw1",
          signStatus === "allDone" && "lg:h-[72px]"
        )}
      >
        <div
          className={clsx(
            "flex h-full",
            signStatus === "notyet" && "items-center justify-between",
            signStatus === "done" && "flex-col",
            signStatus === "allDone" && "items-center justify-between flex-col"
          )}
        >
          {signStatus === "notyet" && (
            <>
              <div className="flex items-center ">
                <div className="flex items-center justify-center w-8 h-8 mr-2 rounded-full bg-cw1 lg:w-8 lg:h-8">
                  <img src={sg.signer.avatar} className="w-5 h-5" />
                </div>
                <p className="text-c1 text-colorful1">
                  {shortAddress(sg.signer.mainWallet)}
                </p>
              </div>

              <Button
                type="primary"
                className="lg:w-[120px]"
                onClick={() => handleSign(sg.grantSign)}
              >
                Sign
              </Button>
            </>
          )}
          
          {signStatus === "done" && (
            <>
              <div className="flex items-center mb-2.5">
                <img src={doneIcon} className="mr-2" />
                <span className="font-medium text-black text-c1">
                  {shortAddress(sg.signer.mainWallet)}
                </span>
              </div>
              <p className="text-black text-c5 py-2.5">
                Please copy and send the following link to the grantee.
              </p>
              <Paragraph
                copyable={{
                  text: `${location.origin}/grantee/${grantId}/sign`,
                  icon: <img src={copyIcon} />,
                }}
                className="flex justify-between rounded-md lg:py-0"
                style={{
                  marginBottom: 0,
                  backgroundColor: "#fff",
                  padding: "8px 16px",
                  boxShadow:
                    "0px 0px 8px rgba(38, 227, 194, 0.25), 0px 0px 6px rgba(69, 160, 245, 0.6)",
                }}
              >
                <span className="text-[rgba(153, 153, 153, 0.4)] text-c1">
                  {`${location.origin}/grantee/${grantId}/sign`}
                </span>
              </Paragraph>
            </>
          )}
          {signStatus === "allDone" && (
            <div className="flex items-center">
              <img src={doneIcon} className="mr-2" />
              <span className="font-medium text-c1 text-colorful1">
                {shortAddress(sg.signer.mainWallet)}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  };
  return (
    (signStatus === "notyet" || signStatus === "done") && (
      <>
        <div
          className={clsx(
            "fixed bottom-0 left-0 right-0 lg:py-9 dark:bg-b-1 blur-[1px] backdrop-blur-sm",
            signStatus === "notyet" && "lg:h-[144px]",
            signStatus === "done" && "lg:h-[224px]",
            signStatus === "allDone" && "lg:h-[144px]"
          )}
        ></div>
        <div className="fixed bottom-0 left-0 right-0 lg:py-9">
          <Sign />
        </div>
      </>
    )
  );
}
