import useButtonTab from "./useButtonTab";
import clsx from "clsx";
const conf = {
  title1: "Select format",
  title2: "Select wallet",
};

export default function WalletButtonTab({ list = [], loading, handleClick }) {
  const { buttonList, selected, uodateSelected, filteredList } =
    useButtonTab(list);
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="text-xs text-[#717374] font-medium">{conf.title1}</p>
        <div className="grid grid-cols-2 gap-x-4 text-sm">
          {buttonList.map((v) => {
            return (
              <button
                key={v.value}
                className={clsx(
                  selected === v.value
                    ? "border text-[#006EE9] border-[#006EE9] bg-[#EBF2FE]"
                    : "bg-[#F1F1F1]",
                  "text-xl rounded-md h-8"
                )}
                onClick={() => {
                  uodateSelected(v.value);
                }}
              >
                {v.name}
              </button>
            );
          })}
        </div>
      </div>
      <div className="space-y-3">
        <p className="text-xs text-[#717374]">{conf.title2}</p>
        <div className="space-y-3 text-sm font-medium">
          {filteredList.map((v) => {
            return (
              <button
                key={v.value}
                className="w-full h-8 flex items-center justify-center rounded-md bg-[#F1F1F1]"
                onClick={handleClick}
                disabled={loading}
              >
                <img src={v.picUrl} className="mr-2 w-5 h-5 object-contain" />
                {v.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
