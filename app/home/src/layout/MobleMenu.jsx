import menuIcon from "@/images/icon/menu.svg";
import { Drawer } from "antd";
import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import logo from "@tbook/share/images/icon/logo.svg";
import { CloseOutlined } from "@ant-design/icons";

export default function MobleMenu({ links }) {
  const [open, setOpen] = useState(false);
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

          <CloseOutlined className="text-2xl" onClick={handleCancel} />
        </div>

        <div className="flex flex-col gap-y-8">
          {links.map((v) => {
            return (
              <a href={`#${v.anchor}`} className="text-2xl font-bold">
                {v.text}
              </a>
            );
          })}
        </div>
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
        onClose={handleCancel}
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
