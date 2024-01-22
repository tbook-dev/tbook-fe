import { InfoCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import clsx from "clsx";
import { useResponsive } from "ahooks";
import { useState, useEffect, useRef } from "react";
import { submitAddress } from "@/api/incentive";
import useUserInfo from "@/hooks/useUserInfoQuery";
import useAirdrop from "@/hooks/useAirdrop";
import warningSvg from "@/images/icon/warning.svg";

export default function AirDrop({
  description,
  isVerified,
  credentialId,
  ...credential
}) {
  const [count, setCount] = useState(0);
  const { pc } = useResponsive();
  const [value, setValue] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { user } = useUserInfo();
  const clearInterIdRef = useRef();

  console.log({ credential, user, count });
  const { data: userAirdopData } = useAirdrop({
    userId: user?.userId,
    credentialId,
    enabled: !!user?.userId,
    // enabled: !!user?.userId && isVerified,
  });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await submitAddress({
        credentialId,
        address: value,
        userId: user?.userId,
      });
      if (!res.sucess) {
        setCount(30);
      }
      console.log("handleSubmit", res);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };
  const showWarning = count > 0;
  useEffect(() => {
    clearInterIdRef.current = setInterval(() => {
      if (count > 0) {
        setCount((v) => v - 1);
      } else {
        clearInterval(clearInterIdRef.current);
      }
    }, 1000);
    return () => {
      clearInterval(clearInterIdRef.current);
    };
  }, [count]);
  console.log({
    userAirdopData,
    description,
    isVerified,
    showWarning,
    disabled: !value || isLoading || showWarning,
  });

  return (
    <div className="pt-5 space-y-6 border-t border-[#904BF6]">
      {showWarning && (
        <div className="text-sm flex gap-x-3 items-start">
          <img
            src={warningSvg}
            className="w-5 h-5 object-center"
            alt="verify error"
          />
          It seems you have not finished the task.Please click and finish the
          task, then verify in {count}s later.
        </div>
      )}
      {description && <div className="text-sm">{description}</div>}
      <div className="flex text-sm items-center justify-between gap-x-6">
        <input
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={isVerified || showWarning}
          className={clsx(
            "h-10 px-4 py-2 flex-auto bg-black rounded-lg text-white placeholder:text-[#666]",
            "border-0 outline-0 ring-1 ring-inset ",
            showWarning
              ? "ring-[#DC2626]"
              : "ring-[rgb(255,255,255)]/[0.1]  focus:ring-white"
          )}
          placeholder="Fill in your exchange address here"
        />
        {pc && (
          <button
            onClick={handleSubmit}
            disabled={!value || isLoading || showWarning}
            className={clsx(
              "px-1.5 py-1 rounded flex-none",
              "flex items-center gap-x-1",
              "text-white bg-[#904BF6]",
              "disabled:text-white/[0.1] disabled:bg-white/[0.1]"
            )}
          >
            Submit
            {isLoading && <LoadingOutlined />}
          </button>
        )}
      </div>
      <div className="text-xs text-[#717374] flex items-start gap-x-1">
        <InfoCircleOutlined className="mt-px" />
        Please ensure the accuracy of the address, as it cannot be modified once
        submitted.
      </div>
      {!pc && (
        <button
          onClick={handleSubmit}
          disabled={!value || isLoading || showWarning}
          className={clsx(
            "w-full py-1 rounded flex-none",
            "flex items-center justify-center gap-x-1",
            "text-white bg-[#904BF6]",
            "disabled:text-white/[0.1] disabled:bg-white/[0.1]"
          )}
        >
          Submit
          {isLoading && <LoadingOutlined />}
        </button>
      )}
    </div>
  );
}
