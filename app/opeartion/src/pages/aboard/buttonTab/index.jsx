import useButtonTab from "./useButtonTab";
import Button from "@/components/button";
import clsx from "clsx";

export default function ButtonTab({ list = [], loading, handleClick }) {
  const { buttonList, selected, uodateSelected, filteredList } =
    useButtonTab(list);
  return (
    <>
      <div className="space-x-4">
        {buttonList.map((v) => {
          return (
            <button
              key={v.value}
              className={clsx(
                selected === v.value
                  ? "text-[#C8C8C8] font-medium relative before:absolute before:w-full before:h-0.5 before:left-0 before:-bottom-2 before:bg-white"
                  : "text-c-6 font-bold",
                "text-xl"
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
      <div className="space-y-3">
        {filteredList.map((v) => {
          return (
            <Button
              key={v.value}
              type="gost"
              className="w-full"
              onClick={handleClick}
              loading={loading}
            >
              <img src={v.picUrl} className="mr-3 w-5 h-5 object-contain" />
              {v.name}
            </Button>
          );
        })}
      </div>
    </>
  );
}
