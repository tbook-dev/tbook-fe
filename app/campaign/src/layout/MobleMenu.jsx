import menuIcon from "@/images/icon/menu.svg";
import logo from "@/images/icon/logo.svg";
import { Drawer } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CloseOutlined } from "@ant-design/icons";
import Links from "./Links";
import { useCallback } from "react";
import { Web3Button } from "@web3modal/react";

export default function MobleMenu({ hideLink = false}) {
  const [open, setOpen] = useState(false);
  const handleCancel = useCallback(() => {
    setOpen(false);
  }, []);

  const Content = () => (
    <div className="h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between h-10 mb-10">
          <div className="flex items-center">
            <Link to="/" className="mr-1 lg:mr-16">
              <img src={logo} className="h-6 object-contain" />
            </Link>
          </div>

          <CloseOutlined className="text-2xl" onClick={handleCancel} />
        </div>

        <Links inDrawer hidden={hideLink}/>
      </div>

      <div className="pb-[100px] flex justify-center">
        <Web3Button icon="show" balance="hide" avatar="hide" />
      </div>
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