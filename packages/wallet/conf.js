import metaMask from "./images/metamask.svg";
import walletconnect from "./images/walletconnect.svg";
import arConnect from "./images/arConnect.svg";
import bitget from "./images/bitget.svg";
import finnie from "./images/finnie.svg";

export const supportCategorys = [
  {
    category: "Ethereum",
    value: 1,
  },
  {
    category: "Arweave",
    value: 2,
  },
];
export const supportWallet = [
  {
    categoryValue: 1,
    name: "MetaMask",
    picUrl: metaMask,
    value: 1,
  },
  {
    categoryValue: 1,
    name: "WalletConnect",
    picUrl: walletconnect,
    value: 2,
  },
  {
    category: "Arweave",
    categoryValue: 2,
    name: "ArConnect",
    picUrl: arConnect,
    value: 3,
  },
  {
    category: "Arweave",
    categoryValue: 2,
    name: "ArConnect BETA",
    picUrl: arConnect,
    value: 4,
  },
  {
    categoryValue: 2,
    name: "Bitget",
    picUrl: bitget,
    value: 5,
  },
  {
    categoryValue: 2,
    name: "Finnie",
    picUrl: finnie,
    value: 6,
  },
];

export const categoriedWallet = supportCategorys.map((v) => {
  return {
    name: v.category,
    value: v.value,
    list: supportWallet.filter((w) => v.value === w.categoryValue),
  };
});
