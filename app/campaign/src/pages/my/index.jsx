import { useParams } from "react-router-dom";
import PersonalInfo from "./PersonalInfo";
import { Spin } from "antd";
import useUserInfoQuery from "@/hooks/useUserInfoQuery";

export default function My() {
  const { campaignId } = useParams();
  const { firstLoad } = useUserInfoQuery();

  console.log({ campaignId });
  if (!firstLoad) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Spin spinning />
      </div>
    );
  }
  return (
    <div>
      <PersonalInfo />
    </div>
  );
}
