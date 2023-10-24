import Lottie from "lottie-react";
import dataJSON from "@/images/social/verified.json";
import verifiedSvg from "@/images/social/verified.svg";
export const verifyStatusEnum = {
  NotStarted: 0,
  Pending: 1,
  Sucess: 2,
};

export default function VerifyStatus({ status }) {
  return (
    <>
      {status === verifyStatusEnum.NotStarted && (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="16" height="16" rx="4" fill="white" />
          <rect
            x="0.5"
            y="0.5"
            width="15"
            height="15"
            rx="3.5"
            stroke="#006EE9"
            strokeOpacity="0.1"
          />
        </svg>
      )}

      {status === verifyStatusEnum.Pending && (
        <Lottie
          loop
          autoplay={true}
          animationData={dataJSON}
          style={{ height: "16px", width: "16px" }}
        />
      )}

      {status === verifyStatusEnum.Sucess && (
        <img src={verifiedSvg} className="w-4 h-4" alt="sucess" />
      )}
    </>
  );
}
