import { InfoCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import clsx from "clsx";
import { useResponsive } from "ahooks";
import { useState } from "react";
import { submitAddress } from "@/api/incentive";
import useUserInfo from "@/hooks/useUserInfoQuery";

export default function AirDrop({ desc, credentialId, errorHandle }) {
  const { pc } = useResponsive();
  const [value, setValue] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { user } = useUserInfo();
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await submitAddress({
        credentialId,
        address: value,
        userId: user?.userId,
      });
      console.log("handleSubmit", res);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };
  return (
    <div className="pt-5 space-y-6 border-t border-[#904BF6]">
      <div className="text-sm">
        Earn exclusive airdrops effortlessly by filling in your crypto exchange
        address.
      </div>
      <div className="flex text-sm items-center justify-between gap-x-6">
        <input
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          className={clsx(
            "h-10 px-4 py-2 flex-auto bg-black rounded-lg text-white placeholder:text-[#666]",
            "border-0 outline-0 ring-1 ring-inset ring-[rgb(255,255,255)]/[0.1]",
            "focus:ring-white"
          )}
          placeholder="Fill in your exchange address here"
        />
        {pc && (
          <button
            onClick={handleSubmit}
            disabled={!value || isLoading}
            className={clsx(
              "px-1.5 py-1 rounded flex-none",
              "flex items-center gap-x-1",
              value
                ? "text-white bg-[#904BF6]"
                : "text-white/[0.1] bg-white/[0.1]"
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
          disabled={!value || isLoading}
          className={clsx(
            "w-full py-1 rounded flex-none",
            "flex items-center justify-center gap-x-1",
            "text-white bg-[#904BF6]",
            value
              ? "text-white bg-[#904BF6]"
              : "text-white/[0.1] bg-white/[0.1]"
          )}
        >
          Submit
          {isLoading && <LoadingOutlined />}
        </button>
      )}
    </div>
  );
}
