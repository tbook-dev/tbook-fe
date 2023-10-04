import { useState } from "react";
import { Spin, Modal } from "antd";
import { useResponsive } from "ahooks";
import clsx from "clsx";
import useSocial from "@/hooks/useSocial";

const modalConf = {
  title: "Verify",
  step1: {
    title: "Authorize your account",
    desc: {
      twitter: "Authorize your Twitter account to verify.",
      discord: "Authorize your Discord account to verify.",
      telegram: "Authorize your Discord account to verify.",
    },
  },
  step2: {
    title: "Verify your accomplishment.",
    desc: "Verify your accomplishment.",
    button: "Verify",
  },
};

export default function WithVerify({
  handleFn,
  className,
  sysConnectedMap,
  credentialType,
}) {
  const [open, setOpen] = useState(true);
  const [verifyLoading, setVefiryLoading] = useState(false);
  const { pc } = useResponsive();
  const { socialList } = useSocial()
  console.log({socialList})
  const handleClick = async (evt) => {
    setVefiryLoading(true);
    try {
      await handleFn(evt);
      setVefiryLoading(false);
    } catch (e) {
      console.log(e);
      setVefiryLoading(false);
    }
  };
  const userLogined = sysConnectedMap[credentialType];
  console.log({userLogined})
  return (
    <>
      <button
        disabled={verifyLoading}
        className={className}
        onClick={handleClick}
      >
        {verifyLoading ? <Spin size="small" /> : "Verify"}
      </button>
      <Modal
        open={open}
        footer={null}
        title={null}
        centered
        closable={pc ? true : false}
      >
        <div className="text-black -mx-6">
          <h1 className="text-base font-medium border-b px-5 pb-3 border-[#ececec]">
            {modalConf.title}
          </h1>
          <div className="border-[#ececec] border-b">
            <div className="px-5 pt-5 pb-4">
              <div
                className={clsx(
                  "text-base font-medium",
                  userLogined && "text-[#A1A1A2]"
                )}
              >
                <h2>{modalConf.step1.title}</h2>
              </div>
              <p
                className={clsx(
                  "text-[#717374] text-xs mb-6",
                  userLogined && "text-[#A1A1A2]"
                )}
              >
                {modalConf.step1.desc[credentialType]}
              </p>

              <button className="px-4 py-1 text-sm text-white bg-[#006EE9] rounded-md">
                Connect {credentialType}
              </button>
            </div>
          </div>
          <div>
            <div className="px-5 pt-5 pb-4">
              <div className={clsx("text-base font-medium")}>
                <h2>{modalConf.step2.name}</h2>
                <h2>{modalConf.step2.title}</h2>
              </div>
              <p className={clsx("text-[#717374] text-xs mb-6")}>
                {modalConf.step2.desc}
              </p>
              {userLogined && (
                <button className="px-4 py-1 text-sm text-white bg-[#006EE9] rounded-md">
                  {modalConf.step2.button}
                </button>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
