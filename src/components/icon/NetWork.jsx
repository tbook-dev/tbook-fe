import eth from "@/images/icon/eth-rainbow.svg";
import bsc from "@/images/icon/bsc-rainbow.svg";
import sui from "@/images/icon/sui-rainbow.svg";

export default function NetWork({ type = "", ...props }) {
  const url = eth;
  if (type === "bsc") {
    url = bsc;
  }
  if (type === "sui") {
    url = sui;
  }

  return <img src={url} {...props} />;
}
