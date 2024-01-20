import { EllipsisOutlined, LoadingOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import { useState } from "react";

const menus = [
  {
    key: "delete",
    label: <button className="mx-4">Delete</button>,
  },
];
export default function AdminItem({ name, item, handleMenuClick, isOwner }) {
  const [loading, setLoading] = useState(false);

  return (
    <div
      className="px-5 py-4 flex items-center justify-between"
      key={item.userId}
    >
      <div className="flex items-center gap-x-6">
        <span className="w-[200px] flex-none font-zen-dot">{name}</span>
        <span className="w-[400px] flex-none">{item.wallet}</span>
      </div>
      {loading ? (
        <LoadingOutlined />
      ) : item.isOwner ? (
        <div className="flex item-center gap-x-6">
          Ower
          <EllipsisOutlined className={"text-[#fff]/[0.1]"} />
        </div>
      ) : isOwner ? (
        <Dropdown
          placement="bottomRight"
          menu={{
            items: menus,
            onClick: async (memuItem) => {
              setLoading(true);
              try {
                await handleMenuClick(memuItem, item);
                setLoading(false);
              } catch (e) {
                console.log(e);
                setLoading(false);
              }
            },
          }}
        >
          <EllipsisOutlined className={"cursor-pointer hover:text-white"} />
        </Dropdown>
      ) : (
        <EllipsisOutlined className={"text-[#fff]/[0.1]"} />
      )}
    </div>
  );
}
