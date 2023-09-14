import opIcon from "@/images/icon/crypto/op.svg";
import pointIcon from "@/images/icon/point.svg";
import nftIcon from "@/images/icon/nft.svg";

export const incentiveAssetsTypeList = [
  { label: "🎁  NFT", icon: nftIcon, text: "NFT", value: 1 },
  { label: "💎 POINTS", icon: pointIcon, text: "POINTS", value: 2 },
];

export const rewardDistributionMethod = [
  {
    label: "Airdrop",
    value: 1,
  },
  {
    label: "Claim",
    value: 2,
  },
];
export const projectUrlPrefix = "https://app.tbook.com" + "/";
export const incentiveMethodList = [
  {
    title: "FCFS",
    desc: "First come, first served. Whoever gets the credentials first can claim the reward first.",
    value: 1,
  },
  {
    title: "Lucky Draw",
    desc: "A random selection of participants from those who meet the requirements.",
    value: 2,
  },
];

export const campaignStatusList = [
  {
    label: "Draft",
    cname: "草稿",
    value: 0,
  },
  {
    label: "Scheduled",
  },
];

export const twParttern = /https?:\/\/twitter\.com\/([a-zA-Z0-9_]+)/;

export const getTwitterId = (url) => {
  const match = url.match(twParttern);
  if (match) {
    return match[1];
  }
  return "";
};

export const supportChains = [
  {
    icon: opIcon,
    label: "Optimism",
    value: 10,
  },
];

export const mediaTypes = [
  {
    label: "Use a Template",
    value: 1,
  },
  {
    label: "Upload",
    value: 2,
  },
];

//我现在是用groupType这个来区分下面的tag的，var groupType: Int, // 0 - default，1 - Governance，2 - community, 3 - Trade , 4 - ProductTest, 5 -My
export const groupTypeMap = {
  // 0: "default",
  1: "Governance",
  2: "community",
  3: "Trade",
  4: "ProductTest",
  5: "My",
};

export const campaignStatus = [
  {
    label: "Ongoing",
    value: 1,
    color: "#65C467",
  },
  {
    label: "Scheduled",
    value: 2,
    color: "#3A82F7",
  },
  // {
  //   label: "Draft",
  //   value: 0,
  //   color: '#999999'
  // },
  {
    label: "Completed",
    value: 3,
    color: "#666",
  },
  // {
  //   label: "Suspended",
  //   value: 4,
  // },
  // {
  //   label: "Terminated",
  //   value: 5,
  // },
];

const urlMap = {
  staging: "https://campaign-staging.tbook.com",
  online: "https://i.tbook.com",
};

export const getUrl = () => {
  const isStaging = location.host.includes("staging");
  return isStaging ? urlMap.staging : urlMap.online;
};
