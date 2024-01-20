import clsx from "clsx";
import useAdmins from "@/hooks/queries/useAdmins";
import useUserInfo from "@/hooks/queries/useUserInfo";
import { notification, Skeleton, Input, Popover, Dropdown } from "antd";
import { InfoCircleOutlined, EllipsisOutlined } from "@ant-design/icons";
import Button from "@/components/button";
import { useState } from "react";
import { addAdmin } from "@/api/incentive";

const moduleConf = {
  name: "Administrators",
  roles: [
    {
      title: "Owner",
      desc: "Able to modify the project setting, manage incentive campaigns, manage incentive assets and create campaigns, manage administrators.",
    },
    {
      title: "Admin",
      desc: "Able to modify the project setting, manage incentive campaigns, manage incentive assets and create campaigns.",
    },
  ],
  actionName: "Add Admin",
  actionNameTip: "Paste an address to add an admin",
};

export default function Admins() {
  const [api, contextHolder] = notification.useNotification();

  const { projectId } = useUserInfo();
  const [addAdminLoading, setAddAdminLoading] = useState(false);
  const [newAdmin, setNewAdmin] = useState();
  const { data, refetch } = useAdmins();
  const menus = [
    {
      key: "delete",
      label: <button className="mx-4">Delete</button>,
    },
  ];
  console.log({ data });

  const handleAddAdmin = async () => {
    setAddAdminLoading(true);
    try {
      await addAdmin(projectId, newAdmin?.toLowerCase());
      api.success("add admin sucess!");
    } catch (e) {
      api.error("add admin error!");
      setAddAdminLoading(false);
      return;
    }
    console.log("handleAddAdmin->newAdmin", newAdmin);
    await refetch();
    setAddAdminLoading(false);
  };

  const handleMenuClick = (item) => {
    console.log("handleMenuClick", item);
  };

  return (
    <div className="bg-[#121212] w-full rounded-xl">
      <div
        className={clsx(
          "py-4 px-5 text-[18px] font-medium",
          "border-b border-b-1"
        )}
      >
        <div className="flex items-center gap-x-1 text-[#F0F0F0]">
          {moduleConf.name}
          <Popover
            content={
              <div className="w-[485px] space-y-4">
                {moduleConf.roles.map((role) => {
                  return (
                    <div className="text-sm space-y-0.5" key={role.title}>
                      <h2 className="font-medium text-white">{role.title}</h2>
                      <p className="text-[#A1A1A2]">{role.desc}</p>
                    </div>
                  );
                })}
              </div>
            }
            className="cursor-pointer"
          >
            <InfoCircleOutlined className="text-[#A1A1A2] hover:text-white" />
          </Popover>
        </div>
      </div>
      <div>
        <div className="text-base text-[#A1A1A2]">
          {!data ? (
            <div className="px-5 py-4">
              <Skeleton />
            </div>
          ) : (
            <div className="space-y-4">
              {data.map((v, idx) => {
                return (
                  <div
                    className="px-5 py-4 flex items-center justify-between"
                    key={v.userId}
                  >
                    <div className="flex items-center gap-x-6">
                      <span className="w-[200px] flex-none">
                        Admin{idx + 1}
                      </span>
                      <span className="w-[400px] flex-none">{v.wallet}</span>
                    </div>
                    {v.isOwner ? (
                      <div className="flex item-center gap-x-6">
                        Ower
                        <EllipsisOutlined className={"text-[#fff]/[0.1]"} />
                      </div>
                    ) : (
                      <Dropdown
                        placement="bottomRight"
                        menu={{
                          items: menus,
                          onClick: () =>
                            handleMenuClick({
                              address: "address",
                              userId: "userId",
                            }),
                        }}
                      >
                        <EllipsisOutlined
                          className={"cursor-pointer hover:text-white"}
                        />
                      </Dropdown>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="text-[#A1A1A2] px-5 py-4 text-base border-t border-b-1 flex items-center justify-between">
          <div className="flex items-center gap-x-1 flex-none">
            {moduleConf.actionName}
            <Popover
              content={moduleConf.actionNameTip}
              className="cursor-pointer"
            >
              <InfoCircleOutlined className="text-[#A1A1A2] hover:text-white" />
            </Popover>
          </div>
          <Input
            className="w-[380px]"
            placeholder={moduleConf.actionNameTip}
            onChange={(e) => setNewAdmin(e.target.value)}
          />
          <Button
            disabled={!newAdmin || addAdminLoading}
            type="primary"
            onClick={handleAddAdmin}
            loading={addAdminLoading}
            className="flex-none"
          >
            Save
          </Button>
        </div>
      </div>
      {contextHolder}
    </div>
  );
}
