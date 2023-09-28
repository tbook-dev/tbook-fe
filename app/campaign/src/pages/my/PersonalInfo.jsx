import useUserInfoQuery from "@/hooks/useUserInfoQuery";
import defaultAvator from "@/images/icon/defaultAvator.svg";
import { shortAddress } from "@tbook/utils/lib/conf";

export default function PersonalInfo() {
  const { data, twitterConnected, discordConnected, telegramConnected } =
    useUserInfoQuery();

  const socialList = [{}];
  return (
    <div className="pt-4 flex flex-col items-center gap-y-4">
      <img
        src={data?.user?.avatar ?? defaultAvator}
        alt="user avatar"
        className="w-20 h-20 rounded-full"
      />
      <p className="text-[#131517] text-base font-medium">
        {shortAddress(data?.user?.wallet)}
      </p>
      <div></div>
    </div>
  );
}
