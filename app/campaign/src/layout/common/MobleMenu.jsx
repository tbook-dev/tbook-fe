import menuIcon from "@/images/icon/menu.svg";
import logo from "@/images/icon/logo.svg";
import { Drawer } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CloseOutlined } from "@ant-design/icons";
import Links from "./Links";
import { useCallback } from "react";
import useUserInfo from "@/hooks/useUserInfoQuery";
import { useWeb3Modal } from "@web3modal/wagmi/react";


export default function MobleMenu({ hideLink = false}) {
  const [open, setOpen] = useState(false);
  const { user } = useUserInfo();
  const { open: openWeb3Modal } = useWeb3Modal();

  const handleCancel = useCallback(() => {
    setOpen(false);
  }, []);

  const Content = () => (
    <div className="h-full flex flex-col">
      <div>
        <div className="flex items-center justify-between h-10 mb-10">
          <div className="flex items-center">
            <Link to="/" className="mr-1 lg:mr-16">
              <img src={logo} className="h-6 object-contain" />
            </Link>
          </div>

          <div className="flex items-center gap-x-4">
            <img
              src={user?.avatar}
              className="w-7 h-7 object-contain object-center rounded-full"
              onClick={openWeb3Modal}
            />
            <CloseOutlined className="text-2xl" onClick={handleCancel} />
          </div>
        </div>

        <Links inDrawer hidden={hideLink}/>
      </div>

      {/* <div className="pb-[100px] flex justify-center">
        <Web3Button icon="show" balance="hide" avatar="hide" />
      </div> */}
    </div>
  );
  return (
    <div className="lg:hidden">
      <img
        src={menuIcon}
        className="w-9 h-9 object-center object-contain"
        onClick={() => setOpen(true)}
      />
      <Drawer
        title={null}
        onClose={() => setOpen(false)}
        open={open}
        closable={false}
        placement="right"
        height="100vh"
        width="100vw"
        contentWrapperStyle={{
          overflow: "hidden",
        }}
        maskStyle={{
          backdropFilter: "blur(6px)",
          backgroundColor: "rgba(0,0,0,0.6)",
        }}
      >
        <Content />
      </Drawer>
    </div>
  );
}
