import Lottie from "lottie-react";
import redirectJSON from "@/images/social/loading.json";
// import tbook from '@/images/social/tbook.svg'
import failedSvg from "@/images/social/logo-error.svg";
import sucessSvg from "@/images/social/logo-ok.svg";
import useSocial from "@/hooks/useSocial";
import { useSelector } from "react-redux";
import { Modal } from "antd";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setShowSocialRedirectModal } from "@/store/global";
import { useResponsive } from "ahooks";

// import sucessSvg from '@/images/social/sucess.svg'
// import failedSvg from '@/images/social/fail.svg'
// import occupiedSvg from '@/images/social/occupied.svg'

const Result = ({ title, desc }) => {
  return (
    <div className="px-7 pt-4 text-center">
      {title && (
        <h2 className="text-white text-lg font-medium mb-2">{title}</h2>
      )}
      <p className="text-xs text-[#A1A1A2]">{desc}</p>
    </div>
  );
};

// loading, sucess, failed, occupied
export default function Social() {
  const { pc } = useResponsive();
  const { type, status, desc } = useSelector(
    (s) => s.global.socialRedirectModalData
  );
  //   const navigate = useNavigate();
  const dispath = useDispatch();
  const showSocialRedirectModal = useSelector(
    (s) => s.global.showSocialRedirectModal
  );

  const { getfnByName } = useSocial();
  const { failText, loginFn } = getfnByName(type);
  const handleCloseModal = useCallback(() => {
    dispath(setShowSocialRedirectModal(false));
  }, []);

  return (
    <Modal
      title={null}
      footer={null}
      closable={pc}
      open={showSocialRedirectModal}
      onCancel={handleCloseModal}
    >
      <div className="">
        {status === "loading" && (
          <div className="flex flex-col items-center">
            <div className="w-14 lg:w-20 h-14 lg:h-20  mb-4 lg:mb-8">
              <Lottie animationData={redirectJSON} loop={true} />
            </div>
            <Result desc="We are verifying the account connection results..." />
          </div>
        )}

        {status === "sucess" && (
          <div className="flex flex-col items-center">
            <img src={sucessSvg} className="w-14 lg:w-20 h-14 lg:h-20" />
            <Result title="Account authorized successfully!" desc={desc} />
          </div>
        )}
        {status === "failed" && (
          <div className="flex flex-col items-center">
            <img src={failedSvg} className="w-14 lg:w-20 h-14 lg:h-20" />
            <Result
              title="Failed to authorize"
              desc={failText || "Please try again later."}
            />
            <div className="w-[312px] mx-auto text-white mt-8 space-y-3">
              <button
                className="bg-[#904BF6] h-[42px] w-full shadow-s4 rounded hover:opacity-70"
                onClick={() => {
                  loginFn(true);
                }}
              >
                Try again
              </button>
            </div>
          </div>
        )}
        {status === "occupied" && (
          <div className="flex flex-col items-center">
            <img src={failedSvg} className="w-14 lg:w-20 h-14 lg:h-20" />
            <Result
              title="Failed to authorize"
              desc={desc || "Account occupied!"}
            />
          </div>
        )}
      </div>
    </Modal>
  );
}
