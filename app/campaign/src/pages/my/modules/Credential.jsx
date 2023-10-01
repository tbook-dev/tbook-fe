import { Spin } from "antd";
import Empty from "./Empty";
import useAssetQuery from "@/hooks/useAssetQuery";
import clsx from "clsx";

export default function Credentials() {
  const { data: assets, isLoading } = useAssetQuery();
  const data = assets?.credentials || [];

  return (
    <div
      className={clsx(
        "flex flex-col gap-y-2 items-center px-2",
        isLoading && "pt-10"
      )}
    >
      {isLoading ? (
        <Spin spinning />
      ) : data.length > 0 ? (
        data.map((v, idx) => (
          <div
            className="flex items-center gap-x-1 bg-white rounded-xl py-1 px-3 w-max"
            key={idx}
          >
            <img
              src={v.picUrl}
              className="w-5 h-5 object-contain object-center"
            />
            <div
              className="max-w-[calc(100vw_-_50px)] truncate"
              key={v.credentialId}
              dangerouslySetInnerHTML={{ __html: v.displayExp }}
            />
          </div>
        ))
      ) : (
        <Empty text="There's no credential yet." />
      )}
    </div>
  );
}
