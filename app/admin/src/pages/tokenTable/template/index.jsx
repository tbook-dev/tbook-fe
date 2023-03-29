import { useAsyncEffect } from "ahooks";
import { useState } from "react";
import { Empty } from "@tbook/ui";

export default function Template() {
  const [tplList, setTpl] = useState([]);
  useAsyncEffect(async () => {
    setTpl([]);
  }, []);
  return (
    <div>
      <h2 className="mb-2 font-bold text-c12 lg:text-c13">Open Template</h2>

      {tplList.length === 0 ? (
        <div className="rounded-md ">
          <div className="h-[272px] rounded-xl bg-white dark:bg-b-1 flex items-center justify-center">
            <Empty description="COMING SOON" />
          </div>
        </div>
      ) : (
        <div>x</div>
      )}
    </div>
  );
}
