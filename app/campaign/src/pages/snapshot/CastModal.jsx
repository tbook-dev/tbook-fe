import { Modal } from "antd";
import { useResponsive } from "ahooks";
import { useSelector } from "react-redux";
import { setSnapshotCastModal, setSnapshotData } from "@/store/global";
import { useDispatch } from "react-redux";
const moduleConf = {
  title: "Cast your vote",
  desc: [
    "Please check your voting information.",
    "In the meantime, please be patient while we check your voting power.",
  ],
};
export default function CastModal() {
  const { pc } = useResponsive();
  const dispath = useDispatch();
  const showSnapshotCastModal = useSelector(
    (s) => s.global.showSnapshotCastModal
  );
  const handleCance = () => {
    dispath(setSnapshotCastModal(false));
    dispath(setSnapshotData(null));
  };

  return (
    <Modal
      title={moduleConf.title}
      footer={null}
      centered
      open={showSnapshotCastModal}
      closable={pc ? true : false}
      onCancel={handleCance}
    >
      <div className="-mx-6 text-[#131517]">
        <div className="mx-6">
          {moduleConf.desc.map((v, idx) => {
            return (
              <p key={idx} className="text-xs">
                {v}
              </p>
            );
          })}
        </div>

        <div className="my-3 h-px bg-[rgb(19,21,23)]/[0.08]"/>

        <div className="mx-6 space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-[#717374]">Choice</span>
            <span className="text-[#131517] font-medium">Choice</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#717374]">Snapshot</span>
            <span className="text-[#131517] font-medium">Choice</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#717374]">Your voting power</span>
            <span className="text-[#131517] font-medium">Choice</span>
          </div>
        </div>
      </div>
    </Modal>
  );
}
