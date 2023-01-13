import React, { useState } from "react";
import LayoutV2 from "./LayoutV2";
import clsx from "clsx";
import { personalPropertyList } from "@/utils/const";

export default function PersonalProperty() {
  const [currentNav, setNav] = useState(null);

  console.log("xx", currentNav);
  return (
    <LayoutV2>
      <main className="flex-auto px-12 py-8 bg-white">
        <nav className="flex">
          {personalPropertyList.map((v) => (
            <div
              className={clsx(
                "w-[105px] mr-6 cursor-pointer text-sm	 py-1 rounded-2xl text-center font-medium border",
                v.colorCls
              )}
              key={v.value}
              onClick={() => setNav(v.value)}
            >
              {v.label}
            </div>
          ))}
        </nav>
      </main>
    </LayoutV2>
  );
}
