import { useState } from "react";
import Credentials from "./modules/Credential";
import NFT from "./modules/NFT";
import Point from "./modules/Point";
import clsx from "clsx";
import NotConnect from "./modules/NotConnect";
import useUserInfoQuery from "@/hooks/useUserInfoQuery";

const tabModule = [
  {
    name: "credentials",
    com: <Credentials />,
  },
  {
    name: "nfts",
    com: <NFT />,
  },
  {
    name: "points",
    com: <Point />,
  },
];
export default function Asset() {
  const { userLogined } = useUserInfoQuery();
  const [select, setSelect] = useState(tabModule[0].name);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center gap-x-6 text-sm font-medium text-[#717374]">
        {tabModule.map((m) => {
          return (
            <button
              key={m.name}
              disabled={!userLogined}
              className={clsx(
                m.name === select && "text-black font-bold border-b-[2px]",
                "hover:opacity-80 pb-2 border-black min-w-[70px]"
              )}
              onClick={() => {
                setSelect(m.name);
              }}
            >
              {m.name}
            </button>
          );
        })}
      </div>

      {userLogined ? (
        <div>{tabModule.find((v) => v.name === select).com}</div>
      ) : (
        <NotConnect />
      )}
    </div>
  );
}
