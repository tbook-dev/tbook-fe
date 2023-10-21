import { useState } from "react";
import { Spin, Modal } from "antd";
import { useResponsive } from "ahooks";
import clsx from "clsx";
import useSocial from "@/hooks/useSocial";
import { useCallback } from "react";
import VerifyStatus, { verifyStatusEnum } from "./VerifyStatus";
import { delay } from "@/utils/common";

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
  },
};

export default function WithVerify({
  handleFn,
  sysConnectedMap,
  credentialType,
}) {
  const [open, setOpen] = useState(false);
  const { pc } = useResponsive();
  const { getSocialByName } = useSocial();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(verifyStatusEnum.NotStarted);

  const userLogined = sysConnectedMap[credentialType];
  const social = getSocialByName(credentialType);
  const isSocial = !!social;
  const handleVerify = async (evt) => {
    setStatus(verifyStatusEnum.Pending);
    try {
      await handleFn(evt);
      setStatus(verifyStatusEnum.Sucess);
    } catch (e) {
      setStatus(verifyStatusEnum.NotStarted);
    }
    await delay(1000);
    handleCancel();
  };
  const handleCancel = useCallback(() => {
    setOpen(false);
  }, []);
  // console.log({social})

  return (
    <>
      <button
        disabled={status === verifyStatusEnum.Pending}
        className={clsx(
          "text-base whitespace-nowrap px-1.5 py-1 rounded-md",
          "flex items-center gap-x-1",
          {
            "bg-transparent text-[#65C467]": status === verifyStatusEnum.Sucess,
            "bg-[rgba(0,110,233,0.04)] text-[#006EE9]":
              status === verifyStatusEnum.NotStarted,
            "bg-transparent text-[#006EE9]":
              status === verifyStatusEnum.Pending,
          }
        )}
        onClick={(evt) => {
          if (isSocial) {
            setOpen(true);
          } else {
            handleVerify(evt);
          }
        }}
      >
        <VerifyStatus status={status} />
        {status === verifyStatusEnum.Sucess && "Verified"}
        {status === verifyStatusEnum.Pending && "Verify..."}
        {status === verifyStatusEnum.NotStarted && "Verify"}
      </button>

      {isSocial && (
        <Modal
          open={open}
          footer={null}
          title={null}
          centered
          closable={pc ? true : false}
          onCancel={handleCancel}
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

                {social.connected ? (
                  <div className="w-max px-4 py-2 bg-[#F8F9FA] rounded-md flex items-center gap-x-2 text-sm text-[#A1A1A2] font-medium">
                    <img
                      src={social.activePic}
                      className="w-4 h-4 object-contain object-center"
                      alt="social logo"
                    />
                    @{social.userName}
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setLoading(true);
                      social.loginFn().finally(() => setLoading(false));
                    }}
                    className="px-4 py-1 text-sm text-white rounded-md"
                    style={{ backgroundColor: social.activeColor }}
                  >
                    Connect {credentialType}
                    {loading && (
                      <Spin spinning size="small" style={{ marginLeft: 4 }} />
                    )}
                  </button>
                )}
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
                {social.connected && (
                  <button
                    className={clsx(
                      "text-base whitespace-nowrap px-1.5 py-1 rounded-md",
                      "flex items-center gap-x-1",
                      {
                        "bg-transparent text-[#65C467]":
                          status === verifyStatusEnum.Sucess,
                        "bg-[rgba(0,110,233,0.04)] text-[#006EE9]":
                          status === verifyStatusEnum.NotStarted,
                        "bg-transparent text-[#006EE9]":
                          status === verifyStatusEnum.Pending,
                      }
                    )}
                    onClick={handleVerify}
                    disabled={status === verifyStatusEnum.Pending}
                  >
                    <VerifyStatus status={status} />
                    {status === verifyStatusEnum.Sucess && "Verified"}
                    {status === verifyStatusEnum.Pending && "Verify..."}
                    {status === verifyStatusEnum.NotStarted && "Verify"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
