import googleSVG from "./images/zkLogin/google.svg";
import facebookSVG from "./images/zkLogin/facebook.svg";
import talkSVG from "./images/zkLogin/talk.svg";
import { getGoogleLoginUrl } from "./utils/zklogin";
import { useCallback } from "react";

export default function useZklogin() {
  const zkList = [
    {
      name: "google",
      picUrl: googleSVG,
      async loginFn() {
        location.href = await getGoogleLoginUrl();
      },
    },
    {
      name: "facebook",
      picUrl: facebookSVG,
      async loginFn() {},
    },
    {
      name: "talk",
      picUrl: talkSVG,
      async loginFn() {},
    },
  ];

  const getZkfnByName = useCallback(
    async (name) => {
      return await zkList.find((v) => v.name === name).loginFn();
    },
    [zkList]
  );

  return {
    zkList,
    getZkfnByName,
  };
}
