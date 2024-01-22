import { InfoCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import clsx from "clsx";
import { useResponsive } from "ahooks";
import { useState, useEffect, useRef } from "react";
import { submitAddress, verifyCredential } from "@/api/incentive";
import useUserInfo from "@/hooks/useUserInfoQuery";
import useAirdrop from "@/hooks/useAirdrop";
import warningSvg from "@/images/icon/warning.svg";
import useCampaignQuery from "@/hooks/useCampaignQuery";
import { Skeleton } from "antd";

export default function AirDrop({
  description,
  isVerified,
  credentialId,
  campaignId,
  successHandle
}) {
  const { refetch } = useCampaignQuery(campaignId);
  const [count, setCount] = useState(0);
  const { pc } = useResponsive();
  const [value, setValue] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { user } = useUserInfo();
  const clearInterIdRef = useRef();
  const [errTip, setErrTip] = useState("");

  const { data: userAirdopData, isLoading: airDropLoading } = useAirdrop({
    userId: user?.userId,
    credentialId,
    enabled: Boolean(!!user?.userId && isVerified),
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
      if (!res.success) {
        setErrTip(res?.message);
        setCount(30);
      } else {
        const v = await verifyCredential(credentialId);
        const c = await refetch();
        successHandle()
        console.log({ v, c });
      }
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

  return (
    <div className="pt-5 space-y-6 border-t border-[#904BF6]">
      {showWarning && (
        <div className="text-sm flex gap-x-3 items-start">
          <img
            src={warningSvg}
            className="w-5 h-5 object-center"
            alt="verify error"
          />
          {errTip || "It seems you have not finished the task. "} Please click
          and finish the task, then verify in {count}s later.
        </div>
      )}
      {description && <div className="text-sm">{description}</div>}
      <div className="flex text-sm items-center justify-between gap-x-6">
        {airDropLoading ? (
          <Skeleton paragraph={{ rows: 1 }} title={false} />
        ) : (
          <input
            value={isVerified ? userAirdopData?.entity?.address : value}
            onChange={
              isVerified
                ? null
                : (e) => {
                    setValue(e.target.value);
                  }
            }
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
        )}
        {pc && !isVerified && (
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
      {!pc && !isVerified && (
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
