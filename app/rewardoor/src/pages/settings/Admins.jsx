import clsx from "clsx";
import useAdmins from "@/hooks/queries/useAdmins";
import useUserInfo from "@/hooks/queries/useUserInfo";
import { notification, Skeleton, Input, Popover, Dropdown } from "antd";
import { InfoCircleOutlined, EllipsisOutlined } from "@ant-design/icons";
import Button from "@/components/button";
import { useState } from "react";
import { addAdmin, deleteAdmin } from "@/api/incentive";
import AdminItem from "./AdminItem";

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
  addErrorTip: "add admin error! Please try it later!",
  addSucessTip: "add admin sucess!",
};
export default function Admins() {
  const [api, contextHolder] = notification.useNotification();

  const { projectId, address: currentUserAddress } = useUserInfo();
  const [addAdminLoading, setAddAdminLoading] = useState(false);
  const [newAdmin, setNewAdmin] = useState();
  const { data, refetch } = useAdmins();
  const ownerAddress = data?.find?.((v) => v.isOwner)?.wallet;
  //   console.log({ data, ownerAddress });

  const handleAddAdmin = async () => {
    setAddAdminLoading(true);
    try {
      const res = await addAdmin(projectId, newAdmin?.toLowerCase());
      if (res.success) {
        await refetch();
        setAddAdminLoading(false);
        api.success({ message: moduleConf.addSucessTip });
        setAddAdminLoading(false);
        setNewAdmin("");
      } else {
        api.error({ message: res.message });
        setAddAdminLoading(false);
      }
    } catch (e) {
      api.error({ message: moduleConf.addErrorTip });
      setAddAdminLoading(false);
    }
  };

  const handleMenuClick = async (action, item) => {
    try {
      if (action.key === "delete") {
        await deleteAdmin(projectId, item.wallet, item.isOwner);
      }
      await refetch();
    } catch (e) {
      console.log(e);
    }
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
              {data?.map?.((v, idx) => {
                return (
                  <AdminItem
                    key={v.userId}
                    name={"Admin" + (idx + 1)}
                    item={v}
                    handleMenuClick={handleMenuClick}
                    isOwner={currentUserAddress === ownerAddress}
                  />
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
            value={newAdmin}
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
