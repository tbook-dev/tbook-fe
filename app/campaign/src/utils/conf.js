import pointIcon from "@/images/icon/point.svg";
import nftIcon from "@/images/icon/nft.svg";
import fcfsIcon from "@/images/icon/fcfs.svg";
import ldIcon from "@/images/icon/ld.svg";

export const incentiveAssetsTypeList = [
  { icon: nftIcon, text: "NFT", value: 1 },
  { icon: pointIcon, text: "POINTS", value: 2 },
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

export const incentiveMethodList = [
  // {
  //   title: "Anyone who get the credentials",
  //   desc: "Anyone who gets the credentials can claim the reward.",
  //   value: 1,
  // },
  {
    title: "FCFS",
    desc: `FCFS is one of the reward distribution methods which stands for "First come, first served". It means that whoever gets the credentials first can claim the reward first.`,
    pop: `It's a "first come, first served" opportunity which means who participate and accomplish tasks early are prioritized for rewards. As soon as the predetermined reward pool is depleted, subsequent participants accomplishing the tasks miss out on receiving rewards.`,
    value: 1,
    icon: fcfsIcon,
  },
  {
    title: "Lucky Draw",
    desc: `Lucky draw is one of the reward distribution methods which means that a random selection of participants from those who meet the requirements.`,
    pop: `It’s a 'lucky draw' opportunity which means participants who meet the requirements have a chance to be randomly selected for rewards.`,
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

const labelTypeMap = {
  twitter: [
    {
      label: "Twitter Like",
      value: 1,
    },
    {
      label: "ReTweet Link",
      value: 2,
    },
    {
      label: "Twitter Spaces",
      value: 3,
    },
    {
      label: "Twitter Follows",
      value: 11,
    },
  ],
  discord: [
    {
      label: "Join Discord Service",
      value: 4,
    },
    {
      label: "Verify Discord role",
      value: 5,
    },
  ],
  telegram: [
    {
      label: "Join Telegram Group",
      value: 6,
    },
    {
      label: "Join Telegram Channel",
      value: 7,
    },
  ],
  tbook: [
    {
      label: "Visit a Page or Site",
      value: 8,
    },
    {
      label: "Sign Message",
      value: 10,
    },
    {
      label: "snapshot",
      value: 12,
    },
  ],
};

export const getCrenditialType = (labelType) => {
  // map to groups
  const arraryType = [];
  for (let k in labelTypeMap) {
    const sublist = labelTypeMap[k].map((v) => ({ ...v, group: k }));
    arraryType.push(...sublist);
  }
  return arraryType.find((v) => v.value === labelType)?.group;
};

// 结束点为活动结束时间
export const credentialStatus = [
  {
    label: "Ineligible",
    name: "Ineligible",
    value: 0,
    bgColor: "#fff",
    color: "#000",
    desc: "You will know if you are selected when the campaign closes.",
    showTimeClock: true,
    comment: "任务未完成认证",
    showBtn: false,
    showTips: true, // 展示luck draw
  },
  {
    label: "Eligible",
    name: "Eligible",
    value: 1,
    bgColor: "#fff",
    color: "#000",
    desc: "You will know if you could claim this reward after the campaign is closed.",
    showTimeClock: true,
    comment: "已完成等待抽奖",
    showBtn: false,
    showTips: true,
  },
  {
    label: "Claim",
    name: "Claim不可点击",
    value: 2, //目前没有白名单了，这个保留但是逻辑上不会显示
    bgColor: "#fff",
    color: "#000",
    desc: "You could claim your reward after whitelist updated.",
    showTimeClock: false,
    comment: "waiting",
    showBtn: true,
    showTips: false,
  },
  {
    label: "Claim",
    name: "Claim可点击",
    value: 3,
    bgColor: "#fff",
    color: "#000",
    desc: "",
    showTimeClock: false,
    comment: "claimable",
    loadingBtn: "Claiming...",
    loadingText: "We are checking your claiming status.",
    showBtn: true,
    showTips: false,
  },
  {
    label: "You have claimed this reward 🎉",
    name: "Claimed",
    value: 4,
    bgColor: "transparent",
    color: "#65C467",
    desc: "🎉🎉🎉 Successfully claimed",
    showTimeClock: false,
    comment: "Claimed",
    showBtn: false,
    showTips: false,
  },
  {
    label: "Missed",
    name: "Missed",
    value: 5,
    bgColor: "#fff",
    color: "#000",
    desc: "You missed the reward according to the distribution method.",
    showTimeClock: false,
    comment: "missed未获取",
    showBtn: false,
    showTips: false,
    // nft置灰
  },
];

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
