import AuthSocial from "../social";
// import { zkLoginCallback } from "@/utils/zklogin";
import { useEnokiFlow } from "@mysten/enoki/react";
import { getUserInfo } from "@/api/incentive"

export default function () {
  const flow = useEnokiFlow();
  // useAuthCallback()
  const authCallback = async () => {
    const hash = window.location.hash.slice(1).trim();
    try {
      await flow.handleAuthCallback(hash);
      const data = await getUserInfo();
      return {
        socialName: data?.userZk?.email,
      };
    } catch (e) {
      return {
        code: 500,
        msg: e.msg || "An error hanppens, please try it later!",
      };
    }
  };
  return <AuthSocial authCallback={authCallback} type="google" />;
}
