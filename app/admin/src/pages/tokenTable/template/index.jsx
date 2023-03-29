import { useAsyncEffect } from "ahooks";
import { useState } from "react";

export default function Template() {
  const [tplList, setTpl] = useState([]);
  useAsyncEffect(async () => {
    setTpl([]);
  }, []);
  return <div>{tplList.length === 0 ? <div>1</div> : <div>x</div>}</div>;
}
