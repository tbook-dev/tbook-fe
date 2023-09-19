import { Modal } from "antd";
import { conf as tbookConf } from "@tbook/utils";
import mockAvatorIcon from "@/images/icon/mockAvator.svg";

const { formatDollar, shortAddress } = tbookConf;

const prompt = "Waiting to claim";
const desc =
  "Your winners are waiting to claim the rewards. Please update the whitelist so that the winners will be eligible to claim.";

export default function WhiteList({ data, closeModal, open }) {
  const handleUpdateWhiteList = () => {
    console.log("update");
  };
  return (
    <Modal open={open} width={480} footer={null} centered onCancel={closeModal}>
      <div className="-mx-6">
        <h2 className="px-5 text-lg text-t-3 font-medium mb-4">
          {formatDollar(data?.length)} Winners
        </h2>
        <div className="px-5 py-4 space-y-3 max-h-[428px] overflow-y-auto border-t border-b border-[rgb(50,50,50)] ">
          {data?.map((v) => {
            return (
              <div
                className="h-8 flex items-center justify-between"
                key={v.address}
              >
                <div className="flex items-center gap-x-3 text-sm text-t-3">
                  <div className="w-8 h-8 overflow-hidden rounded-full">
                    <img
                      src={mockAvatorIcon}
                      className="w-full h-full object-contain object-center"
                    />
                  </div>
                  {shortAddress(v.address)}
                </div>
                <div className="text-c-6 text-sm">{prompt}</div>
              </div>
            );
          })}
        </div>
        <div className="px-5 py-4 space-y-2">
          <button
            className="px-3 py-1.5 rounded-md bg-[#3A82F7] text-white hover:opacity-80 block"
            onClick={handleUpdateWhiteList}
          >
            Update the whitelist<span className="text-[#FF5151]">*</span>
          </button>
          <p className="text-t-3 text-sm">{desc}</p>
        </div>
      </div>
    </Modal>
  );
}
