import AuthSocial from "../social";
import { zkLoginCallback } from "@/utils/zklogin";

export default function () {
  return <AuthSocial authCallback={zkLoginCallback} type="google" />;
}
