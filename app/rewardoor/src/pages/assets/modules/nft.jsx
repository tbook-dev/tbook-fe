import Loading from "@/components/loading";
import clsx from "clsx";
import useAsset from "@/hooks/queries/useAsset";
import { Link } from "react-router-dom";

import NftCard from "./NftCard";

export default function NFT() {
  const { data: info, isLoading: loading } = useAsset();
  const list = info?.nfts || [];

  return (
    <>
      {loading ? (
        <Loading h="h-40" />
      ) : (
        <div
          className={clsx(
            "grid gap-5",
            list.length === 0 ? "grid-cols-1" : "grid-cols-4"
          )}
        >
          {list.length > 0 ? (
            list.map((v) => {
              return (
                <Link
                  to={`/assets/nft/${v.nftId}/${v.groupId}`}
                  key={v.nftId + "" + v.groupId}
                >
                  <NftCard v={v} />
                </Link>
              );
            })
          ) : (
            <div className="h-[300px] text-c-9 w-full rounded-button bg-gray flex justify-center items-center">
              No Data
            </div>
          )}
        </div>
      )}
    </>
  );
}
