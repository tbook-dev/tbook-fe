import AuthSocial from "../social";
// import { zkLoginCallback } from "@/utils/zklogin";
import useUserInfoQuery from "@/hooks/useUserInfoQuery";
import { useEnokiFlow } from "@mysten/enoki/react";

export default function () {
  const flow = useEnokiFlow();
  const { refetch } = useUserInfoQuery();
  // useAuthCallback()
  const authCallback = async () => {
    const hash = window.location.hash.slice(1).trim();
    try {
      await flow.handleAuthCallback(hash);
      const res = await refetch();
      return {
        socialName: res?.data?.userZk?.email,
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
