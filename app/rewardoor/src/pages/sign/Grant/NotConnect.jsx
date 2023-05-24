import { Button } from "@tbook/ui";
import { useSignIn } from "@tbook/hooks";
import grante403 from "@tbook/share/images/incentive/grantee403.png";
import mgrante403 from "@tbook/share/images/incentive/mgrantee403.png";
import { useResponsive } from "ahooks";
import { useEffect } from "react";
import { user } from "@tbook/store";
import { useDispatch } from "react-redux";

const { setLessNav } = user;

export default function () {
  const { loading, handleSignIn } = useSignIn();
  const { pc } = useResponsive();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLessNav(true));
    return () => {
      dispatch(setLessNav(false));
    };
  }, []);

  return (
    <div
      className="absolute inset-0 lg:flex lg:items-center lg:bg-center lg:bg-cover"
      style={pc ? { backgroundImage: `url(${grante403})` } : null}
    >
      <img src={mgrante403} className="block lg:hidden" />
      <div className="w-[80vw] text-center lg:text-left mx-auto lg:w-[578px] lg:ml-[120px]">
        <h2 className="inline-block mb-5 font-extrabold dark:text-white text-ch1 lg:text-cwh4 lg:mb-6">
          <span className="mr-4 text-colorful1">Connect</span>the wallet to check your grants.
        </h2>
        <Button
          className="lg:text-white lg:bg-black dark:lg:bg-white lg:bg-none w-[80vw] lg:w-auto"
          loading={loading}
          loadingColor={pc ? "#69D0E5" : "white"}
          onClick={handleSignIn}
        >
          Connect Wallet
        </Button>
      </div>
    </div>
  );
}
