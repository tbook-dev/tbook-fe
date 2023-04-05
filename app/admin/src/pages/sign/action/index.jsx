import { Typography, Spin } from "antd";
import { useSelector } from "react-redux";
import { useConnect, useAccount, useSignMessage } from "wagmi";
import doneIcon from "@tbook/share/images/icon/done.svg";
import { getGrantSignInfo, postGrantSignInfo } from "@/api/incentive";
import clsx from "clsx";
import { useParams } from "react-router-dom";
import copyIcon from "@tbook/share/images/icon/copy.svg";
import { conf } from "@tbook/utils";

const { shortAddress } = conf;
const { Paragraph } = Typography;

export default function ({ signStatus, signList, setSignList }) {
  const userInfo = useSelector((state) => state.user.user);
  const { connectAsync, connectors } = useConnect();
  const { isDisconnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { grantId } = useParams();

  async function handleSign(sign) {
    if (isDisconnected) {
      if (window.ethereum) {
        await connectAsync({
          connector: connectors.find((c) => c.id == "injected"),
        });
      } else {
        //await open("ConnectWallet");
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
    const sg = signList.find((sg) => sg?.signer?.mainWallet === userInfo.mainWallet);
    if (!sg) {
      return (
        <div className="relative z-10 flex justify-center lg:w-[600px] mx-auto">
          <Spin />
        </div>
      );
    }

    const granteeLink =
      (location.origin.includes("staging") ? "https://my-staging.tbook.com" : "https://my.tbook.com") +
      location.pathname;
    return (
      <div
        className={clsx(
          "relative z-10 my-[26px] lg:w-[600px] lg:mx-auto mx-4 p-2 lg:px-6 lg:shadow-d3  rounded-lg bg-black",
          // signStatus === "notyet" && "lg:h-[72px]",
          signStatus === "done" && "bg-cw1"
          // signStatus === "allDone" && "lg:h-[72px]"
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
                <div className="flex items-center justify-center w-6 h-6 mr-2 rounded-full bg-cw1 lg:w-8 lg:h-8">
                  <img src={sg.signer.avatar} className="w-3 h-3 lg:w-5 lg:h-5" />
                </div>
                <p className="text-c4 lg:text-c1 text-colorful1">{shortAddress(sg.signer.mainWallet)}</p>
              </div>

              <button
                type="button"
                className="w-[70px] h-[24px] rounded-md bg-cw1  text-c9 lg:w-[120px] lg:h-10 lg:rounded-lg text-black"
                onClick={() => handleSign(sg.grantSign)}
              >
                Sign
              </button>
            </>
          )}

          {signStatus === "done" && (
            <>
              <div className="flex items-center mb-2.5">
                <img src={doneIcon} className="mr-2" />
                <span className="font-medium text-black text-c4 lg:text-c1">{shortAddress(sg.signer.mainWallet)}</span>
              </div>
              <p className="text-black text-c4 py-2.5">Please copy and send the following link to the grantee.</p>
              <Paragraph
                copyable={{
                  text: granteeLink,
                  icon: <img src={copyIcon} />,
                }}
                className="flex justify-between rounded-md lg:py-0"
                style={{
                  marginBottom: 0,
                  backgroundColor: "#fff",
                  padding: "8px 16px",
                  boxShadow: "0px 0px 8px rgba(38, 227, 194, 0.25), 0px 0px 6px rgba(69, 160, 245, 0.6)",
                }}
              >
                <span className="text-[rgba(153, 153, 153, 0.4)] text-c4 lg:text-c1">{granteeLink}</span>
              </Paragraph>
            </>
          )}
          {signStatus === "allDone" && (
            <div className="flex items-center">
              <img src={doneIcon} className="mr-2" />
              <span className="font-medium text-c4 lg:text-c1 text-colorful1">
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
      <div className="fixed bottom-0 left-0 right-0 before:absolute before:inset-0 before:dark:bg-b-1 before:blur-[1px] before:backdrop-blur-sm">
        <Sign />
      </div>
    )
  );
}
