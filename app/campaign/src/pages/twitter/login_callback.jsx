import { authTwitterLoginCallback } from "@/api/incentive";
import AuthSocial from "../social";

export default function () {
  return <AuthSocial authCallback={authTwitterLoginCallback} />;
}
