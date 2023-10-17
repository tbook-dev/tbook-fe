import { Modal } from "antd";
import { conf as tbookConf } from "@tbook/utils";

const { formatDollar, shortAddress } = tbookConf;

export default function WhiteList({ data, closeModal, open, modalType }) {
  console.log({ data });
  return (
    <Modal open={open} width={480} footer={null} centered onCancel={closeModal}>
      <div className="-mx-6 pt-6">
        <h2 className="px-5 text-lg text-t-3 font-medium mb-4 flex items-center justify-between">
          <span>{formatDollar(data?.length)} Winners</span>
          <span className="text-c-9 text-sm">
            <span className="text-t-3 text-xl">
              {formatDollar(data?.filter((v) => v.claimType === 4)?.length)}
            </span>{" "}
            {modalType} claimed
          </span>
        </h2>
        <div className="px-5 py-4 space-y-3 max-h-[428px] overflow-y-auto border-t border-[rgb(50,50,50)] ">
          {data?.length > 0 ?data?.map((v) => {
            return (
              <div
                className="h-8 flex items-center justify-between"
                key={v.userId}
              >
                <div className="flex items-center gap-x-3 text-sm text-t-3">
                  <div className="w-8 h-8 overflow-hidden rounded-full">
                    <img
                      src={v.user.avatar}
                      className="w-full h-full object-contain object-center"
                    />
                  </div>
                  {shortAddress(v.user.wallet)}
                </div>
                <div className="text-sm">
                  {v.claimType === 4 ? (
                    <span className="text-c-9">Claimed</span>
                  ) : (
                    <span className="text-c-6">Waiting to claim</span>
                  )}
                </div>
              </div>
            );
          }):'no data!'}
        </div>
      </div>
    </Modal>
  );
}
