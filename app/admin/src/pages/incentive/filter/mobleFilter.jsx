import { Drawer } from "antd";
import clsx from "clsx";
import filterIcon from "@tbook/share/images/icon/filter.svg";

export default function ({ open, filters, setOpen, filterOpitons }) {
  console.log({ filters, filterOpitons });
  const Content = () => {
    return (
      <div>
        {filterOpitons.map((conf) => {
          return (
            <div key={conf.group}>
              <h3 className="text-[#606368] text-[16px] mb-3">{conf.group}</h3>
              <div className="grid grid-cols-3 gap-x-2.5 gap-y-2 mb-6">
                {conf.list.map((v, idx, arr) => {
                  return (
                    <div
                      key={v.value}
                      className={clsx(
                        "w-[108px] text-xs h-[28px] leading-[28px] text-center truncate px-2 rounded-2xl",
                        filters[conf.group] === v.value
                          ? "bg-[#0049FF] text-white"
                          : v.disabled
                          ? "bg-[#F0F0F0] text-[#B8B8B8]"
                          : "bg-[#F0F0F0] text-[#606368]"
                      )}
                    >
                      {v.label}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  return (
    <>
      <img src={filterIcon} onClick={() => setOpen(true)} className="object-contain w-9 h-9" />
      <Drawer
        placement="bottom"
        open={open}
        contentWrapperStyle={{
          height: "70vh",
          borderRadius: "24px 24px 0px 0px",
          overflow: "hidden",
        }}
        onClose={() => setOpen(false)}
      >
        <Content />
      </Drawer>
    </>
  );
}
