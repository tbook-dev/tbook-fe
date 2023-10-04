import { useState } from "react";
import { Spin, Modal } from "antd";
import { useResponsive } from "ahooks";
import clsx from "clsx";
import useSocial from "@/hooks/useSocial";
import { useCallback } from "react";
import occupIcon from '@/images/icon/occup.svg'

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
  const [open, setOpen] = useState(false);
  const [verifyLoading, setVefiryLoading] = useState(false);
  const { pc } = useResponsive();
  const { getSocialByName } = useSocial();

  const userLogined = sysConnectedMap[credentialType];
  const social = getSocialByName(credentialType);
  const isSocial = !!social;
  const handleVerify = async (evt) => {
    setVefiryLoading(true);
    try {
      await handleFn(evt);
      setVefiryLoading(false);
    } catch (e) {
      console.log(e);
      setVefiryLoading(false);
    }
    handleCancel();
  };
  const handleCancel = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <button
        disabled={verifyLoading}
        className={className}
        onClick={(evt) => {
          if (isSocial) {
            setOpen(true);
          } else {
            handleVerify(evt);
          }
        }}
      >
        {verifyLoading ? <Spin size="small" /> : "Verify"}
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
            {social.occupied ? (
              <div className="px-5 flex flex-col items-start gap-y-3">
                <img src={occupIcon} alt="occup" className="h-10"/>
                <h1 className="text-base font-medium">Account occupied</h1>
                <p className="text-[#717374] font-medium text-sm">{social.occupiedText}</p>
              </div>
            ) : (
              <>
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
                        onClick={social.handle}
                        className="px-4 py-1 text-sm text-white rounded-md"
                        style={{ backgroundColor: social.activeColor }}
                      >
                        Connect {credentialType}
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
                        className="px-4 py-1 text-sm text-white bg-[#006EE9] rounded-md"
                        onClick={handleVerify}
                        disabled={verifyLoading}
                      >
                        {verifyLoading ? (
                          <Spin size="small" />
                        ) : (
                          modalConf.step2.button
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </Modal>
      )}
    </>
  );
}
