import { useState } from "react";
import { Spin } from "antd";


export default function WithVerify({ handleFn, className }) {
  const [verifyLoading, setVefiryLoading] = useState(false);
  const handleClick = async (evt) => {
    setVefiryLoading(true);
    try {
      await handleFn(evt);
      setVefiryLoading(false);
    } catch (e) {
      console.log(e);
      setVefiryLoading(false);
    }
  };
  return (
    <button className={className} onClick={handleClick}>
      {verifyLoading ? <Spin size="small"/> : "Verify"}
    </button>
  );
}
