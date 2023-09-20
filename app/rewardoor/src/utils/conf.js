import opIcon from "@/images/icon/crypto/op.svg";
import pointIcon from "@/images/icon/point.svg";
import nftIcon from "@/images/icon/nft.svg";
import fcfsIcon from "@/images/icon/fcfs.svg";
import ldIcon from "@/images/icon/ld.svg";

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
    desc: `FCFS is one of the reward distribution methods which stands for "First come, first served". It means that whoever gets the credentials first can claim the reward first.`,
    value: 1,
    icon: fcfsIcon,
  },
  {
    title: "Lucky Draw",
    desc: `Lucky draw is one of the reward distribution methods which means that a random selection of participants from those who meet the requirements.`,
    value: 2,
    icon: ldIcon,
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
  {
    icon: opIcon,
    label: "Optimism Testnet",
    value: 420,
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
export const rewardMap = {
  done: {
    btn: "done",
    color: "#65C467",
    text: "The winners list has been generated. Please update the whitelist so that the winners could claim  their nfts.",
  },
  ongoing: {
    btn: "In progress",
    color: "#3A82F7",
    text: "The campaign is fully swing. Please wait for the winners list to be generated.",
  },
};
export const credentialStatus = [
  {
    label: "Ineligible",
    name: "Ineligible",
    value: 0,
    bgColor: "#f7f7f7",
    color: "#999",
    desc: "Some tasks remain uncomplished or unverified.",
    disabled: true,
  },
  {
    label: "Eligible",
    name: "Eligible",
    value: 1,
    bgColor: "#f7f7f7",
    color: "#999",
    desc: "You will know if you could claim this reward after the campaign is closed.",
    disabled: true,
  },
  {
    label: "Claim",
    name: "Claim不可点击",
    value: 2,
    bgColor: "#f7f7f7",
    color: "#999",
    desc: "You will know if you could claim this reward after the campaign is closed.",
    disabled: true,
  },
  {
    label: "Claim",
    name: "Claim可点击",
    value: 3,
    bgColor: "#f0f5ff",
    color: "#3a82f7",
    disabled: false,
  },
  {
    label: "Claimed",
    name: "Claimed",
    value: 4,
    bgColor: "#f7f7f7",
    color: "#999",
    disabled: true,
  },
  {
    label: "Missed",
    name: "Missed",
    value: 5,
    bgColor: "#f7f7f7",
    color: "#999",
    disabled: true,
  },
];

export const factoryContract = import.meta.env.VITE_FACTORY_CONTRACT;
