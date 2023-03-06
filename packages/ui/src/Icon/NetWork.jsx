import eth from "@tbook/share/images/icon/eth-rainbow.svg";
import bsc from "@tbook/share/images/icon/bsc-rainbow.svg";
// import sui from "@tbook/share/images/icon/sui-rainbow.svg";

export default function NetWork({ id , ...props }) {
  let url = null
  if (id === 1) {
    url = eth;
  }
  if (id === 56) {
    url = bsc;
  }

  return url ?  <img src={url} {...props} /> : null;
}
