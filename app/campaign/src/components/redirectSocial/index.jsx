import Lottie from "lottie-react";
import redirectJSON from "@/images/social/redirect.json";
import sucessPNG from "@/images/social/sucess.png";
import failedPNG from "@/images/social/failed.png";
import occupiedPNG from "@/images/social/occupied.png";

const Result = ({ title, desc }) => {
  return (
    <div className="px-7 pt-1 text-center">
      <h2 className="text-[#131517] text-base font-medium mb-3">{title}</h2>
      <p className="text-sm text-[#717374]">{desc}</p>
    </div>
  );
};

// loading, sucess, failed, occupied
export default function RedirectSocial({ status = "loading", desc = "" }) {
  return (
    <div>
      {status === "loading" && (
        <div>
          <Lottie animationData={redirectJSON} loop={true} />
          <Result
            title="Loading..."
            desc="We are currently verifying the account connection results. Your patience is greatly appreciated."
          />
        </div>
      )}

      {status === "sucess" && (
        <div>
          <img src={sucessPNG} className="w-full" />
          <Result title="Account authorized successfully!" />
        </div>
      )}
      {status === "failed" && (
        <div>
          <img src={failedPNG} className="w-full" />
          <Result
            title="Account authorization failed"
            desc={
              desc ||
              "We regret that the account authorization has failed. Please try again later."
            }
          />
        </div>
      )}
      {status === "occupied" && (
        <div>
          <img src={occupiedPNG} className="w-full" />
          <Result title="Account occupied" desc={desc || "Account occupied!"} />
        </div>
      )}
    </div>
  );
}
