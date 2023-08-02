export const incentiveAssetsTypeList = [
  { label: "🎁 NFT", value: 1 },
  { label: "💎 POINTS", value: 2 },
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
  {
    title: "Anyone who get the credentials",
    desc: "Anyone who gets the credentials can claim the reward.",
    value: 1,
  },
  {
    title: "FCFS",
    desc: "First come, first served. Whoever gets the credentials first can claim the reward first.",
    value: 2,
  },
  {
    title: "Lucky Draw",
    desc: "A random selection of participants from those who meet the requirements.",
    value: 3,
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
